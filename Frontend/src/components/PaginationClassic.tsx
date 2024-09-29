import React from "react"

function PaginationClassic(props) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <nav className="mb-4 sm:mb-0 sm:order-1" role="navigation" aria-label="Navigation">
        <ul className="flex justify-center">
          <li className="ml-3 first:ml-0">
            <button
              className={`btn bg-white border-slate-200 hover:border-slate-300 ${props.isFirstPage ? "text-slate-300 cursor-not-allowed" : "text-indigo-500"}`}
              disabled={props.isFirstPage}
              onClick={() => props.handlePrevious()}
            >
              &lt;- Previous
            </button>
          </li>
          <li className="ml-3 first:ml-0">
            <button
              className={`btn bg-white border-slate-200 hover:border-slate-300 ${props.isLastPage ? "text-slate-300 cursor-not-allowed" : "text-indigo-500"}`}
              disabled={props.isLastPage}
              onClick={() => props.handleNext()}
            >
              Next -&gt;
            </button>
          </li>
        </ul>
      </nav>
      <div className="text-sm text-slate-500 text-center sm:text-left">
        Showing <span className="font-medium text-slate-600">{props.from}</span> to <span className="font-medium text-slate-600">{props.to}</span>
      </div>
    </div>
  )
}

export default PaginationClassic
