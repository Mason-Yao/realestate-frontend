import React from "react"
import Icon from "../../images/icon-01.svg"
import ComponentLoader from "../../utils/ComponentLoader"

function NumberCard({ title, subTitle, number }) {
  return (
    <div className="grow flex flex-col col-span-full sm:col-span-6 xl:col-span-4">
      <div className="pb-3">
        <header className="flex justify-center gap-2 items-start mb-2 px-5 py-2 bg-white shadow-lg rounded-sm border border-slate-200">
          {/* Icon */}
          <img src={Icon} width="32" height="32" alt="Icon 01" />
          <h2 className="text-lg font-semibold text-slate-800 mb-2">{title}</h2>
        </header>
        <div className="flex justify-center bg-white shadow-lg rounded-sm border border-slate-200">
          <div className="py-5">
            <div className="flex text-xs font-semibold text-slate-400 uppercase justify-center">{subTitle}</div>
            <div className="text-5xl font-bold text-slate-800 flex items-center justify-center">{number || <ComponentLoader />}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NumberCard
