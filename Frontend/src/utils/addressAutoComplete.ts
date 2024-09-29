interface IAddresssComponent {
  long_name: string
  short_name: string
  types: string[]
}

export const extractAddress = (place: google.maps.places.PlaceResult) => {
  const address = {
    number: "",
    route: "",
    suburb: "",
    council: "",
    state: "",
    postcode: "",
    coordinates: {
      lat: place.geometry?.location?.lat() as number,
      lng: place.geometry?.location?.lng() as number,
    },
    // country: "",
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

  if (!Array.isArray(place.address_components)) {
    return address
  }

  place.address_components.forEach((component: IAddresssComponent) => {
    const { types } = component
    // const value = component.long_name;
    const value = component.short_name

    if (types.includes("street_number")) {
      address.number = value
    }
    if (types.includes("route")) {
      address.route = value
    }
    if (types.includes("locality")) {
      address.suburb = value
    }
    if (types.includes("administrative_area_level_2") && types.includes("political")) {
      address.council = value
    }
    if (types.includes("administrative_area_level_1")) {
      address.state = value
    }
    // if (types.includes("country")) {
    //   address.country = value;
    // }
    if (types.includes("postal_code")) {
      address.postcode = value
    }
  })

  return address
}
