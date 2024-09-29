import React, { useState } from "react"
import { useAppSelector, useAppDispatch } from "../../app/hooks"
import ProgressStep from "../../components/ProgressStep"
import { addClient } from "../../apis/clients"
import { AddClientStep } from "../../interfaces/interfaces"
import AddBasicInfo from "./AddBasicInfo"
import AddAdvancedInfo from "./AddAdvancedInfo"
import ClientAdded from "./ClientAdded"
//import AddPropertyForm from "../properties/AddPropertyForm"
//import AddRelationForm from "./AddRelationForm"
import { logger } from "../../../../Shared/Utils"
import { setBanner, setIsLoading } from "../../slices/configSlice"

function AddClientProgress() {
  const dispatch = useAppDispatch()
  let [step, setStep] = useState(1)
  let client = useAppSelector((state) => state.client.currentClient)

  const incrementStep = () => {
    setStep((step) => step + 1)
  }

  const decrementStep = () => {
    setStep((step) => step - 1)
  }

  const handleAddClient = () => {
    const { PK, id, ...clientPayload } = client
    logger.info(JSON.stringify(clientPayload))
    dispatch(setIsLoading(true))

    addClient(clientPayload)
      .then((res) => {
        setStep((step) => step + 1)
        dispatch(setIsLoading(false))
        dispatch(
          setBanner({
            status: "success",
            content: `Client has been added successfully.`,
          })
        )
      })
      .catch((error) => {
        dispatch(
          setBanner({
            status: "error",
            content: `Something wrong happened. Please try again.`,
          })
        )
        dispatch(setIsLoading(false))
      })
  }

  return (
    <main>
      <div className="relative flex">
        {/* Content */}
        <div className="w-full">
          <div className="min-h-screen h-full flex flex-col after:flex-1">
            {/* Progress bar */}
            <ProgressStep totalSteps={3} currentStep={step} />

            <div className="md:px-20 py-2">
              {step == AddClientStep.BasicInfo && <AddBasicInfo incrementStep={incrementStep} decrementStep={decrementStep} />}
              {step == AddClientStep.AdvancedInfo && <AddAdvancedInfo handleAddClient={handleAddClient} decrementStep={decrementStep} />}
              {step == AddClientStep.Finish && <ClientAdded />}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default AddClientProgress
