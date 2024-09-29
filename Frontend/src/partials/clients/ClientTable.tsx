import React, { useState, useEffect } from "react"
import PaginationClassic from "../../components/PaginationClassic"
import { useAppSelector, useAppDispatch } from "../../app/hooks"
import {
  setPagedClients,
  pushPreviousKeys,
  popPreviousKey,
  setCurrentPageKey,
  setNextPageKey,
  incrementPage,
  decrementPage,
  setTotalClients,
} from "../../slices/clientSlice"
import { setIsLoading } from "../../slices/configSlice"
import { listClients, getClientsCount } from "../../apis/clients"
import Client from "./ClientTableItem"

function ClientTable({ handleSelectedItems, clearSelectedItems, isCheck, setIsCheck }) {
  const dispatch = useAppDispatch()
  const [selectAll, setSelectAll] = useState(false)
  const [selectAllPageNumber, setSelectAllPageNumber] = useState<number[]>([])

  const clientsState = useAppSelector((state) => state.client)
  const { totalClients: total, pagedClients: clients, currentPage: page, previousKeys, currentPageKey, nextPageKey, filter } = clientsState
  const lastPageKey = previousKeys[previousKeys.length - 1]

  const settingState = useAppSelector((state) => state.setting)
  const pageSize = Number(settingState.clientsPageSize.value)
  const categoryAttributes = Object.keys(settingState).filter((key) => key.startsWith("category_"))
  const categorySettings = categoryAttributes.map((key) => settingState[key])

  const [from, setFrom] = useState(1)
  const [to, setTo] = useState(20)

  useEffect(() => {
    dispatch(setIsLoading(true))
    getClientsCount().then((res) => {
      dispatch(setTotalClients(res))
      dispatch(setIsLoading(false))
    })
  }, [])

  useEffect(() => {
    setFrom(pageSize * (page - 1) + 1)
    setTo(pageSize * (page - 1) + clients.length)
  }, [clients])

  //Initial load
  useEffect(() => {
    dispatch(setIsLoading(true))

    listClients(pageSize, page, currentPageKey, filter).then((res) => {
      dispatch(setPagedClients(res))
      dispatch(setNextPageKey(res.lastEvaluatedKey))
      dispatch(setIsLoading(false))
    })
    setSelectAll(selectAllPageNumber.includes(page))
  }, [])

  const handleNext = () => {
    //if (startKeys.length > 0) {
    dispatch(incrementPage())
    //}
    dispatch(setIsLoading(true))

    listClients(pageSize, page, nextPageKey, filter).then((res) => {
      if (currentPageKey) {
        dispatch(pushPreviousKeys(currentPageKey))
      }
      dispatch(setCurrentPageKey(nextPageKey))
      dispatch(setPagedClients(res))
      dispatch(setNextPageKey(res.lastEvaluatedKey))
      dispatch(setIsLoading(false))
    })
  }

  const handlePrevious = async () => {
    //if (page >= 0) {
    dispatch(decrementPage())
    //}
    dispatch(setIsLoading(true))

    listClients(pageSize, page, lastPageKey, filter).then((res) => {
      dispatch(setCurrentPageKey(lastPageKey))
      dispatch(popPreviousKey())
      dispatch(setPagedClients(res))
      dispatch(setNextPageKey(res.lastEvaluatedKey))
      dispatch(setIsLoading(false))
    })
  }

  // const getCategoryValueByName = (name) => {
  //   let result = ""
  //   categorySettings.map((category) => {
  //     if (category.name == name) {
  //       result = category.value.split(";")[0]
  //     }
  //   })
  //   return result
  // }

  //TODO: make this looks better
  const buildFilterDisplayText = () => {
    let result = ""
    if (filter) {
      result += "Filter: "
      Object.keys(filter).map((key) => {
        result += key + " "
      })
      // Object.entries(filter).map((entry) => {
      //   if (entry[0] === "category") {
      //     result += entry[0] + ":" + getCategoryValueByName(entry[1]) + " "
      //   } else {
      //     result += entry[0] + ":" + entry[1] + " "
      //   }
      // })
    }
    return result
  }

  const isSelectAllChecked = () => {
    return selectAllPageNumber.includes(page)
  }

  // TODO: Add a new function to select all clients in db
  const handleSelectAll = () => {
    setSelectAll(!selectAll)
    //add clients id to isCheck if isCheck does not contain them yet
    const notContainedClients = clients
      .filter((client) => !isCheck.map((item) => item.id).includes(client.id))
      .map((client) => {
        return { id: client.id, email: client.email }
      })

    setIsCheck((previousIsCheck) => [...previousIsCheck, ...notContainedClients])

    if (selectAll) {
      //un-select all
      setSelectAllPageNumber((prevNumbers) => prevNumbers.filter((number) => number !== page))
      setIsCheck((previousIsCheck) => previousIsCheck.filter((item) => !clients.map((client) => client.id).includes(item.id)))
    } else {
      //select all
      setSelectAllPageNumber((prevNumbers) => [...prevNumbers, page])
    }
  }

  const handleClick = (e) => {
    const { id, checked } = e.target
    const email = e.currentTarget.getAttribute("data-email")
    setSelectAllPageNumber((prevNumbers) => prevNumbers.filter((number) => number !== page))
    setIsCheck([...isCheck, { id, email }])
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item.id !== id))
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
            Clients{" "}
            <span className="text-slate-400 font-medium">
              {from}-{to} of {total}
              {"  "} {buildFilterDisplayText()}
            </span>
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
                  <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
                    <span className="sr-only">Favourite</span>
                  </th>
                  <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div className="font-semibold text-left">Name</div>
                  </th>
                  <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div className="font-semibold text-left">Email</div>
                  </th>
                  <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div className="font-semibold text-left">Phone</div>
                  </th>
                  <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div className="font-semibold">Created by</div>
                  </th>
                  <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div className="font-semibold text-left">last Modified</div>
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
                {clients.length > 0 &&
                  clients.map((client, index) => {
                    return (
                      <Client
                        key={index}
                        id={client.id}
                        index={index}
                        size={clients.length}
                        name={client.name}
                        gender={client.gender}
                        email={client.email}
                        phone={client.phone}
                        category={client.category}
                        createdBy={client.createdBy}
                        lastModifiedDate={client.lastModifiedDate}
                        createdDate={client.createdDate}
                        handleClick={handleClick}
                        isChecked={isCheck.map((item) => item.id).includes(client.id)}
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

export default ClientTable
