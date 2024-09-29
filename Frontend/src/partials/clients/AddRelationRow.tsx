import React, { useState, useEffect } from "react"
import SearchDropdown from "../../components/SearchDropdown"

function AddRelationRow() {
  const [selectedOption, setSelectedOption] = useState("")
  return (
    <main>
      {/* Select */}

      <label className="flex text-sm font-medium mb-1" htmlFor="relation">
        Relation
      </label>

      <div className="flex">
        <div>
          <select id="country" className="form-select">
            <option>Agent</option>
            <option>Client</option>
            <option>Spouse</option>
            <option>Business</option>
            <option>Friend</option>
          </select>
        </div>

        <div className="flex-1 inline-block w-full">
          <SearchDropdown value={selectedOption} onChange={setSelectedOption} />
        </div>

        <div>
          <button className="btn bg-white shrink-0 rounded border border-slate-200 hover:border-slate-300 shadow-sm pl-3 pb-3 ">
            <svg className="w-4 h-4 fill-current text-indigo-500" viewBox="0 0 16 16">
              <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1Z" />
            </svg>
          </button>
          <button className="btn bg-white border-slate-200 hover:border-slate-300 pb-3">
            <svg className="w-4 h-4 fill-current text-rose-500 shrink-0" viewBox="0 0 16 16">
              <path d="M5 7h2v6H5V7zm4 0h2v6H9V7zm3-6v2h4v2h-1v10c0 .6-.4 1-1 1H2c-.6 0-1-.4-1-1V5H0V3h4V1c0-.6.4-1 1-1h6c.6 0 1 .4 1 1zM6 2v1h4V2H6zm7 3H3v9h10V5z" />
            </svg>
          </button>
        </div>
      </div>
    </main>
  )
}

export default AddRelationRow
