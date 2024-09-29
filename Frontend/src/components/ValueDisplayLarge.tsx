import React from "react"

interface IProps {
  label: string
  value: string
  styleClasses?: string
}

const ValueDisplayLarge = (props: IProps) => {
  const { label, value, styleClasses = "" } = props
  return (
    <div className={`flex flex-col items-center ${styleClasses}`}>
      <span className="text-xs whitespace-nowrap text-slate-400">{label}</span>
      <span className="text-2xl font-bold">{value}</span>
    </div>
  )
}

export default ValueDisplayLarge
