import React from "react"
import AddRelationRow from "./AddRelationRow"

function AddRelationForm(props) {
  return (
    <main>
      <div className="space-y-8 p-2">
        <h2 className="text-2xl text-slate-800 font-bold mb-6">Add Connections</h2>

        <div className="p-2">
          <AddRelationRow />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex items-center justify-between mt-10">
        <button className="text-sm underline hover:no-underline" onClick={() => props.decrementStep()}>
          &lt;- Back
        </button>

        <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-auto" onClick={() => props.handleAddClient()}>
          Add Client
        </button>
      </div>
    </main>
  )
}

export default AddRelationForm
