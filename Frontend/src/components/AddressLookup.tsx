import React, { useEffect, useRef, useState } from "react"
import { extractAddress } from "../utils/addressAutoComplete"
import { AutoCompleteAddress } from "../interfaces/properties"
import { initAutoCompleteAddress } from "../utils/initialData"

interface IProps {
  setAddress: React.Dispatch<React.SetStateAction<AutoCompleteAddress>>
  wrapperClasses?: string
}

const AddressLookup = ({ setAddress, wrapperClasses = "" }: IProps) => {
  const firstMount = useRef(true)
  const searchInputRef = useRef(null)
  const [searchAddress, setSearchAddress] = useState("")

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchAddress(e.target.value)
  }

  const onAddressSelect = (autocomplete: google.maps.places.Autocomplete) => {
    const place = autocomplete.getPlace()
    place.formatted_address && setSearchAddress(place.formatted_address)
    // 说明：这里的place对象，拿去辅助输入地点相关信息，比如经纬度，地点id等
    // console.log("formatted", extractAddress(place));
    setAddress(extractAddress(place))
  }

  const onClear = () => {
    setSearchAddress("")
    setAddress(initAutoCompleteAddress)
  }

  // init autocomplete
  const initAutocomplete = () => {
    if (!searchInputRef.current) return
    const autocomplete = new google.maps.places.Autocomplete(searchInputRef.current)
    // We can restrict the search to specific countries
    autocomplete.setComponentRestrictions({
      country: ["au"],
    })
    autocomplete.setFields(["address_component", "place_id", "geometry", "formatted_address"])
    autocomplete.addListener("place_changed", () => {
      onAddressSelect(autocomplete)
    })
  }

  // load map script after mounted
  useEffect(() => {
    firstMount.current && initAutocomplete()
    return () => {
      firstMount.current = false
    }
  }, [])

  return (
    <div className={wrapperClasses}>
      <label htmlFor="address-search" className="block text-sm font-medium leading-6 text-gray-900">
        Search Address
      </label>
      <div className="relative">
        <input
          id="address-search"
          className="w-full form-input"
          ref={searchInputRef}
          type="text"
          value={searchAddress}
          placeholder="Search your address..."
          onChange={onSearchChange}
          autoComplete={"off"}
        />
        {/* <AiOutlineClear onClick={onClear} className="text-base absolute cursor-pointer top-1/2 right-0 -translate-y-1/2 -translate-x-1/2" /> */}
      </div>
    </div>
  )
}

export default AddressLookup
