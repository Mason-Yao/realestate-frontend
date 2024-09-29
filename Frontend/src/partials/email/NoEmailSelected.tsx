import React from "react"

import ModalBlank from "../../components/ModalBlank"

function NoEmailSelected(props) {
  return (
    <div className="space-y-8 mt-8">
      <ModalBlank id="danger-modal" modalOpen={props.noEmailModalOpen} setModalOpen={props.setNoEmailModalOpen}>
        <div className="p-5 flex space-x-4">
          {/* Icon */}
          <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-rose-100">
            <svg className="w-4 h-4 shrink-0 fill-current text-rose-500" viewBox="0 0 16 16">
              <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 12c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm1-3H7V4h2v5z" />
            </svg>
          </div>
          {/* Content */}
          <div>
            {/* Modal header */}
            <div className="mb-2">
              <div className="text-lg font-semibold text-slate-800">Selected clients have no emails</div>
            </div>
            {/* Modal content */}
            <div className="text-sm mb-10">
              <div className="space-y-2">
                <p>All clients selected have no emails stored. Please make sure you select at least one client with email.</p>
              </div>
            </div>
            {/* Modal footer */}
            <div className="flex flex-wrap justify-end space-x-2">
              <button
                className="btn-sm border-slate-200 hover:border-slate-300 text-slate-600"
                onClick={(e) => {
                  e.stopPropagation()
                  props.setNoEmailModalOpen(false)
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </ModalBlank>
    </div>
  )
}

export default NoEmailSelected
