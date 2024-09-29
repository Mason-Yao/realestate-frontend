import React, { useState } from "react"
import CategoryTableItem from "./CategoryTableItem"

function CategoryTable({ categorySettings }) {
  return (
    <div className="col-span-full xl:col-span-6 bg-white shadow-lg rounded-sm border border-slate-200 mt-2">
      <header className="px-5 py-4 border-b border-slate-100 bg-slate-100">
        <h2 className="font-semibold text-slate-800">Category</h2>
      </header>
      <div className="px-3">
        {/* Card content */}
        {/* "Today" group */}
        <div>
          <ul>
            {categorySettings.length > 0 &&
              categorySettings.map((category, index) => {
                return <CategoryTableItem key={index} id={category.id} index={index} category={category} />
              })}
            {/* Item */}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default CategoryTable
