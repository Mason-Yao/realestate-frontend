import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import Sidebar from "../../partials/Sidebar"
import Header from "../../partials/Header"
import BulkDeleteTemplatesButton from "../../partials/actions/BulkDeleteTemplatesButton"
import { useAppSelector } from "../../app/hooks"
import NoPermission from "../utility/NoPermission"
import TemplatesTable from "../../partials/email/TemplatesTable"

interface SelectedTemplates {
  id: string
}

function Templates() {
  let navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedItems, setSelectedItems] = useState<SelectedTemplates[]>([])
  const [isCheck, setIsCheck] = useState<SelectedTemplates[]>([])

  const user = useAppSelector((state) => state.user)

  const handleSelectedItems = (selectedItems) => {
    setSelectedItems([...selectedItems])
  }

  const clearSelectedItems = () => {
    setSelectedItems([])
  }

  const clearIsCheck = () => {
    setIsCheck([])
  }

  const handleAddTemplate = () => {
    let path = "/marketing/templates/new"
    navigate(path)
  }

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
            <div className="px-2 py-2">
              <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
                {/* Page header */}
                <div className="sm:flex sm:justify-between sm:items-center mb-8">
                  {/* Left: Title */}
                  <div className="mb-4 sm:mb-0">
                    <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">Manage Templates ✨</h1>
                  </div>

                  {/* Right: Actions */}
                  <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                    {/* Delete button */}
                    <BulkDeleteTemplatesButton selectedItems={selectedItems} clearSelectedItems={clearSelectedItems} clearIsCheck={clearIsCheck} />

                    {/* Add New Template button */}
                    <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white" onClick={() => handleAddTemplate()}>
                      <svg className="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                        <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                      </svg>
                      <span className="xs:block ml-2">New Template</span>
                    </button>
                  </div>
                </div>

                {/* Table */}
                <TemplatesTable handleSelectedItems={handleSelectedItems} clearSelectedItems={clearSelectedItems} isCheck={isCheck} setIsCheck={setIsCheck} />
              </div>
            </div>
          </main>
        </div>
      </div>
    )
  }
  return <NoPermission />
}

export default Templates
