import React, { useState } from "react"
import Male from "../../images/avatars/male.png"
import Female from "../../images/avatars/female.png"
import Unknown from "../../images/avatars/unknown.png"
import { useAppSelector } from "../../app/hooks"
import { GENDER } from "../../../../Shared/Interface/client"
import { Color } from "../../interfaces/interfaces"
import { useNavigate } from "react-router-dom"

function ChangeTableItem(props) {
  const navigate = useNavigate()
  const settingState = useAppSelector((state) => state.setting)
  const categoryAttributes = Object.keys(settingState).filter((key) => key.startsWith("category_"))
  const categorySettings = categoryAttributes.map((key) => settingState[key])

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

  return (
    <tr>
      {/* Name and Avatar */}
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="flex items-center">
          <div>
            <svg className={"w-4 h-4 shrink-0 fill-current"} style={{ color: getCategoryColor() }} viewBox="0 0 16 16">
              <path d="M8 0L6 5.934H0l4.89 3.954L2.968 16 8 12.223 13.032 16 11.11 9.888 16 5.934h-6L8 0z" />
            </svg>
          </div>
          <div className="w-10 h-10 shrink-0 mr-2 sm:mr-3">
            <img className="rounded-full" src={getAvatar()} width="40" height="40" alt={props.name ? props.name : ""} />
          </div>
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
        <div className="text-left font-medium text-emerald-500">{props.createdDate ? new Date(props.createdDate).toDateString() : ""}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left font-medium text-sky-500">{props.lastModifiedDate ? new Date(props.lastModifiedDate).toDateString() : ""}</div>
      </td>
    </tr>
  )
}

export default ChangeTableItem
