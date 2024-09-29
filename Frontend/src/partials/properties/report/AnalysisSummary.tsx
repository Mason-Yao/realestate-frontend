import ProjectPieChart from "./AnalysisPieChart"
import { numberToPrice } from "../../../utils/helper"
import ValueDisplayLarge from "../../../components/ValueDisplayLarge"
import { getYearlyCashflow, getYearlyMaintenanceCost, getYearlyRentalManagementFee } from "./reportCalculations"
import { colors, lightColors } from "../../../utils/constants"

const AnalysisSummary = ({ propertyData, analysisData, setAnalysisData, upfrontCost, annualTotalCost, annualRentalIncome }) => {
  const { councilRate, insurance, bodyCorp, repairs, waterCharge, landTax, pestControl, fireAlarm, otherCost } = analysisData.cashflow
  const { monthlyRepayment } = analysisData.loan

  const { eoi, firb, solicitorFee, inspectionFee, otherFee, deposit, stampDuty, transferFee, foreignBuyersDuty, mortgageFee } = analysisData

  //annual cost chart data
  const annualCostChartData = [
    { item: "Repayments", value: monthlyRepayment * 12, color: colors[0], hoverColor: lightColors[0] },
    { item: "Council rate", value: councilRate, color: colors[1], hoverColor: lightColors[1] },
    { item: "Insurance", value: insurance, color: colors[2], hoverColor: lightColors[2] },
    { item: "Body corp", value: bodyCorp, color: colors[3], hoverColor: lightColors[3] },
    { item: "Repairs", value: repairs, color: colors[4], hoverColor: lightColors[4] },
    { item: "Water charge", value: waterCharge, color: colors[5], hoverColor: lightColors[5] },
    { item: "Land tax", value: landTax, color: colors[6], hoverColor: lightColors[6] },
    { item: "Pest control", value: pestControl, color: colors[7], hoverColor: lightColors[7] },
    { item: "Fire alarm", value: fireAlarm, color: colors[8], hoverColor: lightColors[8] },
    { item: "Management", value: getYearlyRentalManagementFee(analysisData), color: colors[9], hoverColor: lightColors[9] },
    { item: "Others", value: otherCost, color: colors[10], hoverColor: lightColors[10] },
  ].filter((item) => item.value > 0)

  const annualCostSubtitles = [
    { title: "Total:", value: annualTotalCost },
    { title: "Maintenance:", value: getYearlyMaintenanceCost(analysisData) },
    { title: "Repayments:", value: monthlyRepayment * 12 },
  ]

  // upfront cost chart data
  const upfrontCostChartData = [
    { item: "Deposit", value: deposit, color: colors[0], hoverColor: lightColors[0] },
    { item: "Stamp Duty", value: stampDuty, color: colors[1], hoverColor: lightColors[1] },
    { item: "Transfer", value: transferFee, color: colors[2], hoverColor: lightColors[2] },
    { item: "Mortgage", value: mortgageFee, color: colors[3], hoverColor: lightColors[3] },
    { item: "Foreign Buyer Duty", value: foreignBuyersDuty, color: colors[4], hoverColor: lightColors[4] },
    { item: "FIRB", value: firb, color: colors[5], hoverColor: lightColors[5] },
    { item: "Solicitor", value: solicitorFee, color: colors[6], hoverColor: lightColors[6] },
    { item: "Inspection", value: inspectionFee, color: colors[7], hoverColor: lightColors[7] },
    { item: "Others", value: otherFee, color: colors[8], hoverColor: lightColors[8] },
    { item: "EOI", value: eoi, color: colors[9], hoverColor: lightColors[9] },
  ].filter((item) => item.value > 0)

  const upfrontCostSubtitles = [{ title: "Total:", value: upfrontCost }]

  return (
    <>
      <div className="grid grid-cols-12 gap-2 sm:gap-4 lg:gap-6">
        <ValueDisplayLarge label="Annual Expense:" value={numberToPrice(annualTotalCost)} styleClasses="col-span-4" />
        <ValueDisplayLarge label="Annual Income:" value={numberToPrice(annualRentalIncome)} styleClasses="col-span-4" />
        <ValueDisplayLarge label="Annual Cashflow:" value={numberToPrice(getYearlyCashflow(analysisData))} styleClasses="col-span-4" />

        <ProjectPieChart data={annualCostChartData} subtitles={annualCostSubtitles} title="Annual cost chart" styleClasses="col-span-12 md:col-span-6" />

        <ProjectPieChart data={upfrontCostChartData} subtitles={upfrontCostSubtitles} title="Upfront cost chart" styleClasses="col-span-12 md:col-span-6" />
      </div>
    </>
  )
}

export default AnalysisSummary
