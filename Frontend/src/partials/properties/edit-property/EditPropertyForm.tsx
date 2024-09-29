import React, { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import AddressLookup from "../../../components/AddressLookup"
import { initAutoCompleteAddress, initProperty } from "../../../utils/initialData"
import { Address, PROPERTY_SOURCE_TYPE, PROPERTY_STATUS, PROPERTY_TYPE, Property, ROOM_NUMBER } from "../../../../../Shared/Interface/property"
import { useNavigate, useParams } from "react-router-dom"
import { editProperty, getProperty } from "../../../apis/property"
import { convertAddressToAutoCompleteAddress, convertAutoCompleteAddressToAddress, numberToPrice, priceToNumber } from "../../../utils/helper"
import { setBanner, setIsLoading } from "../../../slices/configSlice"
import { POI } from "../../../../../Shared/Interface/property"
import { logger } from "../../../../../Shared/Utils"
import CurrentLocation from "../../map/CurrentLocation"
import NearbyPlaces from "../add-property/NearbyPlaces"
import FileUpload from "../add-property/FileUpload"
import DatePicker from "../../../components/Datepicker"

function EditPropertyForm() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const user = useAppSelector((state) => state.user)
  const [selectedPOIs, setSelectedPOIs] = useState<POI[]>([])
  const [address, setAddress] = useState(initAutoCompleteAddress)
  const { number, route, suburb, council, state, postcode, coordinates } = address

  const [currentProperty, setCurrentProperty] = useState<Property>(initProperty)
  const { id } = useParams()
  const {
    description,
    sourceType,
    status,
    agent,
    solicitor,
    landArea,
    houseArea,
    yearBuilt,
    bathrooms,
    bedrooms,
    carSpaces,
    type,
    landPrice,
    housePrice,
    settlementTime,
  } = currentProperty

  useEffect(() => {
    getPropertyDetails()

    return () => {
      //Clear current property when unmount edit client page
      setCurrentProperty(initProperty)
    }
  }, [])

  const onAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress({ ...address, [e.target.name]: e.target.value })
  }

  const onDetailsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>, type: string) => {
    const { name, value } = e.target
    switch (type) {
      case "text":
        setCurrentProperty({ ...currentProperty, [name]: value })
        break
      case "number":
        setCurrentProperty({ ...currentProperty, [name]: parseInt(value) })
        break
      case "price":
        setCurrentProperty({ ...currentProperty, [name]: priceToNumber(value) })
        break
    }
  }

  const getPropertyDetails = async () => {
    try {
      dispatch(setIsLoading(true))

      if (id) {
        const res = await getProperty(id)
        dispatch(setIsLoading(false))

        const newAddress = convertAddressToAutoCompleteAddress(res.address, res.coordinates, res.cityCouncil)
        setAddress(newAddress)

        res.POIs && setSelectedPOIs(res.POIs)

        setCurrentProperty({ ...currentProperty, ...res })
      } else {
        logger.error("id is undefined")
      }
    } catch (err) {
      logger.error(err)
      dispatch(
        setBanner({
          status: "error",
          content: "Something went wrong. Please try again.",
        })
      )
      dispatch(setIsLoading(false))
    }
  }

  const updateProperty = () => {
    const addressPayload: Address = convertAutoCompleteAddressToAddress(address)

    const { PK, id, ...propertyPayload } = currentProperty
    const updatePropertyPayload = {
      ...propertyPayload,
      address: addressPayload,
      POIs: selectedPOIs,
    }

    dispatch(setIsLoading(true))

    if (id) {
      editProperty(id, updatePropertyPayload)
        .then((res) => {
          dispatch(setIsLoading(false))
          dispatch(
            setBanner({
              status: "success",
              content: "Property has been edited successfully.",
            })
          )
          navigate("/properties/properties")
        })
        .catch((err) => {
          logger.error(err)
          dispatch(
            setBanner({
              status: "error",
              content: "Something wrong happened. Please try again.",
            })
          )
          dispatch(setIsLoading(false))
        })
    } else {
      logger.error("Property ID is undefined.")
    }
  }

  return (
    <div className="flex flex-col gap-4 w-full px-4 sm:px-6 lg:px-8 py-8">
      <p className="text-xl text-slate-800 font-bold col-span-full">1. Address</p>
      <AddressLookup setAddress={setAddress} wrapperClasses="col-span-full" />

      <div className="grid grid-cols-9 gap-2">
        <div className="col-span-full xs:col-span-9 sm:col-span-6 md:col-span-1">
          <label className="block text-sm font-medium mb-1 pl-1">Number</label>
          <input className={"w-full form-input"} value={number} name="number" onChange={(e) => onAddressChange(e)} />
        </div>
        <div className="col-span-full xs:col-span-9 sm:col-span-6 lg:col-span-2">
          <label className="block text-sm font-medium mb-1 pl-1">Street</label>
          <input className={"w-full form-input"} value={route} name="route" onChange={(e) => onAddressChange(e)} />
        </div>
        <div className="col-span-full xs:col-span-9 sm:col-span-6 lg:col-span-2">
          <label className="block text-sm font-medium mb-1 pl-1">Suburb</label>
          <input className={"w-full form-input"} value={suburb} name="suburb" onChange={(e) => onAddressChange(e)} />
        </div>
        <div className="col-span-full xs:col-span-9 sm:col-span-6 lg:col-span-1">
          <label className="block text-sm font-medium mb-1 pl-1">State</label>
          <input className={"w-full form-input"} value={state} name="state" onChange={(e) => onAddressChange(e)} />
        </div>
        <div className="col-span-full xs:col-span-9 sm:col-span-6 lg:col-span-1">
          <label className="block text-sm font-medium mb-1 pl-1">Postcode</label>
          <input className={"w-full form-input"} value={postcode} name="postcode" onChange={(e) => onAddressChange(e)} />
        </div>
        <div className="col-span-full xs:col-span-9 sm:col-span-6 lg:col-span-2">
          <label className="block text-sm font-medium mb-1 pl-1">Council</label>
          <input className={"w-full form-input"} value={council} name="council" onChange={(e) => onAddressChange(e)} />
        </div>
        <div className="col-span-full">
          <label className="label-primary">Property Address</label>
          <input defaultValue={address.plain()} className="w-full form-input" type="text" disabled />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-xl text-slate-800 font-bold">2. File uploads</p>
        <FileUpload currentProperty={currentProperty} setCurrentProperty={setCurrentProperty} />
      </div>

      <div className="grid grid-cols-12 gap-2">
        <p className="text-xl text-slate-800 font-bold col-span-full">3. Details</p>

        <div className="col-span-6 sm:col-span-4 md:col-span-3">
          <label className="block text-sm font-medium mb-1 pl-1">Source Type</label>
          <select id="sourceType" className="w-full form-select" name="sourceType" value={sourceType} onChange={(e) => onDetailsChange(e, "text")}>
            {Object.values(PROPERTY_SOURCE_TYPE).map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="col-span-6 sm:col-span-4 md:col-span-3">
          <label className="block text-sm font-medium mb-1 pl-1">Property Status</label>
          <select id="sourceType" className="w-full form-select" name="status" value={status} onChange={(e) => onDetailsChange(e, "text")}>
            {Object.values(PROPERTY_STATUS).map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="col-span-6 sm:col-span-4 md:col-span-3">
          <label className="block text-sm font-medium mb-1 pl-1">Agent</label>
          <input className={"w-full form-input"} name="agent" value={agent} onChange={(e) => onDetailsChange(e, "text")} />
        </div>

        <div className="col-span-6 sm:col-span-4 md:col-span-3">
          <label className="block text-sm font-medium mb-1 pl-1">Solicitor</label>
          <input className={"w-full form-input"} name="solicitor" value={solicitor} onChange={(e) => onDetailsChange(e, "text")} />
        </div>

        <div className="col-span-6 sm:col-span-4 md:col-span-3">
          <label className="block text-sm font-medium mb-1 pl-1">Land Size</label>
          <input className={"w-full form-input"} name="landArea" value={landArea} onChange={(e) => onDetailsChange(e, "number")} />
        </div>

        <div className="col-span-6 sm:col-span-4 md:col-span-3">
          <label className="block text-sm font-medium mb-1 pl-1">Building Size</label>
          <input className={"w-full form-input"} name="houseArea" value={houseArea} onChange={(e) => onDetailsChange(e, "number")} />
        </div>

        <div className="col-span-6 sm:col-span-4 md:col-span-3">
          <label className="block text-sm font-medium mb-1 pl-1">Year Built</label>
          <input className={"w-full form-input"} name="yearBuilt" value={yearBuilt} onChange={(e) => onDetailsChange(e, "number")} />
        </div>

        <div className="col-span-6 sm:col-span-4 md:col-span-3">
          <label className="block text-sm font-medium mb-1 pl-1">Property Type</label>
          <select id="sourceType" className="w-full form-select" name="type" value={type} onChange={(e) => onDetailsChange(e, "text")}>
            {Object.values(PROPERTY_TYPE).map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="col-span-6 sm:col-span-4 md:col-span-3">
          <label className="block text-sm font-medium mb-1 pl-1">Bedrooms</label>
          <select id="sourceType" className="w-full form-select" name="bedrooms" value={bedrooms} onChange={(e) => onDetailsChange(e, "number")}>
            {Object.values(ROOM_NUMBER).map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="col-span-6 sm:col-span-4 md:col-span-3">
          <label className="block text-sm font-medium mb-1 pl-1">Bathrooms</label>
          <select id="sourceType" className="w-full form-select" name="bathrooms" value={bathrooms} onChange={(e) => onDetailsChange(e, "number")}>
            {Object.values(ROOM_NUMBER).map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="col-span-6 sm:col-span-4 md:col-span-3">
          <label className="block text-sm font-medium mb-1 pl-1">Car Spaces</label>
          <select id="sourceType" className="w-full form-select" name="carSpaces" value={carSpaces} onChange={(e) => onDetailsChange(e, "number")}>
            {Object.values(ROOM_NUMBER).map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="col-span-6 sm:col-span-4 md:col-span-3">
          <label className="block text-sm font-medium mb-1 pl-1">Property Price</label>
          <input
            className={"w-full form-input"}
            placeholder="AUD"
            name="housePrice"
            value={numberToPrice(housePrice || 0)}
            onChange={(e) => onDetailsChange(e, "price")}
          />
        </div>

        {"off the plan" === "off the plan" && (
          <div className="col-span-6 sm:col-span-4 md:col-span-3">
            <label className="block text-sm font-medium mb-1 pl-1">Land Price</label>
            <input
              className={"w-full form-input"}
              placeholder="AUD"
              name="landPrice"
              value={numberToPrice(landPrice || 0)}
              onChange={(e) => onDetailsChange(e, "price")}
            />
          </div>
        )}

        <div className="col-span-6 sm:col-span-4 md:col-span-3">
          <label className="block text-sm font-medium mb-1 pl-1">Settlement Date</label>
          <DatePicker
            date={settlementTime ? new Date(settlementTime) : new Date()}
            setDate={(value: string) => setCurrentProperty({ ...currentProperty, settlementTime: value })}
            align={undefined}
          />
        </div>

        <div className="col-span-full">
          <label className="block text-sm font-medium mb-1 pl-1">Description</label>
          <textarea
            className="w-full form-textarea"
            rows={4}
            placeholder="Some intro for this property..."
            name="description"
            value={description}
            onChange={(e) => onDetailsChange(e, "text")}
          ></textarea>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p>
          <span className="text-xl text-slate-800 font-bold">4. Nearby Facilities</span>
          {selectedPOIs.length > 0 && <span className="ml-4 text-sm"> ({selectedPOIs.length} places selected)</span>}
        </p>
        {coordinates.lat && coordinates.lng ? <NearbyPlaces coordinates={coordinates} selectedPOIs={selectedPOIs} setSelectedPOIs={setSelectedPOIs} /> : null}
        <div className="w-full">
          {coordinates.lat && coordinates.lng ? (
            <CurrentLocation
              center={coordinates}
              selectedPOIs={selectedPOIs}
              setSelectedPOIs={setSelectedPOIs}
              customStyles={{ height: "400px", borderRadius: "0.75rem" }}
            />
          ) : null}
        </div>
      </div>
      <div className="flex justify-center">
        <button type="submit" className="btn bg-indigo-500 hover:bg-indigo-600 text-white" onClick={() => updateProperty()}>
          Update
        </button>
      </div>
    </div>
  )
}

export default EditPropertyForm
