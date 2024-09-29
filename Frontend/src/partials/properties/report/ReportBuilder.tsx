import { useEffect, useMemo, useState } from "react"
import ReportPDF from "./pdfReport/ReportPDF"
import PropertySection from "./PropertySection"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import ClientSection from "./ClientSection"
import AnalysisSection from "./AnalysisSection"
import ProfessionalsSection from "./ProfessionalsSection"
import TimelineSection from "./TimelineSection"
import ProgressStep from "../../../components/ProgressStep"
import { ReportBuilderStep } from "../../../interfaces/interfaces"
import { analysisInitData, clientInitData, initProperty, timelineInitData } from "../../../utils/initialData"
import { ReportAnalysisData, ReportClientData, ReportTimelineData } from "../../../interfaces/properties"
import { Property } from "../../../../../Shared/Interface/property"
import { getStampDuty } from "../../../apis/stampDuty"
import { getRepayments } from "../../../apis/loan"
import { logger } from "../../../../../Shared/Utils"
import { getUpfrontCost, getYearlyRentalIncome, getYearlyTotalCost } from "./reportCalculations"

const ReportBuilder = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [clientData, setClientData] = useState<ReportClientData>(clientInitData)
  const [propertyData, setPropertyData] = useState<Property>(initProperty)
  const [analysisData, setAnalysisData] = useState<ReportAnalysisData>(analysisInitData)
  const [timelineData, setTimelineData] = useState<ReportTimelineData>(timelineInitData)

  // variables for stamp duty query
  const { investmentType, foreignBuyer, firstHomeBuyer } = clientData
  const { address, housePrice } = propertyData
  const { state } = address
  //variables for loan repayment query
  const { deposit, eoi, loan } = analysisData
  const { loanRatio, loanAmount, loanInterest, loanType } = loan

  const upfrontCost = useMemo(() => getUpfrontCost(analysisData), [analysisData])
  const annualTotalCost = useMemo(() => getYearlyTotalCost(analysisData), [analysisData])
  const annualRentalIncome = useMemo(() => getYearlyRentalIncome(analysisData), [analysisData])

  //auto calculate loan amount and deposit initially
  useEffect(() => {
    if (housePrice && housePrice > 0) {
      const newLoanAmount = Math.round((housePrice * loanRatio) / 100)
      const newDeposit = housePrice - newLoanAmount - eoi

      setAnalysisData({ ...analysisData, loan: { ...loan, loanAmount: newLoanAmount }, deposit: newDeposit })
    }
  }, [housePrice, eoi, loanRatio])

  //get stamp duty data
  useEffect(() => {
    if (housePrice && housePrice > 0 && state) {
      getStampDuty(state, investmentType, housePrice, "established", firstHomeBuyer, foreignBuyer)
        .then((res) => {
          logger.info(res)
          setAnalysisData((prevState) => ({
            ...prevState,
            stampDuty: res.stamp_duty,
            transferFee: res.transfer,
            foreignBuyersDuty: res.foreign_buyers_duty || 0,
            mortgageFee: res.mortgage,
            firstHomeGrant: res.first_home_grant || 0,
          }))
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [state, investmentType, firstHomeBuyer, foreignBuyer])

  //get loan repayment data
  useEffect(() => {
    if (housePrice && housePrice > 0 && loanAmount > 0) {
      getRepayments(loanAmount, loanInterest, loanType)
        .then((res) => {
          logger.info(res)
          setAnalysisData((prevState) => ({
            ...prevState,
            loan: { ...prevState.loan, monthlyRepayment: res.repayments, monthlyInterest: res.interest },
          }))
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [loanAmount, loanInterest, loanType])

  const handlePrev = () => {
    //dispatch(setReportCurrentStep(currentStep - 1))
    setCurrentStep(currentStep - 1)
  }

  const handleNext = () => {
    //dispatch(setReportCurrentStep(currentStep + 1))
    setCurrentStep(currentStep + 1)
  }

  return (
    <main className="relative flex flex-col gap-4 px-2 sm:px-6 lg:px-8 py-8 w-full max-w-8xl mx-auto">
      <ProgressStep totalSteps={Object.keys(ReportBuilderStep).length / 2} currentStep={currentStep} />
      <div className={`absolute top-14 ${currentStep !== ReportBuilderStep.ClientSection ? "left-8" : ""} right-8  flex justify-between`}>
        {currentStep !== ReportBuilderStep.ClientSection && (
          <button onClick={handlePrev} type="button" className={"btn bg-indigo-500 hover:bg-indigo-600 text-white "}>
            &lt;- Prev
          </button>
        )}
        {currentStep < ReportBuilderStep.ReportPDF && (
          <button onClick={handleNext} type="button" className={"btn bg-indigo-500 hover:bg-indigo-600 text-white"}>
            Next -&gt;
          </button>
        )}
      </div>
      {currentStep === ReportBuilderStep.ClientSection && <ClientSection clientData={clientData} setClientData={setClientData} />}
      {currentStep === ReportBuilderStep.PropertySection && (
        <PropertySection handlePrev={handlePrev} handleNext={handleNext} propertyData={propertyData} setPropertyData={setPropertyData} />
      )}
      {currentStep === ReportBuilderStep.AnalysisSection && (
        <AnalysisSection
          handlePrev={handlePrev}
          handleNext={handleNext}
          clientData={clientData}
          propertyData={propertyData}
          analysisData={analysisData}
          setAnalysisData={setAnalysisData}
          upfrontCost={upfrontCost}
          annualTotalCost={annualTotalCost}
          annualRentalIncome={annualRentalIncome}
        />
      )}
      {currentStep === ReportBuilderStep.TimelineSection && (
        <TimelineSection
          handlePrev={handlePrev}
          handleNext={handleNext}
          propertyData={propertyData}
          analysisData={analysisData}
          timelineData={timelineData}
          setTimelineData={setTimelineData}
          upfrontCost={upfrontCost}
        />
      )}
      {currentStep === ReportBuilderStep.ProfessionalsSection && <ProfessionalsSection handlePrev={handlePrev} handleNext={handleNext} />}
      {currentStep === ReportBuilderStep.ReportPDF && (
        <ReportPDF
          handlePrev={handlePrev}
          clientData={clientData}
          propertyData={propertyData}
          analysisData={analysisData}
          timelineData={timelineData}
          upfrontCost={upfrontCost}
          annualTotalCost={annualTotalCost}
          annualRentalIncome={annualRentalIncome}
        />
      )}
    </main>
  )
}

export default ReportBuilder
