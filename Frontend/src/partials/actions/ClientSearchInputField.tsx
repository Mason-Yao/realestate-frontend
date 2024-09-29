import React, { useState, useEffect } from "react"
import { useAppSelector, useAppDispatch } from "../../app/hooks"
import { searchClient, listClients } from "../../apis/clients"
import { setPagedClients, clearPagedKeys, setNextPageKey } from "../../slices/clientSlice"
import { setIsLoading } from "../../slices/configSlice"
import { logger } from "../../../../Shared/Utils"
import { useDebounce } from "../../utils/customHooks"

function ClientSearchInputField({ placeholder }) {
  const dispatch = useAppDispatch()
  const [search, setSearch] = useState("")
  const debouncedSearch = useDebounce(search, 3000)
  const [needDebounce, setNeedDebounce] = useState(true)
  const settingState = useAppSelector((state) => state.setting)
  const pageSize = Number(settingState.clientsPageSize.value)

  useEffect(() => {
    if (needDebounce) {
      if (search !== "") {
        handleSearch()
      }
    }
  }, [debouncedSearch])

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setNeedDebounce(false)
      handleSearch()
    }
  }

  const handleClear = () => {
    setNeedDebounce(false)
    setSearch("")
    clearSearch()
  }

  const clearSearch = () => {
    dispatch(setIsLoading(true))
    dispatch(clearPagedKeys())
    listClients(pageSize, 1).then((res) => {
      dispatch(setPagedClients(res))
      dispatch(setNextPageKey(res.lastEvaluatedKey))
      dispatch(setIsLoading(false))
    })
  }

  const handleSearch = () => {
    dispatch(setIsLoading(true))
    dispatch(clearPagedKeys())
    if (search !== "") {
      searchClient(search).then((res) => {
        logger.debug("search:" + JSON.stringify(res.items))
        dispatch(setPagedClients(res))
        dispatch(setIsLoading(false))
      })
    } else {
      clearSearch()
    }
  }

  return (
    <main>
      <div className="relative">
        <input
          id="action-search"
          className={`form-input pl-9 focus:border-slate-300`}
          placeholder={placeholder}
          onChange={(e) => {
            setSearch(e.target.value)
            setNeedDebounce(true)
          }}
          value={search}
          onKeyDown={(e) => handleKeyDown(e)}
        />

        {/* Search icon */}
        <button className="absolute inset-0 right-auto group" aria-label="Search" onClick={() => handleSearch()}>
          <svg
            className="w-4 h-4 shrink-0 fill-current text-slate-400 group-hover:text-slate-500 ml-3 mr-2"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z" />
            <path d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z" />
          </svg>
        </button>

        {/* Clear icon */}
        <button className={`absolute inset-0 left-auto group mr-1 ${search.length > 0 ? "" : "hidden"} `} aria-label="Clear" onClick={() => handleClear()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-square-x w-6 h-6 fill-none hover:stroke-2 stroke-slate-500"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M3 3m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" />
            <path d="M10 10l4 4m0 -4l-4 4" />
          </svg>
        </button>
      </div>
    </main>
  )
}

export default ClientSearchInputField
