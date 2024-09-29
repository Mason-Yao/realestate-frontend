import React, { useEffect, useState } from "react"
import Sidebar from "../../partials/Sidebar"
import Header from "../../partials/Header"
import AddPropertyForm from "../../partials/properties/add-property/AddPropertyForm"
import PropertyForm from "../../partials/properties/add-property/PropertyForm"

function AddProperty() {
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
              <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">Add Property ✨</h1>
              <PropertyForm />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default AddProperty
