import ReactDOM from "react-dom/client"
import { useRef, useEffect, ReactNode } from "react"
import { Coordinates, POI } from "../../../../Shared/Interface/property"

interface IProps {
  map: google.maps.Map
  position: Coordinates | undefined
  children: ReactNode
  onClick?: (place: POI) => void // Specify the onClick function type
}

const AdvancedMarker = ({ map, position, children, onClick }: IProps) => {
  const rootRef = useRef<ReactDOM.Root | null>(null)
  const markerRef = useRef<google.maps.marker.AdvancedMarkerElement | null>(null)

  useEffect(() => {
    if (!rootRef.current) {
      const container = document.createElement("div")
      rootRef.current = ReactDOM.createRoot(container)
      markerRef.current = new google.maps.marker.AdvancedMarkerElement({
        position,
        content: container,
      })
    }
    return () => {
      if (markerRef.current) {
        markerRef.current.map = null // Make sure to nullify the map reference
      }
    }
  }, [])

  useEffect(() => {
    if (markerRef.current) {
      rootRef.current?.render(children) // this allows us to dynamically update the marker content in the future
      markerRef.current.position = position
      markerRef.current.map = map
      if (!onClick) return
      const listener = markerRef.current.addListener("gmp-click", onClick)
      return () => {
        if (listener && markerRef.current) {
          listener.remove()
        }
      }
    }
    return
  }, [map, position, children, onClick])

  return null // Since this component manages external resources, it doesn't need to render any JSX
}

export default AdvancedMarker
