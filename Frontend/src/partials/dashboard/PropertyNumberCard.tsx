import NumberCard from "./NumberCard"
import React, { useEffect, useState } from "react"
import { getPropertiesCount } from "../../apis/property"
function ClientNumberCard() {
  const [result, setResult] = useState<number>(0)

  useEffect(() => {
    getPropertiesCount().then((count) => {
      setResult(count)
    })
  }, [])

  return <NumberCard title="Total number of Properties" subTitle="properties" number={result} />
}

export default ClientNumberCard
