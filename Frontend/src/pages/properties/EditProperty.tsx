import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Sidebar from "../../partials/Sidebar"
import Header from "../../partials/Header"
import PropertyForm from "../../partials/properties/add-property/PropertyForm"
import { useLocation } from "react-router-dom"
import { useAppDispatch } from "../../app/hooks"
import { deleteProperty, getProperty, listProperties } from "../../apis/property"
import { setNextPageKey, setPagedProperties } from "../../slices/propertySlice"
import { Property as PropertyType } from "../../../../Shared/Interface/property"
import { initProperty } from "../../utils/initialData"
import { setBanner, setIsLoading } from "../../slices/configSlice"
import { logger } from "../../../../Shared/Utils"
import ModalBlank from "../../components/ModalBlank"

const EditProperty = () => {
  const dispatch = useAppDispatch()
  const [modalOpen, setModalOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()
  const [currentProperty, setCurrentProperty] = useState<PropertyType>(initProperty)
  const navigate = useNavigate()

  const handleDelete = async (propertyId: string) => {
    // const userComfirm = window.confirm("Are you sure you want to delete this property?")
    // if (!userComfirm) {
    //   return
    // }
    dispatch(setIsLoading(true))
    await deleteProperty(propertyId)
      .then(() => {
        listProperties(true, 1).then((res) => {
          dispatch(setPagedProperties(res))
          dispatch(setNextPageKey(res.lastEvaluatedKey))
        })
        dispatch(setIsLoading(false))
        dispatch(
          setBanner({
            status: "success",
            content: "Property has been deleted successfully.",
          })
        )
        navigate("/properties/properties")
      })
      .catch((err) => {
        logger.error(err)
        dispatch(setIsLoading(false))
        dispatch(
          setBanner({
            status: "error",
            content: "Something wrong happened. Please try again.",
          })
        )
      })
  }

  useEffect(() => {
    const id = location.state ? location.state.propertyID : location.pathname.split("/")[3]
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
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Page header */}
            <div className="flex flex-row justify-between">
              <h1 className="text-2xl md:text-3xl text-slate-800 font-bold mb-8">Edit Property ✨</h1>
              <div>
                <button
                  className="btn w-full bg-red-500 hover:bg-red-600 text-white text-lg"
                  onClick={() => {
                    setModalOpen(true)
                    //handleDelete(currentProperty.id)
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
            <ModalBlank id="delete-notification" modalOpen={modalOpen} setModalOpen={setModalOpen}>
              <div className="flex flex-col gap-y-12 m-4">
                <p className="text-center text-2xl">Are you sure you would like to delete this property?</p>
                <div className="flex flex-row justify-evenly">
                  <button
                    className="btn w-24 h-10 bg-red-500 hover:bg-red-600 text-white text-lg"
                    onClick={() => {
                      setModalOpen(false)
                      handleDelete(currentProperty.id)
                    }}
                  >
                    Delete
                  </button>
                  <button
                    className="btn w-24 h-10 bg-gray-500 hover:bg-gray-600 text-white text-lg"
                    onClick={() => {
                      setModalOpen(false)
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </ModalBlank>
            {currentProperty.id && <PropertyForm property={currentProperty} />}
          </div>
        </main>
      </div>
    </div>
  )
}

export default EditProperty
