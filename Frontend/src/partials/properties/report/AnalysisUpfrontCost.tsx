import ValueDisplay from "../../../components/ValueDisplay"
import { numberToPrice, priceToNumber } from "../../../utils/helper"

import { Property } from "../../../../../Shared/Interface/property"
import { ReportAnalysisData } from "../../../interfaces/properties"
import ValueInput from "../../../components/ValueInput"

interface IProps {
  propertyData: Property
  upFrontCostData: ReportAnalysisData
  setUpFrontCostData: React.Dispatch<React.SetStateAction<ReportAnalysisData>>
}

const AnalysisUpfrontCost = ({ propertyData, analysisData, setAnalysisData }) => {
  const { eoi, firb, solicitorFee, inspectionFee, otherFee, deposit, stampDuty, transferFee, foreignBuyersDuty, mortgageFee } = analysisData
  return (
    <div className="flex flex-col gap-2 sm:gap-4">
      <h2 className="pb-3 border-b border-slate-100 font-semibold text-slate-800">2.Upfront cost</h2>
      <div className="grid grid-cols-10 gap-2 sm:gap-4 lg:gap-6">
        <ValueDisplay label="Deposit" value={numberToPrice(deposit)} />
        <ValueDisplay label="Stamp Duty" value={numberToPrice(stampDuty)} />
        <ValueDisplay label="Transfer" value={numberToPrice(transferFee)} />
        <ValueDisplay label="Mortgage" value={numberToPrice(mortgageFee)} />
        <ValueDisplay label="Foreign Buyer Duty" value={numberToPrice(foreignBuyersDuty)} />

        <ValueInput
          label="EOI"
          value={numberToPrice(eoi)}
          onChange={(e) => {
            setAnalysisData({ ...analysisData, eoi: priceToNumber(e.target.value) })
          }}
        />
        <ValueInput
          label="FIRB"
          value={numberToPrice(firb)}
          onChange={(e) => {
            setAnalysisData({ ...analysisData, firb: priceToNumber(e.target.value) })
          }}
        />
        <ValueInput
          label="Solicitor Fee"
          value={numberToPrice(solicitorFee)}
          onChange={(e) => {
            setAnalysisData({ ...analysisData, solicitorFee: priceToNumber(e.target.value) })
          }}
        />
        <ValueInput
          label="Inspection"
          value={numberToPrice(inspectionFee)}
          onChange={(e) => {
            setAnalysisData({ ...analysisData, inspectionFee: priceToNumber(e.target.value) })
          }}
        />
        <ValueInput
          label="Other"
          value={numberToPrice(otherFee)}
          onChange={(e) => {
            setAnalysisData({ ...analysisData, otherFee: priceToNumber(e.target.value) })
          }}
        />
      </div>
    </div>
  )
}

export default AnalysisUpfrontCost
