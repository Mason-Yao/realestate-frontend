import React, { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import Sidebar from "../../partials/Sidebar"
import Header from "../../partials/Header"
import EditClientDetails from "../../partials/clients/EditClientDetails"
import { useAppSelector, useAppDispatch } from "../../app/hooks"
import { getClient } from "../../apis/clients"
import { clearCurrent, setCurrent } from "../../slices/clientSlice"
import { setIsLoading } from "../../slices/configSlice"
import NoPermission from "../utility/NoPermission"
import { logger } from "../../../../Shared/Utils"

function EditClient() {
  const dispatch = useAppDispatch()
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const user = useAppSelector((state) => state.user)

  useEffect(() => {
    const id = location.state ? location.state.clientID : location.pathname.split("/")[3]
    logger.info("Retrieve info for client: " + id)
    dispatch(setIsLoading(true))
    getClient(id).then((res) => {
      logger.info("GET Client response: ", res)
      dispatch(setCurrent(res))
      dispatch(setIsLoading(false))
    })

    return () => {
      //Clear current client redux when unmount edit client page
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
            <EditClientDetails />
          </main>
        </div>
      </div>
    )
  }
  return <NoPermission />
}

export default EditClient
