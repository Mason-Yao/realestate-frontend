import React, { useState } from "react"
import Male from "../../images/avatars/male.png"
import Female from "../../images/avatars/female.png"
import Unknown from "../../images/avatars/unknown.png"
import ModalBlank from "../../components/ModalBlank"
import DropdownEditMenu from "../../components/DropdownEditMenu"
import { useNavigate } from "react-router-dom"
import { deleteClient, listClients } from "../../apis/clients"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { setPagedClients, setNextPageKey } from "../../slices/clientSlice"
import { setIsLoading, setBanner } from "../../slices/configSlice"
import { GENDER } from "../../../../Shared/Interface/client"
import { Color } from "../../interfaces/interfaces"
import { logger } from "../../../../Shared/Utils"

function ClientTableItem(props) {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const settingState = useAppSelector((state) => state.setting)
  const categoryAttributes = Object.keys(settingState).filter((key) => key.startsWith("category_"))
  const categorySettings = categoryAttributes.map((key) => settingState[key])
  const pageSize = Number(settingState.clientsPageSize.value)

  const [dangerModalOpen, setDangerModalOpen] = useState(false)

  const getAvatar = () => {
    if (!props.gender) {
      return Unknown
    }
    if (props.gender === GENDER.Male) {
      return Male
    } else if (props.gender === GENDER.Female) {
      return Female
    }
    return Unknown
  }

  const getCategoryColor = () => {
    if (!props.category || props.category === "") {
      return Color.Transparent
    }
    const categorySetting = categorySettings.find((category) => category.name === props.category)
    if (!categorySetting) {
      return Color.Transparent
    }
    return categorySetting.value.split(";")[1]
  }

  const handleEdit = (id) => {
    navigate(`/clients/edit-client/${id}`, { state: { clientID: id } })
  }

  const handleRemove = (e) => {
    e.stopPropagation()
    setDangerModalOpen(true)
  }

  const confirmRemove = (e, id) => {
    dispatch(setIsLoading(true))
    deleteClient(id)
      .then((res) => {
        logger.info(res)
        props.clearSelectedItems()

        listClients(pageSize, props.page, props.currentPageKey).then((res) => {
          dispatch(setPagedClients(res))
          dispatch(setNextPageKey(res.lastEvaluatedKey))
          dispatch(setIsLoading(false))
        })

        dispatch(
          setBanner({
            status: "success",
            content: `Client deleted successfully.`,
          })
        )
      })
      .catch((error) => {
        dispatch(setIsLoading(false))
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
            <input id={props.id} data-email={props.email} className="form-checkbox" type="checkbox" onChange={props.handleClick} checked={props.isChecked} />
          </label>
        </div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
        <div className="flex items-center relative">
          <div>
            <svg className={`w-4 h-4 shrink-0 fill-current`} style={{ color: getCategoryColor() }} viewBox="0 0 16 16">
              <path d="M8 0L6 5.934H0l4.89 3.954L2.968 16 8 12.223 13.032 16 11.11 9.888 16 5.934h-6L8 0z" />
            </svg>
          </div>
        </div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="flex items-center">
          <button className="w-10 h-10 shrink-0 mr-2 sm:mr-3" onClick={() => handleEdit(props.id)}>
            <img className="rounded-full" src={getAvatar()} width="40" height="40" alt={props.name ? props.name : ""} />
          </button>
          <button className="font-medium text-slate-800" onClick={() => handleEdit(props.id)}>
            {props.name ? props.name : ""}
          </button>
        </div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left">{props.email ? props.email : ""}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left">{props.phone ? props.phone : ""}</div>
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
                Edit Client
              </a>
            </li>
            <li>
              <a className="font-medium text-sm text-rose-500 hover:text-rose-600 flex py-1 px-3" href="#0" onClick={(e) => handleRemove(e)}>
                Remove Client
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
                <div className="text-lg font-semibold text-slate-800">Delete 1 client?</div>
              </div>
              {/* Modal content */}
              <div className="text-sm mb-10">
                <div className="space-y-2">
                  <p>Are you sure to delete client {props.name} ?</p>
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

export default ClientTableItem
