import React from "react"
//import { TailSpin } from "react-loader-spinner"

interface IProps {
  label: string
  value: string
  styleClasses?: string
}

const ValueDisplay = (props: IProps) => {
  const { label, value, styleClasses = "col-span-6 xs:col-span-4 sm:col-span-3 md:col-span-2" } = props
  return (
    <div className={`${styleClasses}`}>
      <p className="p-1 text-xs leading-none whitespace-nowrap text-slate-400">{label}</p>
      <div className="w-full p-1 mt-2 text-base leading-none">{value}</div>
    </div>
  )
}

export default ValueDisplay
