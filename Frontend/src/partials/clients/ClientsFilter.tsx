import React, { useState, useEffect } from "react"
import { useAppSelector, useAppDispatch } from "../../app/hooks"
import { useNavigate } from "react-router-dom"
import ModalBasic from "../../components/ModalBasic"
import { logger } from "../../../../Shared/Utils"
import { setIsLoading, setBanner } from "../../slices/configSlice"
import { DATE_FILTER_CONDITION } from "../../interfaces/interfaces"
import { listClients } from "../../apis/clients"
import { setPagedClients, clearPagedKeys, setNextPageKey, setFilter } from "../../slices/clientSlice"
import { buildDateFilter } from "../../utils/helper"
import { VISA_STATUS, KNOWN_BY, SOCIAL_MEDIA, ClientFilter } from "../../../../Shared/Interface/client"

function ClientsFilter({ filterModalOpen, setFilterModalOpen }) {
  const dispatch = useAppDispatch()
  const settingState = useAppSelector((state) => state.setting)
  const pageSize = Number(settingState.clientsPageSize.value)
  const categoryAttributes = Object.keys(settingState).filter((key) => key.startsWith("category_"))
  const categorySettings = categoryAttributes.map((key) => settingState[key])

  const getCategoryName = (category) => {
    return category.value.split(";")[0]
  }

  const [filterCondition, setFilterCondition] = useState([
    {
      name: "category",
      value: "",
      label: "Category",
      options: [
        <option key="" value="">
          Any
        </option>,
        categorySettings.map((category, index) => (
          <option key={index} value={category.name}>
            {getCategoryName(category)}
          </option>
        )),
      ],
    },
    {
      name: "hasValid",
      value: "",
      label: "Has a valid contact",
      options: [
        <option key="" value="">
          Any
        </option>,
        <option key="email" value="email">
          Email
        </option>,
        <option key="phone" value="phone">
          Phone
        </option>,
        Object.values(SOCIAL_MEDIA).map((value, index) => (
          <option key={index} value={value.toLowerCase()}>
            {value}
          </option>
        )),
      ],
    },
    {
      name: "createdDate",
      value: "",
      label: "Create Date",
      options: [
        <option key="" value="">
          Any
        </option>,
        Object.values(DATE_FILTER_CONDITION).map((condition, index) => (
          <option key={index} value={buildDateFilter(condition)}>
            {condition}
          </option>
        )),
      ],
    },
    {
      name: "lastModifiedDate",
      value: "",
      label: "Last Modified Date",
      options: [
        <option key="" value="">
          Any
        </option>,
        Object.values(DATE_FILTER_CONDITION).map((condition, index) => (
          <option key={index} value={buildDateFilter(condition)}>
            {condition}
          </option>
        )),
      ],
    },
    {
      name: "visa",
      value: "",
      label: "Visa Status",
      options: [
        <option key="" value="">
          Any
        </option>,
        Object.values(VISA_STATUS).map((value, index) => (
          <option key={index} value={Object.keys(VISA_STATUS)[Object.values(VISA_STATUS).indexOf(value)]}>
            {value}
          </option>
        )),
      ],
    },
    {
      name: "knownBy",
      value: "",
      label: "Known By",
      options: [
        <option key="" value="">
          Any
        </option>,
        Object.values(KNOWN_BY).map((value, index) => (
          <option key={index} value={Object.keys(KNOWN_BY)[Object.values(KNOWN_BY).indexOf(value)]}>
            {value}
          </option>
        )),
      ],
    },
    {
      name: "gender",
      value: "",
      label: "Gender",
      options: [
        <option key="" value="">
          Any
        </option>,
        <option key="Male" value="Male">
          Male
        </option>,
        <option key="Female" value="Female">
          Female
        </option>,
      ],
    },
    //Birthday filter is complex, will add it later.
    // {
    //   name: "birthday",
    //   value: "",
    //   label: "Birthday",
    //   options: [
    //     <option key="" value="">
    //       Any
    //     </option>,
    //     Object.values(BIRTHDAY_FILTER_CONDITION).map((value, index) => (
    //       <option key={index} value={buildDateFilter(value)}>
    //         {value}
    //       </option>
    //     )),
    //   ],
    // },
  ])

  const handleConditionChange = (conditionName, newValue) => {
    const updatedFilterCondition = filterCondition.map((condition) => {
      if (condition.name === conditionName) {
        return { ...condition, value: newValue }
      }
      return condition
    })
    setFilterCondition(updatedFilterCondition)
  }

  const hasNoFilter = () => {
    return filterCondition.every((condition) => condition.value === "")
  }

  const handleFilter = (e) => {
    dispatch(setIsLoading(true))
    e.stopPropagation()
    setFilterModalOpen(false)
    if (hasNoFilter()) {
      clearFilter()
      dispatch(setIsLoading(false))
      return
    }
    const condition: any = {}
    filterCondition.forEach((conditionItem) => {
      if (conditionItem.value !== "") {
        condition[conditionItem.name] = conditionItem.value
      }
    })

    //explicitly change hasValid from string to array to match backend.
    if (condition.hasValid) {
      const hasValidValue = condition.hasValid
      condition.hasValid = [hasValidValue]
    }
    //explicitly change createdDate to match backend.
    if (condition.createdDate) {
      const date = condition.createdDate
      condition.createdDate = { minimum: date }
    }
    dispatch(setFilter(condition))

    listClients(pageSize, 1, undefined, condition).then((res) => {
      dispatch(setPagedClients(res))
      dispatch(setNextPageKey(res.lastEvaluatedKey))
      dispatch(setIsLoading(false))
    })
  }

  const handleClear = () => {
    clearFilter()
    setFilterCondition(filterCondition.map((condition) => ({ ...condition, value: "" })))
    setFilterModalOpen(false)
  }

  const clearFilter = () => {
    dispatch(setIsLoading(true))
    dispatch(setFilter(undefined))
    dispatch(clearPagedKeys())
    listClients(pageSize, 1).then((res) => {
      dispatch(setPagedClients(res))
      dispatch(setNextPageKey(res.lastEvaluatedKey))
      dispatch(setIsLoading(false))
    })
  }

  return (
    <div className="space-y-8 mt-8">
      <ModalBasic id="sendEmail-modal" modalOpen={filterModalOpen} setModalOpen={setFilterModalOpen} title={"Clients Filter"} size={`max-w-5xl`}>
        {/* Modal content */}
        <div className="px-5 py-4">
          <div className="text-xs font-semibold text-slate-400 uppercase pt-1.5 pb-2 px-4">Filters</div>

          <div className="grid gap-8 md:grid-cols-2 my-2 px-4 py-2">
            {filterCondition.map((condition, index) => (
              <div key={index}>
                <label className="block text-xs font-medium mb-1 ml-2" htmlFor={condition.name}>
                  {condition.label}
                </label>
                <select
                  id={condition.name}
                  className="form-select w-full ml-2 h-10 text-xs font-medium text-slate-600 hover:text-slate-700"
                  value={condition.value}
                  onChange={(e) => handleConditionChange(condition.name, e.target.value)}
                >
                  {condition.options}
                </select>
              </div>
            ))}
          </div>
        </div>
        {/* Modal footer */}
        <div className="px-5 py-4 border-t border-slate-200">
          <div className="py-2 px-3 border-t border-slate-200 bg-slate-50">
            <ul className="flex items-center justify-between">
              <li>
                <button className="btn-xs bg-white border-slate-200 hover:border-slate-300 text-slate-500 hover:text-slate-600" onClick={() => handleClear()}>
                  Clear
                </button>
              </li>
              <li>
                <button
                  className="btn-xs bg-indigo-500 hover:bg-indigo-600 text-white"
                  onClick={(e) => handleFilter(e)}
                  onBlur={() => setFilterModalOpen(false)}
                >
                  Apply
                </button>
              </li>
            </ul>
          </div>
        </div>
      </ModalBasic>
    </div>
  )
}

export default ClientsFilter
