import React from "react"

interface OptionType {
  label: string
  value: string
}

interface IProps {
  options: OptionType[]
  selectedValue: string
  name?: string
  className?: string
  onChange: (selectedOption: OptionType) => void
}

const RatioSelector = (props: IProps) => {
  const { options, selectedValue, name = "loan-type-radio", className = "form-radio", onChange } = props

  return (
    <div className="m-1">
      <label className="flex items-center">
        {options.map((option) => (
          <div key={option.value}>
            <input type="radio" name={name} className={className} checked={selectedValue === option.value} onChange={() => onChange(option)} />
            <span className="text-sm ml-2">{option.label}</span>)
          </div>
        ))}
      </label>
    </div>
  )
}

export default RatioSelector
