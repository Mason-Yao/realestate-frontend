import React, { useState, useEffect } from "react"
import ClientsFilter from "../clients/ClientsFilter"

function FilterClientsButton() {
  const [filterModalOpen, setFilterModalOpen] = useState(false)

  return (
    <div className="relative inline-flex">
      <button
        className="btn bg-white border-slate-200 hover:border-slate-300 text-slate-500 hover:text-slate-600"
        onClick={(e) => {
          e.stopPropagation()
          setFilterModalOpen(!filterModalOpen)
        }}
      >
        <span className="sr-only">Filter</span>
        <wbr />
        <svg className="w-4 h-4 fill-current" viewBox="0 0 16 16">
          <path d="M9 15H7a1 1 0 010-2h2a1 1 0 010 2zM11 11H5a1 1 0 010-2h6a1 1 0 010 2zM13 7H3a1 1 0 010-2h10a1 1 0 010 2zM15 3H1a1 1 0 010-2h14a1 1 0 010 2z" />
        </svg>
      </button>
      <ClientsFilter filterModalOpen={filterModalOpen} setFilterModalOpen={setFilterModalOpen} />
    </div>
  )
}

export default FilterClientsButton
