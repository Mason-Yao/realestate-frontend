import React, { useState } from "react"
import AdvancedMarker from "./AdvancedMarker"
import MarkerDetails from "./MarkerDetails"
import { Coordinates, POI } from "../../../../Shared/Interface/property"
import { IoHome, IoSchool, IoTrainSharp, IoCart, IoBusSharp } from "react-icons/io5"
import { GiPoliceOfficerHead } from "react-icons/gi"
import { FaUserDoctor } from "react-icons/fa6"
import { FaUniversity } from "react-icons/fa"
import ModalBlank from "../../components/ModalBlank"

interface IProps {
  centerCoords: Coordinates
  map: google.maps.Map
  selectedPOIs: POI[]
  setSelectedPOIs: React.Dispatch<React.SetStateAction<POI[]>>
}

const NearbyMarkers = ({ map, selectedPOIs, setSelectedPOIs, centerCoords }: IProps) => {
  const [selectedPlace, setSelectedPlace] = useState<POI>()
  const [markerModalOpen, setMarkerModalOpen] = useState(false)

  const handleSelect = (e, place: POI) => {
    e.stopPropagation()
    setMarkerModalOpen(true)
    setSelectedPlace(place)
    console.log(selectedPlace, markerModalOpen)
  }

  const handleRemove = (e) => {
    e.stopPropagation()
    setMarkerModalOpen(false)
    setSelectedPOIs(selectedPOIs.filter((poi) => poi.id !== selectedPlace?.id))
  }

  return (
    <div>
      <AdvancedMarker map={map} position={centerCoords}>
        <div className="bg-indigo-500 p-1 rounded-full">
          <IoHome className="text-white text-3xl" />
        </div>
      </AdvancedMarker>
      {selectedPOIs.map((place) => (
        <AdvancedMarker key={place.id} map={map} position={place.coordinates} onClick={(e) => handleSelect(e, place)}>
          <div className="bg-indigo-500 p-1 rounded-full">
            {place.types?.includes("school") && <IoSchool className="text-white text-2xl" />}
            {place.types?.includes("university") && <FaUniversity className="text-white text-2xl" />}
            {place.types?.includes("store") && <IoCart className="text-white text-2xl" />}
            {place.types?.includes("bus_station") && <IoBusSharp className="text-white text-2xl" />}
            {place.types?.includes("train_station") && <IoTrainSharp className="text-white text-2xl" />}
            {place.types?.includes("hospital") && <FaUserDoctor className="text-white text-2xl" />}
            {place.types?.includes("police") && <GiPoliceOfficerHead className="text-white text-2xl" />}
          </div>
        </AdvancedMarker>
      ))}

      {selectedPlace && (
        <ModalBlank id="marker-info-modal" modalOpen={markerModalOpen} setModalOpen={setMarkerModalOpen}>
          <div className="p-5 flex space-x-4">
            {/* Icon */}

            {/* Content */}
            <div className="w-full">
              {/* Modal header */}
              <div className="mb-2">
                <div className="text-lg font-semibold text-slate-800">Marker Information</div>
              </div>
              {/* Modal content */}
              <div className="text-sm mb-10">
                <div className="space-y-2">
                  <MarkerDetails place={selectedPlace} />
                </div>
              </div>
              {/* Modal footer */}
              <div className="flex flex-wrap justify-end space-x-2">
                <button
                  className="btn-sm border-slate-200 hover:border-slate-300 text-slate-600"
                  onClick={(e) => {
                    e.stopPropagation()
                    setMarkerModalOpen(false)
                  }}
                >
                  Cancel
                </button>
                <button className="btn-sm bg-rose-500 hover:bg-rose-600 text-white" onClick={(e) => handleRemove(e)}>
                  Delete marker
                </button>
              </div>
            </div>
          </div>
        </ModalBlank>
      )}
    </div>
  )
}

export default NearbyMarkers
