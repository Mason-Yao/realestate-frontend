import React, { useState, useEffect } from "react"
import { useAppSelector, useAppDispatch } from "../../app/hooks"
import {
  setPagedTemplates,
  setTotalTemplates,
  pushPreviousKeys,
  popPreviousKey,
  setCurrentPageKey,
  setNextPageKey,
  incrementPage,
  decrementPage,
} from "../../slices/emailSlice"
import TemplateTableItem from "./TemplateTableItem"
import PaginationClassic from "../../components/PaginationClassic"
import { listTemplates, getTemplatesCount } from "../../apis/templates"
import { setIsLoading } from "../../slices/configSlice"
import { tablePageSize } from "../../interfaces/interfaces"

function TemplatesTable({ handleSelectedItems, clearSelectedItems, isCheck, setIsCheck }) {
  const dispatch = useAppDispatch()
  const [selectAll, setSelectAll] = useState(false)
  const [selectAllPageNumber, setSelectAllPageNumber] = useState<number[]>([])

  const emailState = useAppSelector((state) => state.email)
  const { totalTemplates: total, pagedTemplates: templates, currentPage: page, previousKeys, currentPageKey, nextPageKey } = emailState
  const lastPageKey = previousKeys[previousKeys.length - 1]

  const [from, setFrom] = useState(1)
  const [to, setTo] = useState(20)

  useEffect(() => {
    dispatch(setIsLoading(true))
    getTemplatesCount().then((res) => {
      dispatch(setTotalTemplates(res))
      dispatch(setIsLoading(false))
    })
  }, [])

  useEffect(() => {
    setFrom(tablePageSize * (page - 1) + 1)
    setTo(tablePageSize * (page - 1) + templates.length)
  }, [templates])

  //Initial load
  useEffect(() => {
    dispatch(setIsLoading(true))

    listTemplates(true, page, currentPageKey).then((res) => {
      dispatch(setPagedTemplates(res))
      dispatch(setNextPageKey(res.lastEvaluatedKey))
      dispatch(setIsLoading(false))
    })
    setSelectAll(selectAllPageNumber.includes(page))
  }, [])

  const handleNext = () => {
    //if (page < startKeys.length - 1) {
    dispatch(incrementPage())
    //}
    dispatch(setIsLoading(true))

    listTemplates(true, page, nextPageKey).then((res) => {
      if (currentPageKey) {
        dispatch(pushPreviousKeys(currentPageKey))
      }
      dispatch(setCurrentPageKey(nextPageKey))
      dispatch(setPagedTemplates(res))
      dispatch(setNextPageKey(res.lastEvaluatedKey))
      dispatch(setIsLoading(false))
    })
  }

  const handlePrevious = () => {
    //if (page >= 0) {
    dispatch(decrementPage())
    //}
    dispatch(setIsLoading(true))

    listTemplates(true, page, lastPageKey).then((res) => {
      dispatch(setCurrentPageKey(lastPageKey))
      dispatch(popPreviousKey())
      dispatch(setPagedTemplates(res))
      dispatch(setNextPageKey(res.lastEvaluatedKey))
      dispatch(setIsLoading(false))
    })
  }

  const isSelectAllChecked = () => {
    return selectAllPageNumber.includes(page)
  }

  const handleSelectAll = () => {
    setSelectAll(!selectAll)
    //add template id to isCheck if isCheck does not contain them yet
    const notContainedTemplates = templates.filter((template) => !isCheck.includes(template.id)).map((template) => template.id)

    setIsCheck((previousIsCheck) => [...previousIsCheck, ...notContainedTemplates])

    if (selectAll) {
      //un-select all
      setSelectAllPageNumber((prevNumbers) => prevNumbers.filter((number) => number !== page))
      setIsCheck((previousIsCheck) => previousIsCheck.filter((item) => !templates.map((template) => template.id).includes(item)))
    } else {
      //select all
      setSelectAllPageNumber((prevNumbers) => [...prevNumbers, page])
    }
  }

  const handleClick = (e) => {
    const { id, checked } = e.target
    setSelectAllPageNumber((prevNumbers) => prevNumbers.filter((number) => number !== page))
    setIsCheck([...isCheck, id])
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== id))
    }
  }

  useEffect(() => {
    handleSelectedItems(isCheck)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCheck])

  return (
    <div>
      <div className="bg-white shadow-lg rounded-sm border border-slate-200 relative">
        <header className="px-5 py-4">
          <h2 className="font-semibold text-slate-800">
            Templates{" "}
            <span className="text-slate-400 font-medium">
              {from}-{to} of {total}{" "}
            </span>
            <span className="text-slate-400 font-medium">{templates.length == 0 ? "No templates found" : ""}</span>
          </h2>
        </header>
        <div>
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="table-auto w-full">
              {/* Table header */}
              <thead className="text-xs font-semibold uppercase text-slate-500 bg-slate-50 border-t border-b border-slate-200">
                <tr>
                  <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
                    <div className="flex items-center">
                      <label className="inline-flex">
                        <span className="sr-only">Select all</span>
                        <input className="form-checkbox" type="checkbox" checked={isSelectAllChecked()} onChange={handleSelectAll} />
                      </label>
                    </div>
                  </th>
                  <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div className="font-semibold text-left">Name</div>
                  </th>
                  <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div className="font-semibold text-left">Subject</div>
                  </th>
                  <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div className="font-semibold">Created by</div>
                  </th>
                  <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div className="font-semibold text-left">last Edit</div>
                  </th>
                  <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div className="font-semibold text-left">Create Date</div>
                  </th>
                  <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <span className="sr-only">Menu</span>
                  </th>
                </tr>
              </thead>
              {/* Table body */}
              <tbody className="text-sm divide-y divide-slate-200">
                {templates.length > 0 &&
                  templates.map((template, index) => {
                    return (
                      <TemplateTableItem
                        key={index}
                        id={template.id}
                        index={index}
                        size={templates.length}
                        name={template.name}
                        subject={template.subject}
                        createdBy={template.createdBy}
                        lastModifiedDate={template.lastModifiedDate}
                        createdDate={template.createdDate}
                        handleClick={handleClick}
                        isChecked={isCheck.includes(template.id)}
                        page={page}
                        currentPageKey={currentPageKey}
                        clearSelectedItems={clearSelectedItems}
                      />
                    )
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* Pagination */}
      <div className="mt-8">
        <PaginationClassic from={from} to={to} isFirstPage={page == 1} isLastPage={!nextPageKey} handleNext={handleNext} handlePrevious={handlePrevious} />
      </div>
    </div>
  )
}

export default TemplatesTable
