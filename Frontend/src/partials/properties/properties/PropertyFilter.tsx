import React, { useState } from "react"

import {
  bathroomOptions,
  bedroomOptions,
  carSpaceOptions,
  houseAreaOptions,
  landAreaOptions,
  numberLimit,
  priceOptions,
  typeOptions,
  yearOptions,
} from "../../../utils/constants"

import ModalFilter from "../../../components/ModalFilter"
import { AUS_STATE, PROPERTY_TYPE } from "../../../../../Shared/Interface/property"
import SuburbLookup from "../../../components/SuburbLookup"
import DropdownNumberRange from "../../../components/DropdownNumberRange"
import { NumberFilter } from "../../../../../Shared/Interface/filter"
import { getPropertiesCount, listProperties } from "../../../apis/property"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { clearPagedKeysWhenFilterApplied, setNextPageKey, setPagedProperties, setPropertyFilter } from "../../../slices/propertySlice"
import { PropertyFilter as IPropertyFilter } from "../../../../../Shared/Interface/property"
import { setIsLoading } from "../../../slices/configSlice"

export enum DropDownType {
  PRICE = "Price",
  BEDROOMS = "Bedrooms",
  BATHROOMS = "Bathrooms",
  CARS_SPACES = "Car Spaces",
  YEAR_BUILT = "Year Built",
  HOUSE_AREA = "House Area",
  LAND_AREA = "Land Area",
}
export interface IDropDownConfig {
  sectionType: DropDownType
  numberRange: NumberFilter
  setNumberRange: React.Dispatch<React.SetStateAction<NumberFilter>>
  initialOptions: number[]
  limit: Omit<NumberFilter, "exact">
}
export interface ISuburb {
  [key: string]: {
    suburb: string
    state: AUS_STATE
  }
}
const PropertyFilter = () => {
  const { price: pLimit, rooms: rLimit, year: yLimit, area: aLimit } = numberLimit
  const [filterModalOpen, setFilterModalOpen] = useState(false)
  const dispatch = useAppDispatch()
  const propertyState = useAppSelector((state) => state.property)
  const { currentPage: page, currentPageKey } = propertyState
  const [suburbs, setSuburbs] = useState<ISuburb>({})
  const [types, setTypes] = useState<PROPERTY_TYPE[]>([])
  const [priceRange, setPriceRange] = useState<NumberFilter>(pLimit)
  const [bedroomRange, setBedroomRange] = useState<NumberFilter>(rLimit)
  const [bathroomRange, setBathroomRange] = useState<NumberFilter>(rLimit)
  const [carSpaceRange, setCarSpaceRange] = useState<NumberFilter>(rLimit)
  const [yearBuiltRange, setYearBuiltRange] = useState<NumberFilter>(yLimit)
  const [landAreaRange, setLandAreaRange] = useState<NumberFilter>(aLimit)
  const [houseAreaRange, setHouseAreaRange] = useState<NumberFilter>(aLimit)
  const dropdownConfigs: IDropDownConfig[] = [
    { sectionType: DropDownType.PRICE, limit: pLimit, initialOptions: priceOptions, numberRange: priceRange, setNumberRange: setPriceRange },
    { sectionType: DropDownType.BEDROOMS, limit: rLimit, initialOptions: bedroomOptions, numberRange: bedroomRange, setNumberRange: setBedroomRange },
    { sectionType: DropDownType.BATHROOMS, limit: rLimit, initialOptions: bathroomOptions, numberRange: bathroomRange, setNumberRange: setBathroomRange },
    { sectionType: DropDownType.CARS_SPACES, limit: rLimit, initialOptions: carSpaceOptions, numberRange: carSpaceRange, setNumberRange: setCarSpaceRange },
    { sectionType: DropDownType.YEAR_BUILT, limit: yLimit, initialOptions: yearOptions, numberRange: yearBuiltRange, setNumberRange: setYearBuiltRange },
    { sectionType: DropDownType.LAND_AREA, limit: aLimit, initialOptions: landAreaOptions, numberRange: landAreaRange, setNumberRange: setLandAreaRange },
    { sectionType: DropDownType.HOUSE_AREA, limit: aLimit, initialOptions: houseAreaOptions, numberRange: houseAreaRange, setNumberRange: setHouseAreaRange },
  ]
  const setFilterTypes = (type: PROPERTY_TYPE) => {
    if (types.includes(type)) {
      setTypes(types.filter((item) => item !== type))
    } else {
      setTypes([...types, type])
    }
  }

  const clearFilter = () => {
    setTypes([])
    setBathroomRange(numberLimit.rooms)
    setBedroomRange(numberLimit.rooms)
    setCarSpaceRange(numberLimit.rooms)
    setPriceRange(numberLimit.price)
    setYearBuiltRange(numberLimit.year)
    setLandAreaRange(numberLimit.area)
    setHouseAreaRange(numberLimit.area)
    setSuburbs({})
  }
  const onFilterConfirm = () => {
    const filter: IPropertyFilter = {
      type: types,
      suburb: Object.values(suburbs).map((item) => item.suburb),
      state: Object.values(suburbs).map((item) => item.state),
      housePrice: priceRange,
      bedrooms: bedroomRange,
      bathrooms: bathroomRange,
      carSpaces: carSpaceRange,
      yearBuilt: yearBuiltRange,
      landArea: landAreaRange,
      houseArea: houseAreaRange,
    }
    listProperties(true, 1, undefined, filter).then((res) => {
      dispatch(clearPagedKeysWhenFilterApplied())
      dispatch(setPagedProperties(res))
      dispatch(setNextPageKey(res.lastEvaluatedKey))
      dispatch(setIsLoading(false))
    })
    dispatch(setPropertyFilter(filter))
    setFilterModalOpen(false)
  }

  return (
    <>
      <div className="mb-4 border-b border-slate-200 flex gap-4 items-center">
        <button
          type="button"
          className="text-sm font-bold px-2 py-1 my-2 rounded-[3px] text-white bg-indigo-500 hover:bg-indigo-700"
          onClick={(e) => setFilterModalOpen(true)}
        >
          Filter
        </button>
        <div className="text-sm font-medium flex flex-wrap">
          {types.length > 0 && (
            <span className="px-2 py-1 text-indigo-500 whitespace-nowrap">
              {"Types"}:{types.length}
            </span>
          )}
        </div>
      </div>
      <ModalFilter
        id="marker-info-modal"
        title="Property Filter"
        modalOpen={filterModalOpen}
        setModalOpen={setFilterModalOpen}
        size={"max-w-3xl"}
        onClear={clearFilter}
        onConfirm={onFilterConfirm}
      >
        <div className="flex flex-col gap-4 p-2 mx-auto md:p-4 min-w-80 max-w-[600px] lg:max-w-3xl">
          <SuburbLookup suburbs={suburbs} setSuburbs={setSuburbs} />
          <hr />
          <div className="flex flex-col gap-1">
            <p className="text-lg text-slate-800 font-semibold">Property Type</p>
            <ul className="flex flex-wrap">
              {typeOptions.map((option) => (
                <li key={option} className="flex items-center w-1/2 mt-3">
                  <input
                    type="checkbox"
                    className="form-checkbox border border-slate-600"
                    onChange={() => setFilterTypes(option)}
                    checked={types.includes(option as PROPERTY_TYPE)}
                  />
                  <span className="text-md text-slate-600 ml-2">{option.charAt(0).toUpperCase() + option.slice(1)}</span>
                </li>
              ))}
            </ul>
          </div>
          {dropdownConfigs.map((config, index) => (
            <DropdownNumberRange key={index} config={config} />
          ))}
        </div>
      </ModalFilter>
    </>
  )
}

export default PropertyFilter
