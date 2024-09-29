import { Property } from "../../../../../Shared/Interface/property"
import { getAddressString, numberToPrice } from "../../../utils/helper"
import CurrentLocation from "../../map/CurrentLocation"
import { IoBedOutline } from "react-icons/io5"
import { LuBath } from "react-icons/lu"
import { BiArea, BiCar } from "react-icons/bi"
import ImageGrid from "./ImageGrid"
import NearbyPlaceRow from "../add-property/NearbyPlaceRow"
//fake images import
import PlaceHolderImage from "../../../images/placeholder.jpg"

interface IProps {
  property: Property
}

const PropertyDetails = ({ property }) => {
  const tableHeadings = ["Name", "Address", "Rating", "Distance", "Drive"]
  const hasCoordinates = property?.coordinates.lat !== 0 && property?.coordinates.lng !== 0
  const { address, bedrooms, bathrooms, carSpaces, files } = property

  //TODO: this is a temporary fake solution to show property images
  const getPropertyImages = () => {
    if (files && files.length) {
      return files
    }
    return [{ path: PlaceHolderImage }]
  }

  return (
    <>
      <section className="max-w-6xl mx-auto flex flex-col justify-center gap-6 lg:flex-row p-6 mb-12 scroll-mt-40">
        <article className="flex flex-col items-center gap-4 lg:w-2/5 md:mt-8">
          <h2 className="max-w-sm text-3xl font-bold text-center sm:max-w-xl lg:text-4xl lg:text-left text-slate-900">{getAddressString(address)}</h2>
          <ul className="flex gap-4 flex-wrap text-sm mt-4">
            <li className="flex items-center mr-2 text-base text-slate-400">
              <IoBedOutline className="mr-1" />
              <span className="font-bold">{bedrooms}</span>
            </li>
            <li className="flex items-center mr-2 text-base text-slate-400">
              <LuBath className="text-slate-400 mr-1" />
              <span className="font-bold">{bathrooms}</span>
            </li>

            <li className="flex items-center mr-2 text-base text-slate-400">
              <BiCar className="text-base mr-1" />
              <span className="font-bold">{carSpaces}</span>
            </li>

            {property.houseArea && (
              <li className="flex items-center mr-2 text-base text-slate-400">
                <BiArea className="text-base mr-1" />
                <span className="font-bold">{property.houseArea}</span>
                <span>m²</span>
              </li>
            )}
            <li className="flex items-center mr-2 text-base text-slate-400">
              <span className="font-bold">{numberToPrice(property.housePrice)}</span>
            </li>
          </ul>
        </article>
        <ImageGrid images={getPropertyImages()} customClasses="lg:w-3/5" />
      </section>
      <section>
        <p className="text-md mx-8 text-slate-700">{property.description}</p>
      </section>

      <section className="mx-auto mt-4 flex flex-col justify-center gap-6 p-6 items-center mb-12">
        <div className="flex flex-col items-center w-full">
          <h2 className="text-3xl font-bold text-center sm:max-w-xl lg:text-4xl lg:text-left text-slate-900">Nearby facilities</h2>
          {property.POIs && property.POIs.length > 0 ? (
            <table className="table overflow-x-auto w-full">
              <thead>
                <tr className="bg-pink-50">
                  {tableHeadings.map((heading, index) => (
                    <th key={index} className="p-2 text-left">
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-sm">
                {property.POIs.map((place, index) => (
                  <NearbyPlaceRow place={place} key={place.id} index={index} editable={false} />
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center">Nearby facilities not selected at property creation time.</p>
          )}
        </div>
        <div className="w-full">
          {hasCoordinates ? (
            <CurrentLocation
              center={property.coordinates}
              nearByPlaces={property.POIs}
              editable={false}
              customStyles={{ height: "400px", borderRadius: "0.75rem" }}
            />
          ) : (
            <p className="text-center">Address coordinates not set to show on the map.</p>
          )}
        </div>
      </section>
    </>
  )
}

export default PropertyDetails
