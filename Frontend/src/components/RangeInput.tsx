import React, { useState } from "react"

interface IProps {
  label: string
  inputValue: number
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  min?: number
  max?: number
  step?: number
  wrapperStyles?: string
}

const RangeInput = ({ label, inputValue, onChange, min = 0, max = 100, step = 1, wrapperStyles = "col-span-12 md:col-span-3" }) => {
  const [value, setValue] = useState(inputValue)

  return (
    <div className={`${wrapperStyles}`}>
      <label htmlFor="default-range" className="block text-sm font-medium text-indigo">
        {label}
      </label>
      <div className="flex items-start gap-1 pr-2 sm:flex-row sm:items-center m-4">
        <input
          className="w-1/2 sm:w-full"
          id={label}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => {
            setValue(e.target.value)
            onChange(e)
          }}
        />
        <div className="flex items-center">
          <input
            type="text"
            value={value}
            onChange={(e) => {
              setValue(e.target.value)
              onChange(e)
            }}
            className="form-input text-center w-16"
          />
          <span>%</span>
        </div>
      </div>
    </div>
  )
}

export default RangeInput
