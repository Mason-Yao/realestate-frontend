import React, { useRef, useEffect, useState } from "react"
import { Coordinates, POI } from "../../../../Shared/Interface/property"
import NearbyMarkers from "./NearbyMarkers"

interface IProps {
  center: Coordinates
  selectedPOIs: POI[]
  setSelectedPOIs: React.Dispatch<React.SetStateAction<POI[]>>
  customStyles?: React.CSSProperties
}

function CurrentLocation({ center, selectedPOIs, setSelectedPOIs, customStyles }: IProps) {
  const mapOptions = {
    mapId: "e1669a9b5a8ea909", // Note: This custom map has style settings in Google Cloud Platform
    center: center,
    zoom: 15,
    // disableDefaultUI: true,
  }

  const [map, setMap] = useState<google.maps.Map | null>(null) // Specify google.maps.Map type
  const ref = useRef<HTMLDivElement>(null) // Specify HTMLDivElement type

  useEffect(() => {
    if (ref.current) {
      setMap(new window.google.maps.Map(ref.current, mapOptions))
    }
  }, [])

  return (
    <>
      <div ref={ref} id="map-new" style={customStyles} className="mt-4" />
      {map && selectedPOIs && <NearbyMarkers map={map} selectedPOIs={selectedPOIs} setSelectedPOIs={setSelectedPOIs} centerCoords={center} />}
    </>
  )
}

export default React.memo(CurrentLocation)

// Advanced Markers guide
//https://developers.google.com/maps/documentation/javascript/advanced-markers/html-markers

// demo tutorial video
// https://www.youtube.com/watch?v=8kxYqoY2WwE&ab_channel=GoogleMapsPlatform
