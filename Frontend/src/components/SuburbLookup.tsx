import { useEffect, useRef, useState } from "react"
import { AiOutlineClose } from "react-icons/ai"
import { AUS_STATE } from "../../../Shared/Interface/property"

interface ISuburb {
  [key: string]: {
    suburb: string
    state: AUS_STATE
  }
}
interface IProps {
  suburbs: ISuburb
  setSuburbs: React.Dispatch<React.SetStateAction<any>>
}
const SuburbLookup = ({ suburbs, setSuburbs }: IProps) => {
  const firstMount = useRef(true)
  const searchInputRef = useRef(null)
  const [searchAddress, setSearchAddress] = useState("")

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchAddress(e.target.value)
  }

  const onAddressSelect = (autocomplete: google.maps.places.Autocomplete) => {
    const place = autocomplete.getPlace()
    if (!place.formatted_address || !place.address_components) return
    setSearchAddress("")
    let suburb: string, state: AUS_STATE
    for (const component of place.address_components) {
      if (component.types.includes("locality")) suburb = component.short_name
      if (component.types.includes("administrative_area_level_1")) state = component.short_name as AUS_STATE
    }
    setSuburbs((prev) => {
      return { ...prev, [place.formatted_address as string]: { suburb, state } }
    })
  }
  const removeSelection = (key: string) => {
    setSuburbs((prev) => {
      const newSuburbs = { ...prev }
      delete newSuburbs[key]
      return newSuburbs
    })
  }

  // init autocomplete
  const initAutocomplete = () => {
    if (!searchInputRef.current) return
    const autocomplete = new google.maps.places.Autocomplete(searchInputRef.current)
    autocomplete.setComponentRestrictions({
      country: ["au"],
    })
    autocomplete.setTypes(["locality", "postal_code"])
    autocomplete.setFields(["address_component", "formatted_address"])
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
    <div className="mt-3">
      <label htmlFor="address-search" className="block text-lg font-semibold text-slate-800">
        Suburb
      </label>
      <div className="relative border-slate-600 rounded flex flex-wrap my-3 ">
        {Object.entries(suburbs).map(([key, suburb]) => {
          return (
            <div key={key} className="m-2 bg-slate-200 rounded-xl px-2 flex items-center">
              <span>{key}</span>
              <button type="button" className="cursor-pointer mx-1" onClick={() => removeSelection(key)}>
                <AiOutlineClose className="text-lg text-black rounded-full my-auto" pointerEvents="none" />
              </button>
            </div>
          )
        })}
        <input
          id="address-search"
          className="w-full form-input border-1 h-12 text-md "
          ref={searchInputRef}
          type="text"
          value={searchAddress}
          placeholder="Search your Suburb..."
          onChange={onSearchChange}
          autoComplete={"off"}
        />
      </div>
    </div>
  )
}

export default SuburbLookup
