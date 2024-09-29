import React, { useEffect, useState } from "react"
import { PROPERTY_STATE } from "../interfaces/interfaces"
import { useAppDispatch } from "../app/hooks"
import { toggleImageTag } from "../slices/reducers/filesSlice"
//import { toggleFilterPropertyState } from "../../../slices/reducers/propertiesSlice"

interface IProps {
  options: string[]
  selectedOptions: string[]
  setSelected: (option: string) => void
}

const MultiSelectTag = ({ options, selectedOptions, setSelected }) => {
  const onTagClick = (option: string) => {
    setSelected(option)
  }

  return (
    <div className="select-v1-container">
      {options.map((option) => (
        <div key={option} className={selectedOptions.includes(option) ? "select-v1-tag active" : "select-v1-tag"} onClick={() => onTagClick(option)}>
          {option}
        </div>
      ))}
    </div>
  )
}

export default MultiSelectTag
