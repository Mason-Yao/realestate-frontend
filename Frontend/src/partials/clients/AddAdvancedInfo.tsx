import React, { useState } from "react"
import AdvancedInput from "./AdvancedInput"
import { useAppSelector } from "../../app/hooks"
import { isValidDate } from "../../utils"

function AddAdvancedInfo(props) {
  let client = useAppSelector((state) => state.client.currentClient)
  let [invalidDOB, setInvalidDOB] = useState(false)
  let [invalidSocial, setInvalidSocial] = useState(false)

  const checkDOB = () => {
    if (client.dob === "") {
      return true
    }
    return isValidDate(client.dob)
  }

  const onAddClick = () => {
    if (!checkDOB()) {
      setInvalidDOB(true)
      return
    }
    if (!invalidSocial) {
      props.handleAddClient()
    }
  }

  return (
    <main>
      <AdvancedInput invalidDOB={invalidDOB} setInvalidDOB={setInvalidDOB} invalidSocial={invalidSocial} setInvalidSocial={setInvalidSocial} />
      {/* Buttons */}
      <div className="flex items-center justify-between mt-10">
        <button className="text-sm underline hover:no-underline" onClick={() => props.decrementStep()}>
          &lt;- Back
        </button>

        <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-auto" onClick={() => onAddClick()}>
          Add Client -&gt;
        </button>
      </div>
    </main>
  )
}

export default AddAdvancedInfo
