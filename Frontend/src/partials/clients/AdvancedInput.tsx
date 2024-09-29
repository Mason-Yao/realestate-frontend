import React, { useRef, useEffect, useState, RefObject } from "react"
import AddSocialRow, { SocialRow } from "./AddSocialRow"
import { useAppSelector, useAppDispatch } from "../../app/hooks"
import { setCurrentCategory, setCurrentVisa, setCurrentDOB, setCurrentKnownBy, setCurrentNotes, addCurrentSocial } from "../../slices/clientSlice"
import { KNOWN_BY, VISA_STATUS } from "../../../../Shared/Interface/client"
import AddReminder from "./AddReminder"

function AdvancedInput(props) {
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.user.profile)
  const client = useAppSelector((state) => state.client.currentClient)
  const settingState = useAppSelector((state) => state.setting)
  const categoryAttributes = Object.keys(settingState).filter((key) => key.startsWith("category_"))
  const categorySettings = categoryAttributes.map((key) => settingState[key])
  const socialRowRef = useRef<SocialRow[] | any[]>([])

  useEffect(() => {
    if (client.social) {
      socialRowRef.current = socialRowRef.current.slice(0, client.social.length)

      props.setInvalidSocial(false)
      socialRowRef.current.map((row) => {
        if (!row.checkSocial()) {
          props.setInvalidSocial(true)
        }
      })
    }
  }, [client.social])

  const getCategoryName = (category) => {
    return category.value.split(";")[0]
  }

  const handleAdd = () => {
    dispatch(addCurrentSocial())
  }

  const insertToNote = (type) => {
    const note = client.notes
    switch (type) {
      case "date":
        dispatch(setCurrentNotes(note + new Date().toLocaleString()))
        break
      case "time":
        dispatch(setCurrentNotes(note + new Date().toLocaleTimeString()))
        break
      case "email":
        dispatch(setCurrentNotes(note + user.email))
        break
      case "phone":
        dispatch(setCurrentNotes(note + user.phone))
        break
    }
  }

  return (
    <main>
      {/* Components */}
      <div className="space-y-8 p-2">
        {/* Input Types */}
        <div>
          <h2 className="text-2xl text-slate-800 font-bold mb-6">Advanced Information</h2>
          <div className="grid gap-5 md:grid-cols-2">
            {/* Category */}
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="category">
                Category
              </label>
              <select
                id="vip"
                className="form-select w-full md:w-3/4"
                value={client.category}
                onChange={(e) => {
                  dispatch(setCurrentCategory(e.target.value))
                }}
              >
                <option value="">None</option>
                {categorySettings.map((category, index) => (
                  <option key={index} value={category.name}>
                    {getCategoryName(category)}
                  </option>
                ))}
              </select>
            </div>

            {/* Visa */}
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="pr">
                Visa status
              </label>
              <select
                id="visa"
                className="form-select w-full md:w-3/4"
                value={VISA_STATUS[client.visa]}
                onChange={(e) =>
                  dispatch(setCurrentVisa(Object.keys(VISA_STATUS)[Object.values(VISA_STATUS).indexOf(e.target.value as VISA_STATUS)] as VISA_STATUS))
                }
              >
                {Object.values(VISA_STATUS).map((value, index) => (
                  <option key={index}>{value}</option>
                ))}
              </select>
            </div>

            {/* DOB */}
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="placeholder">
                Date of Birth
              </label>
              <input
                id="dob"
                className={`form-input w-full md:w-3/4 ${props.invalidDOB ? "border-rose-500" : ""}`}
                type="text"
                placeholder="DD/MM/YYYY"
                value={client.dob || ""}
                onChange={(e) => {
                  props.setInvalidDOB(false)
                  dispatch(setCurrentDOB(e.target.value))
                }}
              />
              {props.invalidDOB ? <div className="text-xs mt-1 text-rose-500">Please input valid date: DD/MM/YYYY</div> : <div></div>}
            </div>

            {/* Known by */}
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="category">
                I know this person by
              </label>
              <select
                id="knownBy"
                className="form-select w-full md:w-3/4"
                value={KNOWN_BY[client.knownBy]}
                onChange={(e) => dispatch(setCurrentKnownBy(Object.keys(KNOWN_BY)[Object.values(KNOWN_BY).indexOf(e.target.value as KNOWN_BY)] as KNOWN_BY))}
              >
                {Object.values(KNOWN_BY).map((value, index) => (
                  <option key={index}>{value}</option>
                ))}
              </select>
            </div>
            {/* End */}
          </div>

          <div className="pt-5 sm:pr-20">
            <div className="flex justify-between">
              <label className="text-sm font-medium mb-1 mt-2" htmlFor="relation">
                Social media
              </label>

              <button className="btn bg-white shrink-0 rounded border border-slate-200 hover:border-slate-300 shadow-sm pl-3 pb-3" onClick={() => handleAdd()}>
                <svg className="w-4 h-4 fill-current text-indigo-500" viewBox="0 0 16 16">
                  <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1Z" />
                </svg>
              </button>
            </div>

            {client.social ? (
              Object.entries(client.social).map((entry, i) => {
                return <AddSocialRow key={i} index={i} entry={entry} ref={(el) => (socialRowRef.current[i] = el)} />
              })
            ) : (
              <div></div>
            )}
          </div>

          {/* Notes */}
          <div className="pt-5 sm:pr-20">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="placeholder">
                Notes
              </label>
              <textarea
                id="notes"
                className="form-textarea w-full px-2 py-1"
                rows={4}
                value={client.notes || ""}
                onChange={(e) => {
                  dispatch(setCurrentNotes(e.target.value))
                }}
              ></textarea>
              <div className="flex">
                <div className="text-xs my-auto mr-2">Click label to insert: </div>
                <button
                  className="text-xs inline-flex font-medium bg-indigo-100 dark:bg-indigo-500/30 text-indigo-600 mr-2 rounded-full text-center px-2.5 py-1"
                  onClick={() => insertToNote("date")}
                >
                  Today's Date
                </button>
                <button
                  className="text-xs inline-flex font-medium bg-indigo-100 dark:bg-indigo-500/30 text-indigo-600 mr-2 rounded-full text-center px-2.5 py-1"
                  onClick={() => insertToNote("time")}
                >
                  Current time
                </button>
                <button
                  className="text-xs inline-flex font-medium bg-indigo-100 dark:bg-indigo-500/30 text-indigo-600 mr-2 rounded-full text-center px-2.5 py-1"
                  onClick={() => insertToNote("email")}
                >
                  My email
                </button>
                <button
                  className="text-xs inline-flex font-medium bg-indigo-100 dark:bg-indigo-500/30 text-indigo-600 mr-2 rounded-full text-center px-2.5 py-1"
                  onClick={() => insertToNote("phone")}
                >
                  My phone
                </button>
              </div>
            </div>
          </div>

          <AddReminder />
        </div>
      </div>
    </main>
  )
}

export default AdvancedInput
