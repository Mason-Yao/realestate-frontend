import ValueDisplay from "../../../components/ValueDisplay"
import { numberToPrice } from "../../../utils/helper"

import AnalysisSummary from "./AnalysisSummary"
import AnalysisUpfrontCost from "./AnalysisUpfrontCost"
import AnalysisLoan from "./AnalysisLoan"
import AnalysisCashflow from "./AnalysisCashflow"

const AnalysisSection = ({
  handlePrev,
  handleNext,
  clientData,
  propertyData,
  analysisData,
  setAnalysisData,
  upfrontCost,
  annualTotalCost,
  annualRentalIncome,
}) => {
  const { investmentType, foreignBuyer, firstHomeBuyer } = clientData
  const { housePrice, address, type, status } = propertyData
  const { state } = address

  return (
    <>
      <h2 className="font-bold">Cash Flow Section:</h2>
      <div className="flex flex-col gap-8 p-4 bg-white shadow-lg rounded-sm border border-slate-200">
        <AnalysisSummary
          propertyData={propertyData}
          analysisData={analysisData}
          setAnalysisData={setAnalysisData}
          upfrontCost={upfrontCost}
          annualTotalCost={annualTotalCost}
          annualRentalIncome={annualRentalIncome}
        />

        <div className="flex flex-col gap-2 sm:gap-4">
          <h2 className="pb-3 border-b border-slate-100 font-semibold text-slate-800">1.Basic information</h2>
          <div className="grid grid-cols-12 gap-2 sm:gap-4 lg:gap-6">
            <ValueDisplay label="Property Price" value={numberToPrice(housePrice)} />
            <ValueDisplay label="State" value={state} />
            <ValueDisplay label="Property Type" value={type} />
            <ValueDisplay label="Property Status" value={status} />
            <ValueDisplay label="Buying as" value={investmentType} />
            <ValueDisplay label="Foreign Purchaser" value={foreignBuyer ? "Yes" : "No"} />
            <ValueDisplay label="First Home Buyer" value={firstHomeBuyer ? "Yes" : "No"} />
          </div>
        </div>

        <AnalysisUpfrontCost propertyData={propertyData} analysisData={analysisData} setAnalysisData={setAnalysisData} />

        <AnalysisLoan propertyData={propertyData} analysisData={analysisData} setAnalysisData={setAnalysisData} />

        <AnalysisCashflow propertyData={propertyData} analysisData={analysisData} setAnalysisData={setAnalysisData} annualRentalIncome={annualRentalIncome} />
      </div>
      <div className="flex justify-between">
        <button onClick={handlePrev} type="button" className="btn bg-indigo-500 hover:bg-indigo-600 text-white">
          &lt;- Prev
        </button>

        <div className="ml-auto flex gap-4">
          <button onClick={handleNext} type="button" className="btn bg-indigo-500 hover:bg-indigo-600 text-white">
            Next -&gt;
          </button>
        </div>
      </div>
    </>
  )
}

export default AnalysisSection
