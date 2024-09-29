import React, { useEffect, useState } from "react"
import { useAppSelector, useAppDispatch } from "../../app/hooks"
import ReminderCreationModal from "../reminders/ReminderCreationModal"
import { setCurrentReminder } from "../../slices/clientSlice"
import { Reminder } from "../../../../Shared/Interface/reminder"

function AddReminder() {
  const dispatch = useAppDispatch()
  const client = useAppSelector((state) => state.client.currentClient)
  const { reminder } = client
  //const [currentReminder, setCurrentReminder] = useState(undefined)
  const [creationModalOpen, setCreationModalOpen] = useState(false)

  useEffect(() => {
    if (reminder) {
      setCurrentReminder(reminder)
    }
  }, [reminder])

  const showReminderCreationModal = (e) => {
    e.stopPropagation()
    setCreationModalOpen(true)
  }

  const handleDelete = () => {
    const emptyReminder = {
      name: undefined,
      createdBy: undefined,
      lastModifiedDate: undefined,
      description: undefined,
    }
    dispatch(setCurrentReminder(emptyReminder as Reminder))
  }

  const isReminderOn = () => {
    return reminder && reminder.lastModifiedDate
  }

  return (
    <div className="pt-5 sm:pr-20">
      <div className="flex justify-between">
        <label className="text-sm font-medium mb-1 mt-2" htmlFor="relation">
          Reminder
        </label>

        <button
          className={`btn bg-white shrink-0 rounded border border-slate-200 hover:border-slate-300 shadow-sm pl-3 pb-3 ${isReminderOn() ? "hidden" : ""}`}
          onClick={(e) => showReminderCreationModal(e)}
        >
          <svg className="w-4 h-4 fill-current text-indigo-500" viewBox="0 0 16 16">
            <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1Z" />
          </svg>
        </button>
      </div>

      <div className={`w-full max-w-9xl mx-auto ${isReminderOn() ? "" : "hidden"}`}>
        <div className="bg-white shadow-lg rounded-sm border border-slate-200 p-4">
          <div className="sm:flex sm:justify-between sm:items-start">
            {/* Left side */}
            <div className="grow mt-0.5 mb-3 sm:mb-0 space-y-3">
              <div className="flex items-center">
                {/* Reminder Title */}
                <label className="flex items-center">
                  <span className="font-medium text-slate-800 ml-2">{isReminderOn() ? (reminder ? reminder.name : "") : ""}</span>
                </label>
              </div>
            </div>
            {/* Right side */}
            <div className="flex items-center justify-end space-x-4">
              {/* Date */}
              <div className="flex items-center text-amber-500 px-2">
                <svg className="w-4 h-4 shrink-0 fill-current mr-1.5" viewBox="0 0 16 16">
                  <path d="M15 2h-2V0h-2v2H9V0H7v2H5V0H3v2H1a1 1 0 00-1 1v12a1 1 0 001 1h14a1 1 0 001-1V3a1 1 0 00-1-1zm-1 12H2V6h12v8z" />
                </svg>
                <div className="text-sm text-amber-600">{isReminderOn() ? (reminder ? new Date(reminder.lastModifiedDate).toDateString() : "") : ""}</div>
              </div>

              {/* Edit button */}
              <button className="text-slate-400 hover:text-indigo-500 px-2" onClick={(e) => showReminderCreationModal(e)}>
                <svg className="w-4 h-4 fill-current text-slate-500 shrink-0" viewBox="0 0 16 16">
                  <path d="M11.7.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM4.6 14H2v-2.6l6-6L10.6 8l-6 6zM12 6.6L9.4 4 11 2.4 13.6 5 12 6.6z" />
                </svg>
              </button>
              {/* Delete button */}
              <button className="text-slate-400 hover:text-indigo-500 px-2" onClick={() => handleDelete()}>
                <svg className="w-4 h-4 fill-current text-rose-500 shrink-0" viewBox="0 0 16 16">
                  <path d="M5 7h2v6H5V7zm4 0h2v6H9V7zm3-6v2h4v2h-1v10c0 .6-.4 1-1 1H2c-.6 0-1-.4-1-1V5H0V3h4V1c0-.6.4-1 1-1h6c.6 0 1 .4 1 1zM6 2v1h4V2H6zm7 3H3v9h10V5z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      <ReminderCreationModal creationModalOpen={creationModalOpen} setCreationModalOpen={setCreationModalOpen} reminder={reminder} />
    </div>
  )
}

export default AddReminder
