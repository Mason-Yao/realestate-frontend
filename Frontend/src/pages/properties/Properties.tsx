import React, { useState, useEffect } from "react"
import Sidebar from "../../partials/Sidebar"
import Header from "../../partials/Header"
import AllProperties from "../../partials/properties/properties/AllProperties"

function Properties() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Page header */}
            <div className="mb-8">
              <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">All Properties ✨</h1>
              <AllProperties />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Properties
