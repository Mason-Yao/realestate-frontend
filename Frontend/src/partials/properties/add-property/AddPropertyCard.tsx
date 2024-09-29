import React, { useState, useEffect } from "react"

//old design, can be deleted
function AddPropertyCard() {
  return (
    <main>
      <div className="relative bg-white shadow-md rounded border border-slate-200 p-5">
        {/* Add button */}
        <button className="absolute top-0 right-10 mt-2 mr-3">
          <div className="inline-block btn bg-white border-slate-200 hover:border-slate-300">
            <svg className="w-4 h-4 fill-current text-indigo-500" viewBox="0 0 16 16">
              <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1Z" />
            </svg>
          </div>
        </button>

        {/* Delete button */}
        <button className="absolute top-0 right-0 mt-2 mr-2">
          <div className="inline-block btn bg-white border-slate-200 hover:border-slate-300">
            <svg className="w-4 h-4 fill-current text-rose-500 shrink-0" viewBox="0 0 16 16">
              <path d="M5 7h2v6H5V7zm4 0h2v6H9V7zm3-6v2h4v2h-1v10c0 .6-.4 1-1 1H2c-.6 0-1-.4-1-1V5H0V3h4V1c0-.6.4-1 1-1h6c.6 0 1 .4 1 1zM6 2v1h4V2H6zm7 3H3v9h10V5z" />
            </svg>
          </div>
        </button>

        {/* Save button */}
        <div className="absolute bottom-0 right-0 mb-4 mr-4">
          <div className="m-1.5">
            {/* Start */}
            <button className="btn bg-emerald-500 hover:bg-emerald-600 text-white">Save</button>
            {/* End */}
          </div>
        </div>

        {/* Input Types */}
        <div>
          <div className="grid gap-5 md:grid-cols-3 md:pl-5 md:pr-5">
            {/* Type */}
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="country">
                Type
              </label>
              <select id="country" className="form-select w-full md:w-3/4">
                <option>House</option>
                <option>TownHouse</option>
                <option>Unit</option>
                <option>Apartment</option>
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="country">
                Status
              </label>
              <select id="country" className="form-select w-full md:w-3/4">
                <option>Owner occupied</option>
                <option>Investment property</option>
                <option>I am tenant</option>
                <option>Owned but sold now</option>
              </select>
            </div>

            {/* Placeholder */}
            <div></div>

            {/* Street */}
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="mandatory">
                Street <span className="text-rose-500">*</span>
              </label>
              <input id="mandatory" className="form-input w-full md:w-3/4" type="text" required />
            </div>

            {/* Suburb */}
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="mandatory">
                Suburb <span className="text-rose-500">*</span>
              </label>
              <input id="mandatory" className="form-input w-full md:w-3/4" type="text" required />
            </div>

            {/* State */}
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="country">
                State
              </label>
              <select id="country" className="form-select w-full md:w-3/4">
                <option>NSW</option>
                <option>VIC</option>
                <option>QLD</option>
                <option>WA</option>
                <option>SA</option>
                <option>TAS</option>
                <option>ACT</option>
                <option>NT</option>
              </select>
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="placeholder">
                Purchase Date
              </label>
              <input id="placeholder" className="form-input w-full md:w-3/4" type="text" placeholder="DD/MM/YYYY..." />
            </div>
            {/* End */}

            {/* Seller */}
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="placeholder">
                Seller
              </label>
              <input id="placeholder" className="form-input w-full md:w-3/4" type="text" placeholder="Name of the seller..." />
            </div>
            {/* End */}

            {/* Solicitor */}
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="placeholder">
                Solicitor
              </label>
              <input id="placeholder" className="form-input w-full md:w-3/4 " type="text" placeholder="Name of the solicitor..." />
            </div>
            {/* End */}

            {/* Special conditions */}
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="country">
                Special conditions
              </label>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default AddPropertyCard
