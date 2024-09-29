import React, { useState } from "react"
import { useAppSelector, useAppDispatch } from "../../app/hooks"
import BasicInput from "./BasicInput"
import { setCurrentCreatedBy } from "../../slices/clientSlice"
import { useAuth0 } from "@auth0/auth0-react"

function AddBasicInfo(props) {
  const dispatch = useAppDispatch()
  const { user } = useAuth0()

  let [invalidName, setInvalidName] = useState(false)
  let [invalidEmail, setInvalidEmail] = useState(false)
  let [invalidPhone, setInvalidPhone] = useState(false)

  let client = useAppSelector((state) => state.client.currentClient)

  const checkName = () => {
    return client.name !== ""
  }

  const checkPhone = () => {
    if (client.phone === "") {
      return true
    }
    const numberRegex = /^[0-9]+$/
    return numberRegex.test(client.phone)
  }

  const checkEmail = () => {
    if (client.email === "") {
      return true
    }
    return client.email.includes("@")
  }

  const handleBasicNext = () => {
    if (!checkName()) {
      setInvalidName(true)
      return
    }
    if (!checkPhone()) {
      setInvalidPhone(true)
      return
    }
    if (!checkEmail()) {
      setInvalidEmail(true)
      return
    }
    //Add created by here
    dispatch(setCurrentCreatedBy(user?.nickname || ""))
    props.incrementStep()
  }

  return (
    <main>
      <BasicInput
        invalidName={invalidName}
        invalidEmail={invalidEmail}
        invalidPhone={invalidPhone}
        setInvalidName={setInvalidName}
        setInvalidEmail={setInvalidEmail}
        setInvalidPhone={setInvalidPhone}
      />
      {/* Buttons */}
      <div className="flex items-center justify-between mt-10">
        <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-auto" onClick={() => handleBasicNext()}>
          Next -&gt;
        </button>
      </div>
    </main>
  )
}

export default AddBasicInfo
