import React, { useState } from "react"
import { useEffect } from "react"
import { useAppDispatch } from "../../app/hooks"
import { clearCurrent } from "../../slices/clientSlice"
import Sidebar from "../../partials/Sidebar"
import Header from "../../partials/Header"
import AddClientProgress from "../../partials/clients/AddClientProgress"
import { useAppSelector } from "../../app/hooks"
import NoPermission from "../utility/NoPermission"

function AddClient() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const dispatch = useAppDispatch()

  const user = useAppSelector((state) => state.user)

  //Clear current client redux when unmount add client page
  useEffect(() => {
    return () => {
      dispatch(clearCurrent())
    }
  }, [])

  if (user.isValid) {
    return (
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Content area */}
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          {/*  Site header */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          <main>
            <AddClientProgress />
          </main>
        </div>
      </div>
    )
  }
  return <NoPermission />
}

export default AddClient
