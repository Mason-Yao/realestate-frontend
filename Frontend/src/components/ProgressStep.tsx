import React from "react"
import { AddClientStep } from "../interfaces/interfaces"

interface Props {
  totalSteps: number
  currentStep: number
}
function ProgressStep({ totalSteps, currentStep }: Props) {
  return (
    <div className="px-4 pt-8 pb-8">
      <div className="max-w-md mx-auto w-full">
        <div className="relative">
          <div className="absolute left-0 top-1/2 -mt-px w-full h-0.5 bg-slate-200" aria-hidden="true"></div>
          <ul className="relative flex justify-between w-full">
            {Array.from(Array(totalSteps).keys())
              .map((step) => step + 1) // step starts from 1
              .map((step) => (
                <li key={step}>
                  <div
                    className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold" ${
                      currentStep == step ? "bg-indigo-500 text-white" : "bg-slate-200 text-slate-500"
                    }`}
                  >
                    {step}
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ProgressStep
