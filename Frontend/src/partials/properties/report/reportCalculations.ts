import { RENTAL_PERIOD, ReportAnalysisData } from "../../../interfaces/properties"

export const getUpfrontCost = (data: ReportAnalysisData): number => {
  const { eoi, firb, solicitorFee, inspectionFee, otherFee, deposit, stampDuty, transferFee, foreignBuyersDuty, mortgageFee } = data
  return eoi + firb + solicitorFee + inspectionFee + otherFee + deposit + stampDuty + transferFee + foreignBuyersDuty + mortgageFee
}

export const getYearlyCashflow = (data: ReportAnalysisData): number => {
  return getYearlyRentalIncome(data) - getYearlyTotalCost(data)
}

export const getYearlyTotalCost = (data: ReportAnalysisData): number => {
  return data.loan.monthlyRepayment * 12 + getYearlyMaintenanceCost(data)
}

export const getYearlyMaintenanceCost = (data: ReportAnalysisData): number => {
  const { councilRate, insurance, bodyCorp, repairs, waterCharge, landTax, pestControl, fireAlarm, otherCost } = data.cashflow
  return councilRate + insurance + bodyCorp + repairs + waterCharge + landTax + pestControl + fireAlarm + otherCost + getYearlyRentalManagementFee(data)
}

export const getYearlyRentalManagementFee = (data: ReportAnalysisData): number => {
  return (getYearlyRentalIncome(data) * data.cashflow.managementRate) / 100
}

export const getYearlyRentalIncome = (data: ReportAnalysisData): number => {
  const { rentalIncome, rentalPeriod } = data.cashflow

  switch (rentalPeriod) {
    case RENTAL_PERIOD.Weekly:
      return rentalIncome * 52
    case RENTAL_PERIOD.Fortnightly:
      return rentalIncome * 26
    case RENTAL_PERIOD.Monthly:
      return rentalIncome * 12
  }
}
