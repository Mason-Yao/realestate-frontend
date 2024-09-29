import React, { useEffect, useState } from "react"
import { useAppSelector } from "../../app/hooks"
import ChangeTableItem from "./ChangeTableItem"
import { listClients } from "../../apis/clients"
import ComponentLoader from "../../utils/ComponentLoader"
import { Client } from "../../../../Shared/Interface/client"

function ChangeTable({ date }) {
  const [clients, setClients] = useState<Client[]>([])
  const [pageSize, setPageSize] = useState<number>(0)
  const [isLoading, setIsLoading] = useState(true)
  const settingState = useAppSelector((state) => state.setting)
  const defaultPageSize = Number(settingState.clientsPageSize.value)

  useEffect(() => {
    setIsLoading(true)
    fetchRecentChange(1, null).then((res) => {
      if (pageSize !== res) {
        setPageSize(res)
      } else setIsLoading(false)
    })
  }, [date])

  useEffect(() => {
    if (pageSize) {
      listClients(pageSize, 1, undefined).then((res) => {
        setClients(res.items)
        setIsLoading(false)
      })
    } else {
      setClients([])
      setIsLoading(false)
    }
  }, [pageSize])

  const fetchRecentChange = (page, currentPageKey): Promise<number> => {
    return new Promise((resolve) => {
      listClients(page == 1 && pageSize > defaultPageSize ? pageSize : defaultPageSize, page, currentPageKey).then((res) => {
        if (res.lastEvaluatedKey && new Date(res.lastEvaluatedKey.lastModifiedDate) > date) {
          resolve(fetchRecentChange(page + 1, res.lastEvaluatedKey))
        } else {
          const idx = res.items.findIndex((item) => new Date(item.lastModifiedDate || "") < date)
          resolve((page - 1) * defaultPageSize + idx)
        }
      })
    })
  }

  return (
    <div className="bg-white shadow-lg rounded-sm border border-slate-200 relative h-96 flex flex-col">
      <header className="px-5 py-4">
        <h2 className="font-semibold text-slate-800">Recent Changed Client</h2>
      </header>
      <div className="flex-grow h-full overflow-hidden flex flex-col">
        {/* Table */}
        <div className="flex flex-col overflow-x-auto h-full">
          <table className="table-auto w-full overflow-y-hidden">
            {/* Table header */}
            <thead className="text-xs font-semibold uppercase text-slate-500 bg-slate-50 border-t border-b border-slate-200">
              <tr>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Name</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Email</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Mobile</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Created At</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Updated At</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm divide-y divide-slate-200 border-b">
              {!isLoading &&
                clients.length > 0 &&
                clients.map((client, index) => {
                  return (
                    <ChangeTableItem
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
                    />
                  )
                })}
            </tbody>
          </table>
          {isLoading && <ComponentLoader />}
        </div>
      </div>
    </div>
  )
}

export default ChangeTable
