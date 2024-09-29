import { useState } from "react"
import PropertySearch from "./PropertySearch"
import PropertyDetails from "../properties/PropertyDetails"
const tableHeadings = ["Name", "Address", "Rating", "Distance", "Drive"]

const PropertySection = ({ handlePrev, handleNext, propertyData, setPropertyData }) => {
  const [isAddressSelected, setIsAddressSelected] = useState(!!propertyData.id)
  return (
    <>
      <h2 className="font-bold">Select a property:</h2>
      <PropertySearch
        onChange={(option: any) => {
          setPropertyData(option)
          setIsAddressSelected(true)
        }}
      />
      {propertyData.id && <PropertyDetails property={propertyData} />}
      <div className="flex justify-between">
        {isAddressSelected && (
          <button onClick={handlePrev} type="button" className="btn bg-indigo-500 hover:bg-indigo-600 text-white">
            &lt;- Prev
          </button>
        )}
        <div className="ml-auto flex gap-4">
          {isAddressSelected && (
            <button onClick={handleNext} type="button" className="btn bg-indigo-500 hover:bg-indigo-600 text-white">
              Next -&gt;
            </button>
          )}
        </div>
      </div>
    </>
  )
}

export default PropertySection
