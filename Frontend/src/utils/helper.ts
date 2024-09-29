import { AUS_STATE, Address, Coordinates } from "../../../Shared/Interface/property"
import { BIRTHDAY_FILTER_CONDITION, DATE_FILTER_CONDITION } from "../interfaces/interfaces"
import { AutoCompleteAddress } from "../interfaces/properties"

export const buildDateFilter = (condition: DATE_FILTER_CONDITION | BIRTHDAY_FILTER_CONDITION): string => {
  switch (condition) {
    case DATE_FILTER_CONDITION.WithinOneDay:
      return getDate(-1)
    case DATE_FILTER_CONDITION.WithinOneWeek:
      return getDate(-7)
    case DATE_FILTER_CONDITION.WithinOneMonth:
      return getDate(-30)
    case DATE_FILTER_CONDITION.WithinThreeMonths:
      return getDate(-90)
    case DATE_FILTER_CONDITION.WithinSixMonths:
      return getDate(-180)
    case DATE_FILTER_CONDITION.WithinOneYear:
      return getDate(-365)

    case BIRTHDAY_FILTER_CONDITION.Today:
      return getDate(0)
    case BIRTHDAY_FILTER_CONDITION.ThisWeek:
      return getDate(7)
    case BIRTHDAY_FILTER_CONDITION.ThisMonth:
      return getDate(30)
  }
}

const getDate = (days: number): string => {
  const date = new Date().getDate() + days
  return new Date(new Date().setDate(date)).toISOString()
}

export const numberToPrice = (price: number) => {
  return price.toLocaleString("en-AU", {
    style: "currency",
    currency: "AUD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
}

export const priceToNumber = (formattedPrice: string) => {
  const cleanedPrice = formattedPrice.replace(/[^\d.-]/g, "")
  const numericPrice = cleanedPrice.length > 0 ? parseFloat(cleanedPrice) : 0
  return numericPrice
}

export const stringToBoolean = (stringBoolean: string) => {
  return stringBoolean.toLowerCase() === "true"
}

export const convertToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader()
    fileReader.readAsDataURL(file)
    fileReader.onload = () => resolve(fileReader.result as string)
    fileReader.onerror = (error) => reject(error)
  })
}

export const getObjSum = (obj: Record<string, number>) => {
  const objArray = Object.values(obj)
  return objArray.reduce((a: number, b: number) => a + b, 0)
}

export const getAddressString = (address: Address) => {
  return `${address.street} ${address.suburb}, ${address.state} ${address.postcode}`
}

export const convertAutoCompleteAddressToAddress = (address: AutoCompleteAddress): Address => {
  return {
    street: address.number + " " + address.route,
    suburb: address.suburb,
    state: address.state as AUS_STATE,
    postcode: address.postcode,
  }
}

export const convertAddressToAutoCompleteAddress = (address: Address, coordinates: Coordinates, cityCouncil?: string): AutoCompleteAddress => {
  const streetParts = address.street?.split(/ (.*)/)
  return {
    number: streetParts ? streetParts[0] : "",
    route: streetParts ? streetParts[1] : "",
    suburb: address.suburb || "",
    council: cityCouncil || "",
    state: address.state || "",
    postcode: address.postcode || "",
    coordinates: {
      lat: coordinates.lat,
      lng: coordinates.lng,
    },
    plain() {
      const number = this.number ? `${this.number}` : ""
      const route = this.route ? `${this.route}` : ""
      const suburb = this.suburb ? `${this.suburb}` : ""
      const postcode = this.postcode ? `${this.postcode}` : ""
      const state = this.state ? `${this.state}` : ""
      // ZT-NOTE: we can adjust the full address format here
      if (number && route && suburb) {
        return `${number} ${route}, ${suburb}, ${state} ${postcode}`
      } else {
        return ""
      }
    },
  }
}
