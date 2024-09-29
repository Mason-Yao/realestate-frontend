import React from "react"

function ReminderListItem(reminder, key) {
  // console.log(reminder)
  return (
    <li className="flex px-2" key={key}>
      <div className="w-9 h-9 rounded-full shrink-0 bg-indigo-500 my-2 mr-3">
        <svg className="w-9 h-9 fill-current text-indigo-50" viewBox="0 0 36 36">
          <path d="M18 10c-4.4 0-8 3.1-8 7s3.6 7 8 7h.6l5.4 2v-4.4c1.2-1.2 2-2.8 2-4.6 0-3.9-3.6-7-8-7zm4 10.8v2.3L18.9 22H18c-3.3 0-6-2.2-6-5s2.7-5 6-5 6 2.2 6 5c0 2.2-2 3.8-2 3.8z" />
        </svg>
      </div>
      <div className="grow flex items-center border-b border-slate-100 text-sm py-2">
        <div className="grow flex justify-between">
          <div className="self-center">
            Reminder{" "}
            <a className="font-medium text-slate-800 hover:text-slate-900" href="#0">
              {reminder.reminder.name}
            </a>{" "}
            Noted{" "}
            <a className="font-medium text-slate-800" href="#0">
              {reminder.reminder.description}
            </a>{" "}
          </div>
          <div className="shrink-0 self-end ml-2">
            <a className="font-medium text-indigo-500 hover:text-indigo-600" href="#0">
              View<span className="hidden sm:inline"> -&gt;</span>
            </a>
          </div>
        </div>
      </div>
    </li>
  )
}

export default ReminderListItem
