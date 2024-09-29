import { POI } from "../../../Shared/Interface/property"

type argType = (string | google.maps.LatLng | google.maps.LatLngLiteral | google.maps.Place)[]

export const fetchNearby = async (originCoordinates: google.maps.LatLngLiteral, placeType: string, radius: number): Promise<POI[] | null> => {
  async function initMap(): Promise<google.maps.Map> {
    await google.maps.importLibrary("routes")
    const { Map } = (await google.maps.importLibrary("maps")) as google.maps.MapsLibrary
    const map = new Map(document.getElementById("nearby-map") as HTMLElement, {
      center: originCoordinates,
      zoom: 8,
    })
    return map
  }

  const nearbyMap = await initMap()

  return new Promise<POI[] | null>((resolve) => {
    const renderNearby = async (rawResults: google.maps.places.PlaceResult[] | null, status: google.maps.places.PlacesServiceStatus) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        if (!rawResults) return resolve(null)
        // The result object below, see attribute options from
        // https://developers.google.com/maps/documentation/javascript/places#place_search_responses

        const nearbyResults = rawResults?.map(({ name, geometry, vicinity, rating, user_ratings_total, place_id, types }) => ({
          name: name as string,
          coordinates: {
            lat: geometry?.location?.lat() as number,
            lng: geometry?.location?.lng() as number,
          },
          address: vicinity as string,
          rating: rating as number,
          user_ratings_total: user_ratings_total as number,
          id: place_id as string,
          types: types as string[],
        }))
        const nearbyPlaceCoords = nearbyResults?.map(({ coordinates }) => coordinates)
        if (!nearbyPlaceCoords) {
          resolve(null)
          return
        }
        const distancesResponse = await getNearbyPlacesDistances([originCoordinates], nearbyPlaceCoords)
        if (!distancesResponse) return resolve(null)
        const distancesArray = distancesResponse?.rows[0].elements.map((element) => element.distance?.text)
        const durationsArray = distancesResponse?.rows[0].elements.map((element) => element.duration?.text)
        const finalNearByResults: POI[] = nearbyResults?.map((result, index) => ({
          ...result,
          distance: distancesArray?.[index],
          duration: durationsArray?.[index],
        }))
        resolve(finalNearByResults)
      } else {
        resolve(null)
      }
    }

    const service = new google.maps.places.PlacesService(nearbyMap)

    service.nearbySearch(
      {
        location: originCoordinates,
        radius: radius,
        type: placeType,
      },
      renderNearby
    )
  })
}

export const getNearbyPlacesDistances = async (originCoordinates: argType, destinationCoords: argType): Promise<google.maps.DistanceMatrixResponse | null> => {
  return new Promise<google.maps.DistanceMatrixResponse | null>((resolve) => {
    const distanceService = new google.maps.DistanceMatrixService()

    const request: google.maps.DistanceMatrixRequest = {
      origins: originCoordinates,
      destinations: destinationCoords,
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.METRIC,
      language: "en",
    }

    const callback = (results: google.maps.DistanceMatrixResponse | null, status: google.maps.DistanceMatrixStatus) => {
      if (status === google.maps.DistanceMatrixStatus.OK) {
        resolve(results)
      } else {
        resolve(null)
      }
    }

    distanceService.getDistanceMatrix(request, callback)
  })
}
