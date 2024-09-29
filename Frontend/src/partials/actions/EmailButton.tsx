import React, { useEffect, useState } from "react"
import SendEmail from "../email/SendEmail"
import NoEmailSelected from "../email/NoEmailSelected"

function EmailButton({ selectedItems }) {
  const [sendEmailModalOpen, setSendEmailModalOpen] = useState(false)
  const [noEmailModalOpen, setNoEmailModalOpen] = useState(false)

  const checkReceivers = () => {
    const receivers = selectedItems.map((item) => item.email).filter((item) => item !== null)
    receivers.length > 0 ? setSendEmailModalOpen(true) : setNoEmailModalOpen(true)
  }

  return (
    <div className={`${selectedItems.length < 1 && "hidden"}`}>
      <div className="flex items-center">
        <button
          className="btn bg-white border-slate-200 hover:border-slate-300 text-sky-600 hover:text-sky-800"
          onClick={(e) => {
            e.stopPropagation()
            checkReceivers()
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-mail"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z" />
            <path d="M3 7l9 6l9 -6" />
          </svg>
        </button>
        <SendEmail sendEmailModalOpen={sendEmailModalOpen} setSendEmailModalOpen={setSendEmailModalOpen} selectedItems={selectedItems} />
        <NoEmailSelected noEmailModalOpen={noEmailModalOpen} setNoEmailModalOpen={setNoEmailModalOpen} />
      </div>
    </div>
  )
}

export default EmailButton
