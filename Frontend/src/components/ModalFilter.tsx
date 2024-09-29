import React, { useEffect, useRef } from "react"
import Transition from "../utils/Transition"

function ModalFilter({ children, id, title, modalOpen, setModalOpen, size, onClear, onConfirm }) {
  const modalContent = useRef(null)

  // close on click outside
  // useEffect(() => {
  //   const clickHandler = ({ target }) => {
  //     if (!modalOpen || modalContent.current.contains(target)) return
  //     setModalOpen(false)
  //   }
  //   document.addEventListener("click", clickHandler)
  //   return () => document.removeEventListener("click", clickHandler)
  // })

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!modalOpen || keyCode !== 27) return
      setModalOpen(false)
    }
    document.addEventListener("keydown", keyHandler)
    return () => document.removeEventListener("keydown", keyHandler)
  })

  return (
    <>
      {/* Modal backdrop */}
      <Transition
        className="fixed inset-0 bg-slate-900 bg-opacity-30 z-30 transition-opacity"
        show={modalOpen}
        enter="transition ease-out duration-200"
        enterStart="opacity-0"
        enterEnd="opacity-100"
        leave="transition ease-out duration-100"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
        aria-hidden="true"
        appear={undefined}
      />
      {/* Modal dialog */}
      <Transition
        id={id}
        className="fixed inset-0 z-30 overflow-hidden flex items-center my-4 justify-center px-4 sm:px-6"
        role="dialog"
        aria-modal="true"
        show={modalOpen}
        enter="transition ease-in-out duration-200"
        enterStart="opacity-0 translate-y-4"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-in-out duration-200"
        leaveStart="opacity-100 translate-y-0"
        leaveEnd="opacity-0 translate-y-4"
        appear={undefined}
      >
        <div ref={modalContent} className={`bg-white rounded-xl shadow-lg w-full px-3 overflow-hidden max-h-full relative ${size}`}>
          {/* Modal header */}
          <div className="p-3 border-b border-slate-200 sticky top-0 bg-white">
            <div className="flex justify-between items-center h-14">
              <div className="font-bold text-slate-800 text-xl m-auto translate-x-4">{title}</div>
              <button
                className="text-slate-400 hover:text-slate-500"
                onClick={(e) => {
                  e.stopPropagation()
                  setModalOpen(false)
                }}
              >
                <div className="sr-only">Close</div>
                <svg className="w-8 h-8 fill-current" viewBox="-1 -1 18 18">
                  <path d="M7.95 6.536l4.242-4.243a1 1 0 111.415 1.414L9.364 7.95l4.243 4.242a1 1 0 11-1.415 1.415L7.95 9.364l-4.243 4.243a1 1 0 01-1.414-1.415L6.536 7.95 2.293 3.707a1 1 0 011.414-1.414L7.95 6.536z" />
                </svg>
              </button>
            </div>
          </div>
          <div className="overflow-y-auto px-3" style={{ height: "calc(100vh - 200px)" }}>
            {children}
          </div>
          <div className="flex justify-between my-4 w-5/6 mx-auto">
            <button type="button" className="btn-lg border-slate-200 hover:border-slate-300 text-slate-600 text-lg" onClick={onClear}>
              Clear
            </button>
            <button type="submit" className="btn-lg bg-indigo-500 hover:bg-indigo-600 text-white text-lg" onClick={onConfirm}>
              Confirm
            </button>
          </div>
        </div>
      </Transition>
    </>
  )
}

export default ModalFilter
