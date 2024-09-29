import React from "react"
import { POI } from "../../../../Shared/Interface/property"
import Ratings from "../../components/Ratings"

interface IProps {
  place: POI
}

const MarkerDetails = ({ place }: IProps) => {
  const { name, address, rating, user_ratings_total, distance, duration } = place

  return (
    <div className="flex flex-col gap-2">
      <p>
        <span className="font-bold mr-2">Place:</span>
        <span>{name}</span>
      </p>
      <p>
        <span className="font-bold mr-2">Address:</span>
        <span>{address}</span>
      </p>
      {rating && (
        <p className="flex items-center">
          <span className="font-bold mr-2">Rating:</span>
          <Ratings rate={rating} />
        </p>
      )}
      {user_ratings_total && (
        <p>
          <span className="font-bold mr-2">Reviews:</span>
          <span>{user_ratings_total} reviews from Google</span>
        </p>
      )}
      <p>
        <span className="font-bold mr-2">Distance:</span>
        <span>{distance}</span>
      </p>
      <p>
        <span className="font-bold mr-2">Driving time:</span>
        <span>{duration}</span>
      </p>
    </div>
  )
}

export default MarkerDetails
