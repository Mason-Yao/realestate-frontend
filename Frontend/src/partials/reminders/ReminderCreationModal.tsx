import React, { useState, useEffect } from "react"
import { useAppDispatch } from "../../app/hooks"
import ModalBlank from "../../components/ModalBlank"
import DatePicker from "../../components/Datepicker"
import { useAuth0 } from "@auth0/auth0-react"
import { setCurrentReminder } from "../../slices/clientSlice"
import { Reminder } from "../../../../Shared/Interface/reminder"

function ReminderCreationModal(props) {
  const dispatch = useAppDispatch()
  const { user } = useAuth0()
  const [reference, setReference] = useState(undefined)
  const [title, setTitle] = useState("")
  const [date, setDate] = useState(new Date())
  const [description, setDescription] = useState("")

  useEffect(() => {
    setTitle(props.reminder ? props.reminder.name : "")
    setDate(props.reminder && props.reminder.lastModifiedDate ? new Date(props.reminder.lastModifiedDate) : new Date())
    setDescription(props.reminder ? props.reminder.description : "")

    if (props.reference && props.reference.id !== "") {
      setReference(props.reference)
    }
  }, [props.reminder])

  const handleSave = () => {
    const reminder = {
      name: title,
      createdBy: user?.nickname,
      lastModifiedDate: date.toISOString(),
      description: description,
    }
    dispatch(setCurrentReminder(reminder as Reminder))
    props.setCreationModalOpen(false)
  }

  return (
    <div className="space-y-8 mt-8">
      <ModalBlank id="reminder-modal" modalOpen={props.creationModalOpen} setModalOpen={props.setCreationModalOpen}>
        {/* Modal content */}
        <div className="px-5 py-5">
          <div className="text-sm">
            <div className="font-medium text-slate-800 mb-3">Create a reminder 🙌</div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1 py-1" htmlFor="name">
                Title
              </label>
              <input
                id="name"
                className="form-input w-full px-2 py-1 text-sm"
                type="text"
                placeholder="Name your reminder"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 py-1" htmlFor="email">
                Date
              </label>
              <DatePicker date={date} setDate={setDate} align={undefined} />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium mb-1 py-1" htmlFor="feedback">
                Description
              </label>
              <textarea
                id="feedback"
                value={description}
                className="form-textarea w-full px-2 py-1"
                rows={10}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
          </div>
        </div>
        {/* Modal footer */}
        <div className="px-5 py-4 border-t border-slate-200">
          <div className="flex flex-wrap justify-end space-x-2">
            <button
              className="btn-sm border-slate-200 hover:border-slate-300 text-slate-600"
              onClick={(e) => {
                e.stopPropagation()
                props.setCreationModalOpen(false)
              }}
            >
              Cancel
            </button>
            <button className="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white" onClick={() => handleSave()}>
              Save
            </button>
          </div>
        </div>
      </ModalBlank>
    </div>
  )
}

export default ReminderCreationModal
