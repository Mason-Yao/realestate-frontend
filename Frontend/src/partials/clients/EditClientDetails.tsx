import React, { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { useNavigate } from "react-router-dom"
import BasicInput from "./BasicInput"
import AdvancedInput from "./AdvancedInput"
import { updateClient } from "../../apis/clients"
import { setCurrentCreatedBy } from "../../slices/clientSlice"
import { setBanner } from "../../slices/configSlice"
import { logger } from "../../../../Shared/Utils"
import { isValidDate } from "../../utils"
import { useAuth0 } from "@auth0/auth0-react"

function EditClientDetails() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const client = useAppSelector((state) => state.client.currentClient)
  const { user } = useAuth0()

  const [invalidName, setInvalidName] = useState(false)
  const [invalidEmail, setInvalidEmail] = useState(false)
  const [invalidPhone, setInvalidPhone] = useState(false)
  const [invalidDOB, setInvalidDOB] = useState(false)
  const [invalidSocial, setInvalidSocial] = useState(false)

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

  const checkDOB = () => {
    if (!client.dob || client.dob === "") {
      return true
    }
    return isValidDate(client.dob)
  }

  const validationCheck = () => {
    if (!checkName()) {
      setInvalidName(true)
      return false
    }
    if (!checkPhone()) {
      setInvalidPhone(true)
      return false
    }
    if (!checkEmail()) {
      setInvalidEmail(true)
      return false
    }
    if (!checkDOB()) {
      setInvalidDOB(true)
      return false
    }
    if (invalidSocial) {
      return false
    }
    return true
  }

  const handleUpdateClient = () => {
    if (validationCheck()) {
      const { PK, id, ...clientPayload } = client
      logger.info(JSON.stringify(clientPayload))

      updateClient(id, clientPayload)
        .then((res) => {
          logger.info("Updated client")
          dispatch(
            setBanner({
              status: "success",
              content: `Client '${client.name}' updated successfully.`,
            })
          )
          navigate("/clients")
        })
        .catch((error) => {
          dispatch(
            setBanner({
              status: "error",
              content: "Something wrong happened. Please try again.",
            })
          )
        })
    }
  }

  const handleCancel = () => {
    navigate(-1)
  }

  return (
    <main>
      <div className="relative flex">
        {/* Content */}
        <div className="w-full">
          <div className="min-h-screen h-full flex flex-col after:flex-1">
            <div className="md:px-20 py-2">
              <div className="mb-4">
                <BasicInput
                  invalidName={invalidName}
                  invalidEmail={invalidEmail}
                  invalidPhone={invalidPhone}
                  setInvalidName={setInvalidName}
                  setInvalidEmail={setInvalidEmail}
                  setInvalidPhone={setInvalidPhone}
                />
              </div>
              <div className="mb-4">
                <AdvancedInput invalidDOB={invalidDOB} setInvalidDOB={setInvalidDOB} invalidSocial={invalidSocial} setInvalidSocial={setInvalidSocial} />
              </div>

              {/* Buttons */}
              <div className="flex items-center justify-between mt-10">
                <button className="text-sm underline hover:no-underline" onClick={() => handleCancel()}>
                  &lt;- Cancel
                </button>

                <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-auto" onClick={() => handleUpdateClient()}>
                  Update Client -&gt;
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default EditClientDetails
