import React from "react"
import { POI } from "../../../../../Shared/Interface/property"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"

interface IProps {
  place: POI
  index: number
  selectedPOIs: POI[]
  setSelectedPOIs: React.Dispatch<React.SetStateAction<POI[]>>
  editable?: boolean
}

const NearbyPlaceRow = ({ place, index, selectedPOIs, setSelectedPOIs, editable = true }: IProps) => {
  const { name, distance, duration, address, rating, id } = place
  const dispatch = useAppDispatch()

  const isSelected = selectedPOIs ? selectedPOIs.some((p) => p.id === id) : false

  const handleChange = () => {
    if (isSelected) {
      setSelectedPOIs(selectedPOIs.filter((place) => place.id !== id))
    } else {
      setSelectedPOIs([...selectedPOIs, place])
    }
  }

  return (
    <tr className={`border-t border-1 border-gray-300 ${index % 2 === 0 ? "bg-white" : "bg-pink-50"}`}>
      <td className="p-2">{name}</td>
      <td className="p-2">{address}</td>
      <td className="p-2">{rating ? rating : "N/A"}</td>
      <td className="p-2">{distance ? distance : "N/A"}</td>
      <td className="p-2 whitespace-nowrap">{duration ? duration : "N/A"}</td>
      {editable && (
        <td className="p-2">
          <input type="checkbox" className="form-checkbox" onChange={() => handleChange()} checked={isSelected} />
        </td>
      )}
    </tr>
  )
}

export default NearbyPlaceRow
