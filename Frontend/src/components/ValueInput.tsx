import React from "react"

interface IProps {
  label: string
  value: string
  divTailwind?: string
  inputTailwind?: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const ValueInput = (props: IProps) => {
  const { label, value, divTailwind = "col-span-6 xs:col-span-4 sm:col-span-3 md:col-span-2", inputTailwind = "form-input w-full", onChange } = props

  return (
    <div className={divTailwind}>
      <label className="block text-sm font-medium text-indigo-500 mb-1" htmlFor="mandatory">
        {label}
      </label>
      <input id={`${label}-input`} className={inputTailwind} type="text" value={value} onChange={onChange} />
    </div>
  )
}

export default ValueInput
