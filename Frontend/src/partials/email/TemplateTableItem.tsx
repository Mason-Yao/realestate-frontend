import React, { useState } from "react"
import ModalBlank from "../../components/ModalBlank"
import DropdownEditMenu from "../../components/DropdownEditMenu"
import { useNavigate } from "react-router-dom"
import { deleteTemplate, getTemplate, listTemplates } from "../../apis/templates"
import { useAppDispatch } from "../../app/hooks"
import { setPagedTemplates, setNextPageKey } from "../../slices/emailSlice"
import { setBanner, setIsLoading } from "../../slices/configSlice"
//import { logger } from "../../../../Shared/Utils"

function TemplateTableItem(props) {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [dangerModalOpen, setDangerModalOpen] = useState(false)

  const handleEdit = (id) => {
    navigate(`/marketing/edit-template/${id}`, { state: { templateID: id } })
  }

  const handleRemove = (e) => {
    e.stopPropagation()
    setDangerModalOpen(true)
  }

  const confirmRemove = (e, id) => {
    dispatch(setIsLoading(true))
    deleteTemplate(id)
      .then((res) => {
        //page is initialized with -1 to indicate page 1, so page + 2 is the actual page number
        listTemplates(true, props.page, props.currentPageKey).then((res) => {
          dispatch(setPagedTemplates(res))
          dispatch(setNextPageKey(res.lastEvaluatedKey))
          dispatch(setIsLoading(false))
        })
        dispatch(
          setBanner({
            status: "success",
            content: `Template has been deleted successfully.`,
          })
        )
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
    e.stopPropagation()
    setDangerModalOpen(false)
  }

  return (
    <tr>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
        <div className="flex items-center">
          <label className="inline-flex">
            <span className="sr-only">Select</span>
            <input id={props.id} className="form-checkbox" type="checkbox" onChange={props.handleClick} checked={props.isChecked} />
          </label>
        </div>
      </td>

      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap" onClick={() => handleEdit(props.id)}>
        <button className="font-medium text-slate-800">{props.name ? props.name : ""}</button>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left">{props.subject ? props.subject : ""}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-center">{props.createdBy ? props.createdBy : ""}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left font-medium text-sky-500">{props.lastModifiedDate ? new Date(props.lastModifiedDate).toDateString() : ""}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left font-medium text-emerald-500">{props.createdDate ? new Date(props.createdDate).toDateString() : ""}</div>
      </td>

      <td className="px-2 first:pl-5 last:pr-5 py-3 w-px">
        {/* Menu button */}
        <div className="text-slate-400 hover:text-slate-500 rounded-full">
          <span className="sr-only">Menu</span>
          <DropdownEditMenu className="relative inline-flex" align="right" index={props.index} size={props.size}>
            <li>
              <a className="font-medium text-sm text-slate-600 hover:text-slate-800 flex py-1 px-3" href="#0" onClick={() => handleEdit(props.id)}>
                Edit
              </a>
            </li>
            <li>
              <a className="font-medium text-sm text-rose-500 hover:text-rose-600 flex py-1 px-3" href="#0" onClick={(e) => handleRemove(e)}>
                Delete
              </a>
            </li>
          </DropdownEditMenu>
        </div>
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
                <div className="text-lg font-semibold text-slate-800">Delete this template?</div>
              </div>
              {/* Modal content */}
              <div className="text-sm mb-10">
                <div className="space-y-2">
                  <p>Are you sure to delete selected email template {props.name} ?</p>
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
                <button className="btn-sm bg-rose-500 hover:bg-rose-600 text-white" onClick={(e) => confirmRemove(e, props.id)}>
                  Yes, Delete it
                </button>
              </div>
            </div>
          </div>
        </ModalBlank>
      </td>
    </tr>
  )
}

export default TemplateTableItem
