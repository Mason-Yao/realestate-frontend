import NumberCard from "./NumberCard"
import React, { useEffect, useState } from "react"
import { getClientsCount } from "../../apis/clients"
function ClientNumberCard() {
  const [result, setResult] = useState()

  useEffect(() => {
    getClientsCount().then((count) => {
      setResult(count)
    })
  }, [])

  return <NumberCard title="Total number of Clients" subTitle="clients" number={result} />
}
export default ClientNumberCard
