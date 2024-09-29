import React, { useEffect, useState } from "react"
import { getReminders } from "../../apis/reminder"
import ReminderListItem from "./ReminderListItem"
import ComponentLoader from "../../utils/ComponentLoader"

function ReminderList() {
  const [reminderList, setReminderList] = useState<object>({})
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    getReminders().then((data) => {
      const reminders = data.reduce((acc, reminder) => {
        const date = reminder.lastModifiedDate ? new Date(reminder.lastModifiedDate).toDateString() : "No date found"
        if (!acc[date]) {
          acc[date] = []
        }
        acc[date].push(reminder)
        return acc
      }, {})
      setReminderList(reminders)
      setIsLoading(false)
    })
  }, [])

  return (
    <div className="h-full overflow-hidden flex flex-col bg-white shadow-lg rounded-sm border border-slate-200">
      <header className="px-5 py-4 border-b border-slate-100">
        <h2 className="font-semibold text-slate-800">Reminder List</h2>
      </header>
      <div className="p-3 flex-1 overflow-y-scroll flex-col flex">
        {isLoading && <ComponentLoader />}
        {Object.entries(reminderList).map(([date, reminders]) => {
          return (
            <div key={date}>
              <header className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm font-semibold p-2">{date}</header>
              <ul className="my-1">
                {reminders.map((reminder, index) => {
                  return <ReminderListItem reminder={reminder} key={index} />
                })}
              </ul>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ReminderList
