import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../app/hooks"

import Sidebar from "../../partials/Sidebar"
import Header from "../../partials/Header"
import PropertyDetails from "../../partials/properties/properties/PropertyDetails"
import { getProperty } from "../../apis/property"
import { Property as PropertyType } from "../../../../Shared/Interface/property"
import { initProperty } from "../../utils/initialData"
import { setIsLoading } from "../../slices/configSlice"
import VisitorHeader from "../../components/VisitorHeader"

function Property() {
  const dispatch = useAppDispatch()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()
  const [currentProperty, setCurrentProperty] = useState<PropertyType>(initProperty)
  const user = useAppSelector((state) => state.user)

  useEffect(() => {
    const id = location.state ? location.state.propertyID : location.pathname.split("/")[2]

    dispatch(setIsLoading(true))
    getProperty(id)
      .then((res) => {
        setCurrentProperty(res)
        dispatch(setIsLoading(false))
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      {user.isValid ? <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> : ""}

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        {user.isValid ? <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> : <VisitorHeader />}
        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Page header */}
            <div className="mb-8">
              {/* <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">Property Details ✨</h1> */}
              {currentProperty.id && <PropertyDetails property={currentProperty} />}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Property
