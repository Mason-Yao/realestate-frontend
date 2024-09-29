import { PROPERTY_STATE } from "../interfaces/interfaces"
import { PROPERTY_TYPE } from "../../../Shared/Interface/property"
import { tailwindConfig } from "./"
import { RecursiveKeyValuePair } from "tailwindcss/types/config"

export const radiusOptions = [
  { value: 500, label: "500m" },
  { value: 1000, label: "1km" },
  { value: 2000, label: "2km" },
  { value: 3000, label: "3km" },
  { value: 4000, label: "4km" },
  { value: 5000, label: "5km" },
]

export const occupations = [
  { id: 1, label: "Agent", value: "Agent" },
  { id: 2, label: "Accountant", value: "Accountant" },
  { id: 3, label: "Broker", value: "Broker" },
  { id: 4, label: "Exchange", value: "Exchange" },
  { id: 5, label: "Lawyer", value: "Lawyer" },
  { id: 6, label: "Property Manager", value: "Property Manager" },
]

export const languages = [
  { id: 1, label: "English", value: "English" },
  { id: 2, label: "Mandarin", value: "Mandarin" },
  { id: 3, label: "Cantonese", value: "Cantonese" },
  { id: 4, label: "Vietnamese", value: "Vietnamese" },
  { id: 5, label: "Hindi", value: "Hindi" },
  { id: 6, label: "Italian", value: "Italian" },
  { id: 7, label: "Arabic", value: "Arabic" },
  { id: 8, label: "Spanish", value: "Spanish" },
]

export const validators = {
  email: {
    notEmpty: (fieldValue: string) => {
      return fieldValue.length > 0 || "Email is required"
    },
    notAdmin: (fieldValue: string) => {
      return fieldValue !== "admin@gmail.com" || "Enter a different email"
    },
    notBlackListed: (fieldValue: string) => {
      return !fieldValue.endsWith("baddomain.com") || "This domain is not welcome"
    },
  },
}

export const priceOptions = [300000, 500000, 700000, 1000000, 1500000, 2000000, 3000000, 5000000, 10000000, 12000000, 15000000, 20000000]

export const landAreaOptions = [100, 150, 200, 300, 400, 500, 600, 800, 1000, 1500, 2000, 3000, 5000]

export const houseAreaOptions = [50, 80, 100, 120, 150, 200, 250, 300, 500, 800]

export const bedroomOptions = [...Array(6).keys()].map((key) => key + 1)

export const bathroomOptions = [...Array(3).keys()].map((key) => key + 1)

export const carSpaceOptions = [...Array(2).keys()].map((key) => key + 1)

export const yearOptions = [...Array(150).keys()].map((key) => 2050 - key)

export const numberLimit = {
  price: {
    minimum: 0,
    maximum: 999999999999,
  },
  rooms: {
    minimum: 0,
    maximum: 20,
  },
  area: {
    minimum: 0,
    maximum: 99999,
  },
  year: {
    minimum: 1800,
    maximum: 3000,
  },
}

export const typeOptions = Object.values(PROPERTY_TYPE)

export const stateOptions = Object.values(PROPERTY_STATE)

const tailwindColors = tailwindConfig().theme?.colors as RecursiveKeyValuePair<string, string>
export const colors = [
  tailwindColors["red"][500],
  tailwindColors["orange"][500],
  tailwindColors["amber"][500],
  tailwindColors["yellow"][500],
  tailwindColors["lime"][500],
  tailwindColors["emerald"][500],
  tailwindColors["teal"][500],
  tailwindColors["cyan"][500],
  tailwindColors["sky"][500],
  tailwindColors["blue"][500],
  tailwindColors["indigo"][500],
  tailwindColors["violet"][500],
  tailwindColors["purple"][500],
  tailwindColors["fuchsia"][500],
  tailwindColors["pink"][500],
  tailwindColors["rose"][500],
  tailwindColors["slate"][500],
  tailwindColors["gray"][500],
  tailwindColors["neutral"][500],
  tailwindColors["stone"][500],
  tailwindColors["black"],
  tailwindColors["white"],
]

export const lightColors = [
  tailwindColors["red"][300],
  tailwindColors["orange"][300],
  tailwindColors["amber"][300],
  tailwindColors["yellow"][300],
  tailwindColors["lime"][300],
  tailwindColors["emerald"][300],
  tailwindColors["teal"][300],
  tailwindColors["cyan"][300],
  tailwindColors["sky"][300],
  tailwindColors["blue"][300],
  tailwindColors["indigo"][300],
  tailwindColors["violet"][300],
  tailwindColors["purple"][300],
  tailwindColors["fuchsia"][300],
  tailwindColors["pink"][300],
  tailwindColors["rose"][300],
  tailwindColors["slate"][300],
  tailwindColors["gray"][300],
  tailwindColors["neutral"][300],
  tailwindColors["stone"][300],
  tailwindColors["black"],
  tailwindColors["white"],
]

const VITE_APP_GMAP_API_KEY = process.env.VITE_APP_GMAP_API_KEY || ""

if (!VITE_APP_GMAP_API_KEY) {
  throw new Error("Google Maps API key is required.")
}

export { VITE_APP_GMAP_API_KEY }
