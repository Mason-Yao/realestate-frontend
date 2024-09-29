import React from "react"
import { FaStar } from "react-icons/fa"

interface IProps {
  rate: number
}

function Ratings({ rate }: IProps) {
  return (
    <span className="flex">
      {[...Array(5)].map((e, i) => (
        <FaStar key={i} color={i < rate ? "#8460c3" : "pink"} />
      ))}
    </span>
  )
}

export default Ratings
