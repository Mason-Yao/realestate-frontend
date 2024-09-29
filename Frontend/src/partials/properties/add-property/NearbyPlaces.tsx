import React, { useEffect, useState } from "react"
import { fetchNearby } from "../../../apis/googleMapAPI"
import { POI } from "../../../../../Shared/Interface/property"
import NearbyPlaceRow from "./NearbyPlaceRow"
import { IoSchool, IoTrainSharp, IoCart, IoBusSharp } from "react-icons/io5"
import { GiPoliceOfficerHead } from "react-icons/gi"
import { FaUserDoctor } from "react-icons/fa6"
import { FaUniversity } from "react-icons/fa"
import { radiusOptions } from "../../../utils/constants"
import Tooltip from "../../../components/Tooltip"

interface IProps {
  coordinates: {
    lat: number
    lng: number
  }
  selectedPOIs: POI[]
  setSelectedPOIs: React.Dispatch<React.SetStateAction<POI[]>>
}

const tableHeadings = ["Name", "Address", "Rating", "Distance", "Drive", "Check"]

const NearbyPlaces = ({ coordinates, selectedPOIs, setSelectedPOIs }: IProps) => {
  const [selectedPlaceType, setSelectedPlaceType] = useState<string>("school")
  const [selectedRadius, setSelectedRadius] = useState<number>(5000) // [500, 2000, 5000]
  const [nearbyPlaces, setNearbyPlaces] = useState<POI[] | []>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState("distance")

  const placeOptions = [
    {
      icon: <IoSchool className={`text-3xl ${selectedPlaceType === "school" ? "text-indigo-500" : ""}`} />,
      tooltip: "Schools",
      type: "school",
    },
    {
      icon: <IoBusSharp className={`text-3xl ${selectedPlaceType === "bus_station" ? "text-indigo-500" : ""}`} />,
      tooltip: "Bus",
      type: "bus_station",
    },
    {
      icon: <IoTrainSharp className={`text-3xl ${selectedPlaceType === "train_station" ? "text-indigo-500" : ""}`} />,
      tooltip: "Train",
      type: "train_station",
    },
    {
      icon: <IoCart className={`text-3xl ${selectedPlaceType === "store" ? "text-indigo-500" : ""}`} />,
      tooltip: "Stores",
      type: "store",
    },
    {
      icon: <FaUserDoctor className={`text-3xl ${selectedPlaceType === "hospital" ? "text-indigo-500" : ""}`} />,
      tooltip: "Hospital",
      type: "hospital",
    },
    {
      icon: <FaUniversity className={`text-3xl ${selectedPlaceType === "university" ? "text-indigo-500" : ""}`} />,
      tooltip: "University",
      type: "university",
    },
    {
      icon: <GiPoliceOfficerHead className={`text-3xl ${selectedPlaceType === "police" ? "text-indigo-500" : ""}`} />,
      tooltip: "Police",
      type: "police",
    },
  ]

  const ITEMS_PER_PAGE = 5
  const totalPages = Math.ceil(nearbyPlaces.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentPageItems = nearbyPlaces.slice(startIndex, endIndex)

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  const loadNearbyPlaces = async () => {
    const res = await fetchNearby(coordinates, selectedPlaceType, selectedRadius)
    if (!res) {
      setNearbyPlaces([])
      return
    }
    const sortedPlaces = sortNearbyPlaces(res)
    setNearbyPlaces(sortedPlaces)
  }

  const sortNearbyPlaces = (places: POI[]): POI[] => {
    const sortedPlaces = places.sort((a, b) => {
      const sortA = sortBy === "distance" ? parseFloat(a.distance as string) : b.rating || 0
      const sortB = sortBy === "distance" ? parseFloat(b.distance as string) : a.rating || 0
      if (sortA < sortB) {
        return -1
      } else if (sortA > sortB) {
        return 1
      } else {
        return 0
      }
    })
    return sortedPlaces
  }

  const handleRadiusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRadius(parseInt(e.target.value))
  }

  const handleSort = (heading: string) => {
    if (heading === "Rating" || heading === "Distance") {
      setSortBy(heading.toLowerCase())
    }
  }

  useEffect(() => {
    if (coordinates) {
      loadNearbyPlaces()
    }
    setCurrentPage(1)
  }, [coordinates, selectedPlaceType, selectedRadius])

  useEffect(() => {
    if (nearbyPlaces.length > 0) {
      sortNearbyPlaces(nearbyPlaces)
    }
    setCurrentPage(1)
  }, [sortBy])

  return (
    <div className="flex flex-col gap-2">
      <div id="nearby-map"></div>
      <div className="flex w-full items-center justify-between">
        <div className="flex gap-4">
          {placeOptions.map((option) => (
            <button type="button" key={option.type} className="flex items-center" onClick={() => setSelectedPlaceType(option.type)}>
              {/* @ts-ignore */}
              <Tooltip icon={<div className="rounded-sm py-1 text-xs text-center whitespace-nowrap">{option.icon}</div>}>
                <div className="text-xs whitespace-nowrap">{option.type}</div>
              </Tooltip>
            </button>
          ))}
        </div>
        <div>
          <label htmlFor="nearby-radius" className="text-sm font-medium leading-6 text-gray-900">
            Radius:
          </label>
          <select className="form-select ml-2" id="nearby-radius" onChange={handleRadiusChange} defaultValue={selectedRadius}>
            {radiusOptions.map((option) => (
              <option value={option.value} key={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <table className="table overflow-x-auto">
        <thead>
          <tr className="bg-pink-50">
            {tableHeadings.map((heading, index) => (
              <th
                key={index}
                onClick={() => handleSort(heading)}
                className={`p-2 text-left ${heading === "Rating" || heading === "Distance" ? "cursor-pointer hover:bg-gray-200" : ""}`}
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-sm">
          {currentPageItems.length ? (
            currentPageItems.map((place, index) => (
              <NearbyPlaceRow place={place} key={place.id} index={index} selectedPOIs={selectedPOIs} setSelectedPOIs={setSelectedPOIs} />
            ))
          ) : (
            <tr className="bg-white">
              <td className="p-2">Nearby place not found as per requirement.</td>
              <td className="p-2">N/A</td>
              <td className="p-2">N/A</td>
              <td className="p-2">N/A</td>
              <td className="p-2">N/A</td>
            </tr>
          )}
        </tbody>
      </table>
      {/* Render pagination controls */}
      <div className="flex w-full justify-center">
        {Array.from({ length: totalPages as number }, (_, i) => i + 1).map((pageNumber) => (
          <button
            type="button"
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            className={`text-sm px-3 py-1 mx-2 rounded-md ${pageNumber === currentPage ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          >
            {pageNumber}
          </button>
        ))}
      </div>
    </div>
  )
}

export default NearbyPlaces
