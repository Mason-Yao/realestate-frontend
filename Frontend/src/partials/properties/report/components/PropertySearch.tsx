import React, { useState } from "react"
import { BsSearch } from "react-icons/bs"

// We are waiting for property search by address to be implemented in the backend
// For now, we will just fetch all and do the filtering in the frontend

const PropertySearch = () => {
  const [searchActive, setSearchActive] = useState<boolean>(false)

  const handleFocus = () => {
    setSearchActive(true)
  }

  const handleBlur = () => {
    setSearchActive(false)
  }

  const addresses = ["123 Main St", "456 Main St", "789 Main St"]

  return (
    <div className="relative min-w-[400px]">
      <div className="relative">
        <input
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="form-input w-full focus:border-slate-300"
          type="search"
          placeholder="Find a property by address..."
        />
        <button className="absolute right-0 top-1/2" type="button">
          <BsSearch className="w-4 h-4 fill-current -translate-y-1/2 text-slate-400 hover:text-slate-500 mr-2" />
        </button>
      </div>
      {searchActive && (
        <ul className="absolute top-[110%] rounded-md bg-white w-full">
          {addresses.map((address, i) => (
            <li key={i} className="p-2 cursor-pointer hover:bg-slate-100">
              {address}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default PropertySearch
