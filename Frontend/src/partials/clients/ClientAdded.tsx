import React from "react"
import { Link } from "react-router-dom"

function ClientAdded() {
  return (
    <main>
      <div className="px-4 py-20">
        <div className="max-w-md mx-auto">
          <div className="text-center">
            <svg className="inline-flex w-16 h-16 fill-current mb-6" viewBox="0 0 64 64">
              <circle className="text-emerald-100" cx="32" cy="32" r="32" />
              <path className="text-emerald-500" d="m28.5 41-8-8 3-3 5 5 12-12 3 3z" />
            </svg>
            <h1 className="text-3xl text-slate-800 font-bold mb-8">New Client Added</h1>
            <Link className="btn bg-indigo-500 hover:bg-indigo-600 text-white" to="/clients">
              Go To Clients Table -&gt;
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}

export default ClientAdded
