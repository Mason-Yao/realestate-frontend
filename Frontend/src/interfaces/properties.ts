import { AUS_STATE } from "../../../Shared/Interface/property"

// auto complete relevant
export interface AutoCompleteAddress {
  number: string
  route: string
  suburb: string
  council: string
  state: AUS_STATE
  postcode: string
  coordinates: {
    lat: number
    lng: number
  }
  plain(): string
}

// export interface ReportData {
//   client: ReportClientData
//   property: ReportPropertyData
// }

export enum LOAN_TYPE {
  PI = "pi",
  IO = "io",
}

export enum RENTAL_PERIOD {
  Weekly = "Weekly",
  Fortnightly = "Fortnightly",
  Monthly = "Monthly",
}

export interface Loan {
  loanAmount: number
  loanInterest: number
  loanType: LOAN_TYPE
  loanRatio: number
  monthlyRepayment: number
  monthlyInterest: number
}

export interface Cashflow {
  rentalIncome: number
  rentalPeriod: RENTAL_PERIOD
  councilRate: number
  insurance: number
  bodyCorp: number
  repairs: number
  waterCharge: number
  landTax: number
  pestControl: number
  fireAlarm: number
  otherCost: number
  managementRate: number
}

export interface ReportClientData {
  name: string
  phone: string
  email: string
  foreignBuyer: boolean
  firstHomeBuyer: boolean
  investmentType: "investment" | "residence"
}

export interface ReportAnalysisData {
  eoi: number
  firb: number
  solicitorFee: number
  inspectionFee: number
  otherFee: number
  deposit: number
  stampDuty: number
  transferFee: number
  foreignBuyersDuty: number
  firstHomeGrant: number
  mortgageFee: number
  loan: Loan
  cashflow: Cashflow
}

export interface ReportTimelineData {
  contractDate: string
  coolingOffDate: string
  subjectToFinanceDate: string
  subjectToBuildingDate: string
  settlementDate: string
}

// export interface NearbyPlace {
//   place_id: string
//   name: string
//   coordinates: {
//     lat: number
//     lng: number
//   }
//   address: string
//   types: string[]
//   rating?: number
//   user_ratings_total?: number
//   distance?: string
//   duration?: string
// }
