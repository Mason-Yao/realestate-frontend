import React, { useState } from "react"
import ModalBlank from "../../components/ModalBlank"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { setIsLoading } from "../../slices/configSlice"
import { bulkDeleteClients, listClients } from "../../apis/clients"
import { setPagedClients, setNextPageKey } from "../../slices/clientSlice"
import { setBanner } from "../../slices/configSlice"
import { logger } from "../../../../Shared/Utils"

function BulkDeleteClientsButton({ selectedItems, clearSelectedItems, clearIsCheck }) {
  const dispatch = useAppDispatch()
  const [dangerModalOpen, setDangerModalOpen] = useState(false)
  const clientsState = useAppSelector((state) => state.client)
  const page = clientsState.currentPage
  const currentPageKey = clientsState.currentPageKey
  const settingState = useAppSelector((state) => state.setting)
  const pageSize = Number(settingState.clientsPageSize.value)

  const handleRemove = (e) => {
    e.stopPropagation()
    setDangerModalOpen(true)
  }

  const confirmRemove = (e) => {
    dispatch(setIsLoading(true))
    bulkDeleteClients(selectedItems)
      .then((res) => {
        logger.info("Deleted all selected:", res)
        clearSelectedItems()
        clearIsCheck()

        listClients(pageSize, page, currentPageKey).then((res) => {
          dispatch(setPagedClients(res))
          dispatch(setNextPageKey(res.lastEvaluatedKey))
          dispatch(setIsLoading(false))
        })
        dispatch(
          setBanner({
            status: "success",
            content: `Clients deleted successfully.`,
          })
        )
      })
      .catch((err) => {
        dispatch(
          setBanner({
            status: "error",
            content: `Something wrong happened. Only part of clients deleted successfully.`,
          })
        )
      })
    e.stopPropagation()
    setDangerModalOpen(false)
  }

  return (
    <div className={`${selectedItems.length < 1 && "hidden"}`}>
      <div className="flex items-center">
        <div className="hidden xl:block text-sm italic mr-2 whitespace-nowrap">
          <span>{selectedItems.length}</span> items selected
        </div>
        <button className="btn bg-white border-slate-200 hover:border-slate-300 text-rose-500 hover:text-rose-600" onClick={(e) => handleRemove(e)}>
          Delete
        </button>
      </div>

      {/* Delete Modal */}
      <ModalBlank id="danger-modal" modalOpen={dangerModalOpen} setModalOpen={setDangerModalOpen}>
        <div className="p-5 flex space-x-4">
          {/* Icon */}
          <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-rose-100">
            <svg className="w-4 h-4 shrink-0 fill-current text-rose-500" viewBox="0 0 16 16">
              <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 12c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm1-3H7V4h2v5z" />
            </svg>
          </div>
          {/* Content */}
          <div className="w-full">
            {/* Modal header */}
            <div className="mb-2">
              <div className="text-lg font-semibold text-slate-800">Delete {selectedItems.length} selected clients?</div>
            </div>
            {/* Modal content */}
            <div className="text-sm mb-10">
              <div className="space-y-2">
                <p>Are you sure to delete all selected clients?</p>
              </div>
            </div>
            {/* Modal footer */}
            <div className="flex flex-wrap justify-end space-x-2">
              <button
                className="btn-sm border-slate-200 hover:border-slate-300 text-slate-600"
                onClick={(e) => {
                  e.stopPropagation()
                  setDangerModalOpen(false)
                }}
              >
                Cancel
              </button>
              <button className="btn-sm bg-rose-500 hover:bg-rose-600 text-white" onClick={(e) => confirmRemove(e)}>
                Yes, Delete all
              </button>
            </div>
          </div>
        </div>
      </ModalBlank>
    </div>
  )
}

export default BulkDeleteClientsButton
