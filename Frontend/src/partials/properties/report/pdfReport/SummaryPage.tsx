import { useMemo } from "react"
import { Page, Text, View } from "@react-pdf/renderer"
import { styles } from "./ReportStyles"
import Layout from "./components/Layout"
import { numberToPrice } from "../../../../utils/helper"
import { Property } from "../../../../../../Shared/Interface/property"
import { RENTAL_PERIOD, ReportAnalysisData, ReportClientData, ReportTimelineData } from "../../../../interfaces/properties"
import { getYearlyRentalIncome, getYearlyRentalManagementFee } from "../reportCalculations"

interface IProps {
  clientData: ReportClientData
  propertyData: Property
  analysisData: ReportAnalysisData
  timelineData: ReportTimelineData
  upfrontCost: number
  annualTotalCost: number
  annualRentalIncome: number
}

const basicInfos = [
  "Property Price:",
  "State:",
  "Buying as:",
  "Rent Price:",
  "Property Type:",
  "Foreign Purchaser:",
  "First Home Buyer:",
  "New or Established Property:",
]

const loanInfos = ["Loan Amount:", "Loan Interest:", "Loan percentage:", "Loan Type:", "Monthly repayments:", "Monthly interests:"]

const upfrontCosts = [
  "EOI:",
  "Deposit:",
  "FIRB:",
  "Solicitor Fee:",
  "Inspection Fee:",
  "Other Fee:",
  "Stamp Duty:",
  "Transfer:",
  "Mortgage:",
  "Foreign Buyer Duty:",
]

const annualCosts = [
  "Repayments:",
  "Council Rate:",
  "Insurance:",
  "Body corp:",
  "Repair:",
  "Water Charges:",
  "Land Tax:",
  "Pest Control:",
  "Fire Alarm:",
  "Manage Cost:",
  "Other Cost:",
  "Management Rate:",
]

const SummaryPage = ({ clientData, propertyData, analysisData, timelineData, upfrontCost, annualTotalCost, annualRentalIncome }: IProps) => {
  const { foreignBuyer, firstHomeBuyer } = clientData
  const { housePrice, address, sourceType, type } = propertyData
  const { state } = address
  const { eoi, firb, solicitorFee, inspectionFee, otherFee, deposit, stampDuty, transferFee, foreignBuyersDuty, mortgageFee } = analysisData
  const { rentalIncome, rentalPeriod, councilRate, insurance, bodyCorp, repairs, waterCharge, landTax, pestControl, fireAlarm, otherCost, managementRate } =
    analysisData.cashflow
  const { loanAmount, loanInterest, loanType, loanRatio, monthlyRepayment, monthlyInterest } = analysisData.loan
  const { contractDate, coolingOffDate, subjectToFinanceDate, subjectToBuildingDate, settlementDate } = timelineData
  const annualRentIncome = useMemo(() => getYearlyRentalIncome(analysisData), [analysisData])
  return (
    <Page style={styles.contentPage}>
      <Layout>
        <View style={[styles.gap2, styles.paddingOneLeftRight]}>
          <Text style={[styles.textBig, styles.paddingOneLeftRight]}>Summary</Text>
          <View style={[styles.gap1, styles.borderOne, styles.paddingOneLeftRight]}>
            <Text style={styles.summaryTitle}>Basic information:</Text>
            <View style={[styles.flexRow, styles.gap2, styles.textSmall, styles.spaceBetween]}>
              <View style={[styles.gap1, styles.flexCol]}>
                {basicInfos.slice(0, Math.round(basicInfos.length / 2)).map((e, i) => (
                  <Text key={i}>{e}</Text>
                ))}
              </View>
              <View style={[styles.gap1, styles.flexCol]}>
                <Text>{numberToPrice(housePrice || 0)}</Text>
                <Text>{state?.toUpperCase()}</Text>
                <Text>{type.toUpperCase()}</Text>
                <Text>{numberToPrice(rentalIncome)}</Text>
              </View>
              <View style={[styles.gap1, styles.flexCol]}>
                {basicInfos.slice(Math.round(basicInfos.length / 2), basicInfos.length).map((e, i) => (
                  <Text key={i}>{e}</Text>
                ))}
              </View>
              <View style={[styles.gap1, styles.flexCol]}>
                <Text>{type}</Text>
                <Text>{foreignBuyer ? "Yes" : "No"}</Text>
                <Text>{firstHomeBuyer ? "Yes" : "No"}</Text>
                <Text>{sourceType.toUpperCase()}</Text>
              </View>
            </View>
          </View>
          <View style={[styles.gap1, styles.borderOne, styles.paddingOneLeftRight]}>
            <Text style={styles.summaryTitle}>Loan:</Text>
            <View style={[styles.flexRowStart, styles.gap2, styles.textSmall, styles.spaceBetween]}>
              <View style={[styles.gap1, styles.flexCol]}>
                {loanInfos.slice(0, Math.round(loanInfos.length / 2)).map((e, i) => (
                  <Text key={i}>{e}</Text>
                ))}
              </View>
              <View style={[styles.gap1, styles.flexCol]}>
                <Text>{numberToPrice(loanRatio * (housePrice || 0))}</Text>
                <Text>{loanInterest}%</Text>
                <Text>{loanRatio}%</Text>
              </View>
              <View style={[styles.gap1, styles.flexCol]}>
                {loanInfos.slice(Math.round(loanInfos.length / 2), loanInfos.length).map((e, i) => (
                  <Text key={i}>{e}</Text>
                ))}
              </View>
              <View style={[styles.gap1, styles.flexCol]}>
                <Text>{loanType}</Text>
                <Text>{numberToPrice(monthlyRepayment)}</Text>
                <Text>{numberToPrice(monthlyInterest)}</Text>
              </View>
            </View>
          </View>
          <View style={[styles.gap1, styles.borderOne, styles.paddingOneLeftRight]}>
            <Text style={styles.summaryTitle}>{`Upfront Cost: (Total: ${numberToPrice(upfrontCost)})`}</Text>
            <View style={[styles.flexRowStart, styles.gap2, styles.textSmall, styles.spaceBetween]}>
              <View style={[styles.gap1, styles.flexCol]}>
                {upfrontCosts.slice(0, Math.round(upfrontCosts.length / 3) + 1).map((e, i) => (
                  <Text key={i}>{e}</Text>
                ))}
              </View>
              <View style={[styles.gap1, styles.flexCol]}>
                <Text>{numberToPrice(eoi)}</Text>
                <Text>{numberToPrice(deposit)}</Text>
                <Text>{numberToPrice(firb)}</Text>
                <Text>{numberToPrice(solicitorFee)}</Text>
              </View>
              <View style={[styles.gap1, styles.flexCol]}>
                {upfrontCosts.slice(Math.round(upfrontCosts.length / 3) + 1, Math.round((upfrontCosts.length * 2) / 3)).map((e, i) => (
                  <Text key={i}>{e}</Text>
                ))}
              </View>
              <View style={[styles.gap1, styles.flexCol]}>
                <Text>{numberToPrice(inspectionFee)}</Text>
                <Text>{numberToPrice(otherFee)}</Text>
                <Text>{numberToPrice(stampDuty)}</Text>
              </View>
              <View style={[styles.gap1, styles.flexCol]}>
                {upfrontCosts.slice(Math.round((upfrontCosts.length * 2) / 3), upfrontCosts.length).map((e, i) => (
                  <Text key={i}>{e}</Text>
                ))}
              </View>
              <View style={[styles.gap1, styles.flexCol]}>
                <Text>{numberToPrice(transferFee)}</Text>
                <Text>{numberToPrice(mortgageFee)}</Text>
                <Text>{numberToPrice(foreignBuyersDuty)}</Text>
              </View>
            </View>
          </View>
          <View style={[styles.gap1, styles.borderOne, styles.paddingOneLeftRight]}>
            <Text style={styles.summaryTitle}>{`Annual Cost: (Total: ${numberToPrice(annualTotalCost)})`}</Text>
            <View style={[styles.flexRowStart, styles.gap2, styles.textSmall, styles.spaceBetween]}>
              <View style={[styles.gap1, styles.flexCol]}>
                {annualCosts.slice(0, Math.round(annualCosts.length / 3)).map((e, i) => (
                  <Text key={i}>{e}</Text>
                ))}
              </View>
              <View style={[styles.gap1, styles.flexCol]}>
                <Text>{numberToPrice(monthlyRepayment * 12)}</Text>
                <Text>{numberToPrice(councilRate)}</Text>
                <Text>{numberToPrice(insurance)}</Text>
                <Text>{numberToPrice(bodyCorp)}</Text>
              </View>
              <View style={[styles.gap1, styles.flexCol]}>
                {annualCosts.slice(Math.round(annualCosts.length / 3), Math.ceil((annualCosts.length * 2) / 3)).map((e, i) => (
                  <Text key={i}>{e}</Text>
                ))}
              </View>
              <View style={[styles.gap1, styles.flexCol]}>
                <Text>{numberToPrice(repairs)}</Text>
                <Text>{numberToPrice(waterCharge)}</Text>
                <Text>{numberToPrice(landTax)}</Text>
                <Text>{numberToPrice(pestControl)}</Text>
              </View>
              <View style={[styles.gap1, styles.flexCol]}>
                {annualCosts.slice(Math.ceil((annualCosts.length * 2) / 3), annualCosts.length).map((e, i) => (
                  <Text key={i}>{e}</Text>
                ))}
              </View>
              <View style={[styles.gap1, styles.flexCol]}>
                <Text>{numberToPrice(fireAlarm)}</Text>
                <Text>{numberToPrice(getYearlyRentalManagementFee(analysisData))}</Text>
                <Text>{numberToPrice(otherCost)}</Text>
                <Text>{managementRate}%</Text>
              </View>
            </View>
          </View>
          <View style={[styles.gap1, styles.borderOne, styles.paddingOneLeftRight]}>
            <Text style={styles.summaryTitle}>Annual Income</Text>
            <View style={[styles.flexRow, styles.gap2, styles.textSmall]}>
              <View style={[styles.gap1, styles.flexCol]}>
                <Text>Rental Price:</Text>
                <Text>Rental paid:</Text>
                <Text>Rental Income:</Text>
              </View>
              <View style={[styles.gap1, styles.flexCol]}>
                <Text>{numberToPrice(rentalIncome)}</Text>
                <Text>{RENTAL_PERIOD[rentalPeriod]}</Text>
                <Text>{numberToPrice(annualRentIncome)}</Text>
              </View>
            </View>
          </View>
        </View>
      </Layout>
    </Page>
  )
}

export default SummaryPage
