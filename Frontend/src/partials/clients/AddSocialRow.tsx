import React, { useState, forwardRef, useImperativeHandle } from "react"
import { useAppSelector, useAppDispatch } from "../../app/hooks"
import { SOCIAL_MEDIA } from "../../../../Shared/Interface/client"
import { deleteCurrentSocial, updateCurrentSocialValue, updateCurrentSocialName } from "../../slices/clientSlice"

interface Props {
  index: number
  entry: [string, any]
}

export interface SocialRow {
  checkSocial: () => boolean
}

const AddSocialRow = forwardRef<SocialRow, Props>((props, ref) => {
  const dispatch = useAppDispatch()
  let [invalidSocial, setInvalidSocial] = useState(false)

  useImperativeHandle(ref, () => ({
    checkSocial() {
      if (props.entry[1].value === "") {
        setInvalidSocial(true)
        return false
      }
      return true
    },
  }))

  const handleDelete = () => {
    dispatch(deleteCurrentSocial(props.index))
  }

  const handleValueChange = (e) => {
    setInvalidSocial(false)
    const payload = {
      index: props.index,
      value: e.target.value,
    }
    dispatch(updateCurrentSocialValue(payload))
  }

  const handleNameChange = (e) => {
    const payload = {
      index: props.index,
      value: Object.keys(SOCIAL_MEDIA)[Object.values(SOCIAL_MEDIA).indexOf(e.target.value)] as SOCIAL_MEDIA,
    }
    dispatch(updateCurrentSocialName(payload))
  }

  return (
    <main>
      {/* Select */}
      <div className="flex mb-1">
        <div>
          <select id="country" className="form-select" value={props.entry[1].name || SOCIAL_MEDIA.Wechat} onChange={(e) => handleNameChange(e)}>
            {Object.values(SOCIAL_MEDIA).map((value, index) => (
              <option key={index}>{value}</option>
            ))}
          </select>
        </div>

        <div className="flex-1 inline-block w-full">
          <input
            id="mandatory"
            className={`form-input w-full type="text" ${invalidSocial ? "border-rose-500" : ""}`}
            value={props.entry[1].value || ""}
            onChange={(e) => handleValueChange(e)}
          />
        </div>

        <div>
          <button className="btn bg-white border-slate-200 hover:border-slate-300 pb-3" onClick={() => handleDelete()}>
            <svg className={`w-4 h-4 fill-current shrink-0 text-rose-500`} viewBox="0 0 16 16">
              <path d="M5 7h2v6H5V7zm4 0h2v6H9V7zm3-6v2h4v2h-1v10c0 .6-.4 1-1 1H2c-.6 0-1-.4-1-1V5H0V3h4V1c0-.6.4-1 1-1h6c.6 0 1 .4 1 1zM6 2v1h4V2H6zm7 3H3v9h10V5z" />
            </svg>
          </button>
        </div>
      </div>
      {invalidSocial ? <div className="ml-28 text-xs mt-1 text-rose-500">This field is required</div> : <div></div>}
    </main>
  )
})

export default AddSocialRow
