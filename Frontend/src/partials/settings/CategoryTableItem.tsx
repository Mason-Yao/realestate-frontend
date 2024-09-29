import React, { useState } from "react"
import { useAppDispatch } from "../../app/hooks"
import { setBanner, setIsLoading } from "../../slices/configSlice"
import { deleteSetting, getSettings, updateSetting } from "../../apis/setting"
import { loadSettings } from "../../slices/settingSlice"
import { Compact } from "@uiw/react-color"

function CategoryTableItem({ id, index, category }) {
  const dispatch = useAppDispatch()
  const [showEdit, setShowEdit] = useState(false)
  const [categoryName, setCategoryName] = useState("")
  const [color, setColor] = useState("#FFFFFF")
  const [invalidName, setInvalidName] = useState(false)

  const checkCategoryName = () => {
    return categoryName !== "" && !categoryName.includes(";")
  }

  const getCategoryName = (category) => {
    return category.value.split(";")[0]
  }

  const getCategoryColor = (category) => {
    return category.value.split(";")[1]
  }

  const handleDelete = () => {
    dispatch(setIsLoading(true))
    deleteSetting(category.name)
      .then((res) => {
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
  }

  const handleUpdate = () => {
    const value = categoryName + ";" + color

    if (checkCategoryName()) {
      dispatch(setIsLoading(true))
      updateSetting(category.name, value)
        .then((res) => {
          getSettings().then((res) => {
            dispatch(loadSettings(res))
            dispatch(setIsLoading(false))
          })
          setShowEdit(false)
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
    <li className="">
      <div className="flex items-center justify-between border-t border-slate-200 px-2">
        <div className="flex">
          <div className="w-8 h-8 rounded-full shrink-0 my-2 mr-3" style={{ backgroundColor: `${getCategoryColor(category)}` }}>
            <svg className="w-6 h-6 fill-current" viewBox="0 0 36 36"></svg>
          </div>
          <div className="flex self-center px-2">{getCategoryName(category)}</div>
        </div>
        <div className=" text-sm py-2">
          <div className="flex items-center justify-between">
            {!showEdit && (
              <button
                className="btn border-slate-200 hover:border-slate-300 text-slate-600"
                onClick={() => {
                  setCategoryName(getCategoryName(category))
                  setColor(getCategoryColor(category))
                  setShowEdit(true)
                }}
              >
                Edit
              </button>
            )}
            <button className="btn border-slate-200 hover:border-slate-300 text-rose-500 ml-2" onClick={() => handleDelete()}>
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Edit category fields */}
      {showEdit && (
        <div className="p-2 mb-4  border-slate-300">
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
                value={categoryName}
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
                  setShowEdit(false)
                }}
              >
                Cancel
              </button>
              <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3" onClick={() => handleUpdate()}>
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </li>
  )
}

export default CategoryTableItem
