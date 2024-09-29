import React, { useState } from "react"
import CategoryTable from "./CategoryTable"
import { useAppSelector, useAppDispatch } from "../../app/hooks"
import { Compact } from "@uiw/react-color"
import { addSetting, getSettings } from "../../apis/setting"
import { loadSettings } from "../../slices/settingSlice"
import { setIsLoading, setBanner } from "../../slices/configSlice"

function ClientPanel() {
  const dispatch = useAppDispatch()
  const settingState = useAppSelector((state) => state.setting)
  const categoryAttributes = Object.keys(settingState).filter((key) => key.startsWith("category_"))
  const categorySettings = categoryAttributes.map((key) => settingState[key])

  const [showAddNew, setShowAddNew] = useState(false)
  const [categoryName, setCategoryName] = useState("")
  const [color, setColor] = useState("#FFFFFF")
  const [invalidName, setInvalidName] = useState(false)

  const checkCategoryName = () => {
    return categoryName !== "" && !categoryName.includes(";")
  }

  const handleAddCategory = () => {
    const index = categorySettings.length > 0 ? Number(categorySettings[categorySettings.length - 1].name.split("_")[1]) + 1 : 0
    const name = "category_" + index
    const value = categoryName + ";" + color

    if (checkCategoryName()) {
      dispatch(setIsLoading(true))
      addSetting(name, value)
        .then((res) => {
          setShowAddNew(false)
          getSettings().then((res) => {
            dispatch(loadSettings(res))
            dispatch(setIsLoading(false))
          })
        })
        .catch((error) => {
          dispatch(
            setBanner({
              status: "error",
              content: `Something wrong happened. Please try again.`,
            })
          )
          dispatch(setIsLoading(false))
        })
    } else {
      setInvalidName(true)
    }
  }

  return (
    <div className="grow">
      {/* Panel body */}
      <div className="p-6 space-y-6">
        <h2 className="text-2xl text-slate-800 font-bold mb-5">Client Settings</h2>
        {/* General */}
        <div>
          <h3 className="text-xl leading-snug text-slate-800 font-bold mb-1">Category</h3>
          <ul>
            <li className="py-3 border-b border-slate-200">
              <div className="flex item-center justify-between">
                <div>
                  <div className="text-slate-800 font-semibold">Customize clients category</div>
                  <div className="text-sm">Add, remove the category of clients.</div>
                </div>
                {/* Add New Category button */}
                <div className="flex items-center">
                  <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white" onClick={() => setShowAddNew(true)}>
                    <svg className="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                      <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                    </svg>
                    <span className="xs:block ml-2">New</span>
                  </button>
                </div>
              </div>

              {/* New Category Fields */}
              {showAddNew && (
                <div className="p-2 mt-4 border bg-slate-100 border-slate-200 dark:border-slate-700">
                  <div className="grid gap-5 md:grid-cols-12">
                    {/* Name */}
                    <div className="col-span-4">
                      <label className="block text-sm font-medium mb-1" htmlFor="default">
                        Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="category_name"
                        className={`form-input w-full ${invalidName ? "border-rose-500" : ""}`}
                        type="text"
                        onChange={(e) => {
                          setInvalidName(false)
                          setCategoryName(e.target.value)
                        }}
                      />
                      {invalidName ? <div className="text-xs mt-1 text-rose-500">Name cannot be empty and cannot contain semicolon.</div> : <div></div>}
                    </div>

                    {/* Color */}
                    <div className="col-span-5">
                      <label className="block text-sm font-medium mb-1" htmlFor="default">
                        Color
                      </label>
                      <Compact
                        style={{ width: "100%" }}
                        color={color}
                        onChange={(color) => {
                          setColor(color.hex)
                        }}
                      />
                    </div>

                    <div className="flex self-end justify-end col-span-3">
                      <button
                        className="btn border-slate-200 hover:border-slate-300 text-slate-600"
                        onClick={() => {
                          setInvalidName(false)
                          setShowAddNew(false)
                        }}
                      >
                        Cancel
                      </button>
                      <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3" onClick={() => handleAddCategory()}>
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <CategoryTable categorySettings={categorySettings} />
            </li>
          </ul>
        </div>
      </div>

      {/* Panel footer */}
      <footer>
        <div className="flex flex-col px-6 py-5 border-slate-200">
          <div className="flex self-end">
            <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3">Save Changes</button>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default ClientPanel
