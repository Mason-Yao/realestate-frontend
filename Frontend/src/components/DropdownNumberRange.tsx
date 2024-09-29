import { NumberFilter } from "../../../Shared/Interface/filter"
import { numberToPrice, priceToNumber } from "../utils/helper"
import { DropDownType, IDropDownConfig } from "../partials/properties/properties/PropertyFilter"
import { useState } from "react"

export interface IProps {
  config: IDropDownConfig
}

const DropdownNumberRange = ({ config: { sectionType, limit, numberRange, setNumberRange, initialOptions } }: IProps) => {
  const [minOptions, setMinOptions] = useState(initialOptions)
  const [maxOptions, setMaxOptions] = useState(initialOptions)
  const handleChangeMin = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const minValue = sectionType === DropDownType.PRICE ? priceToNumber(e.target.value) : parseFloat(e.target.value)
    setMaxOptions(
      initialOptions.filter((option) => {
        return option >= minValue
      })
    )
    setNumberRange({ ...numberRange, minimum: minValue })
  }
  const handleChangeMax = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const maxValue = sectionType === DropDownType.PRICE ? priceToNumber(e.target.value) : parseFloat(e.target.value)
    setMinOptions(
      initialOptions.filter((option) => {
        return option <= maxValue
      })
    )
    setNumberRange({ ...numberRange, maximum: maxValue })
  }
  return (
    <div className="flex flex-col gap-1">
      <hr className="mb-3" />
      <p className="text-lg text-slate-800 font-semibold">{sectionType && sectionType.includes("Area") ? sectionType + " (m\u00B2)" : sectionType}</p>
      <div className="flex gap-2 mb-3">
        <div className="flex-grow mr-1">
          <p className="font-semibold">Min</p>
          <select className="form-select w-full border h-12" onChange={handleChangeMin} value={numberRange.minimum}>
            <option value={limit.minimum}>Any</option>
            {minOptions.map((item, index) => (
              <option key={"min" + sectionType + index} value={item}>
                {sectionType === DropDownType.PRICE ? numberToPrice(item) : item}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-grow ml-1">
          <p className="font-semibold">Max</p>
          <select className="form-select w-full h-12" onChange={handleChangeMax} value={numberRange.maximum}>
            <option value={limit.maximum}>Any</option>
            {maxOptions.map((item, index) => (
              <option key={"max" + sectionType + index} value={item}>
                {sectionType === DropDownType.PRICE ? numberToPrice(item) : item}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}

export default DropdownNumberRange
