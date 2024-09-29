import PropertyCard from "./PropertyCard"
import { useState } from "react"

const PropertiesList = ({ properties }) => {
  return (
    <>
      <div className="flex flex-col gap-2 justify-between items-start xs:flex-row xs:items-center">
        <p className="text-xl text-slate-800 font-bold">All Properties</p>
      </div>
      <div className="grid grid-cols-12 gap-6">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </>
  )
}

export default PropertiesList
