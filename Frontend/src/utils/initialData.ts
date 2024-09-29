import { AUS_STATE, Address, PROPERTY_SOURCE_TYPE, PROPERTY_STATUS, PROPERTY_TYPE, Property, ROOM_NUMBER } from "../../../Shared/Interface/property"
import { IProfessional } from "../interfaces/interfaces"
import { AutoCompleteAddress, LOAN_TYPE, RENTAL_PERIOD, ReportAnalysisData, ReportClientData, ReportTimelineData } from "../interfaces/properties"

export const initAddress: Address = {
  street: "",
  suburb: "",
  state: "NSW" as AUS_STATE,
  postcode: "",
}

export const initProperty: Property = {
  PK: "",
  id: "",
  address: initAddress,
  type: PROPERTY_TYPE.HOUSE,
  status: PROPERTY_STATUS.SELLING,
  sourceType: PROPERTY_SOURCE_TYPE.ESTABLISHED,
  cityCouncil: "",
  yearBuilt: 2000,
  coordinates: {
    lat: 0,
    lng: 0,
  },
  bathrooms: 1,
  bedrooms: 2,
  carSpaces: 1,
  houseArea: 0,
  landArea: 0,
  description: "",
  landPrice: 0, // for off plan property
  housePrice: 0,
  settlementTime: new Date().toISOString(),
  createdBy: "",
  createdDate: new Date().toISOString(),
  agent: "",
  solicitor: "",
  files: [],
  POIs: [],
}

export const initAutoCompleteAddress: AutoCompleteAddress = {
  number: "",
  route: "",
  suburb: "",
  council: "",
  state: "NSW" as AUS_STATE,
  postcode: "",
  coordinates: {
    lat: 0,
    lng: 0,
  },
  plain() {
    const number = this.number ? `${this.number}` : ""
    const route = this.route ? `${this.route}` : ""
    const suburb = this.suburb ? `${this.suburb}` : ""
    const postcode = this.postcode ? `${this.postcode}` : ""
    const state = this.state ? `${this.state}` : ""
    // ZT-NOTE: we can adjust the full address format here
    if (number && route && suburb) {
      return `${number} ${route}, ${suburb}, ${state} ${postcode}`
    } else {
      return ""
    }
  },
}

export const clientInitData: ReportClientData = {
  name: "",
  phone: "",
  email: "",
  foreignBuyer: false,
  firstHomeBuyer: false,
  investmentType: "investment",
}

export const analysisInitData: ReportAnalysisData = {
  eoi: 2000,
  firb: 12000,
  solicitorFee: 1500,
  inspectionFee: 800,
  otherFee: 0,
  deposit: 0,
  stampDuty: 0,
  transferFee: 0,
  foreignBuyersDuty: 0,
  firstHomeGrant: 0,
  mortgageFee: 0,
  loan: {
    loanAmount: 0,
    loanInterest: 5,
    loanType: LOAN_TYPE.PI,
    loanRatio: 80,
    monthlyRepayment: 0,
    monthlyInterest: 0,
  },
  cashflow: {
    rentalIncome: 0,
    rentalPeriod: RENTAL_PERIOD.Weekly,
    councilRate: 2000,
    insurance: 1500,
    bodyCorp: 0,
    repairs: 1500,
    waterCharge: 800,
    landTax: 0,
    pestControl: 200,
    fireAlarm: 100,
    otherCost: 0,
    managementRate: 5,
  },
}

export const timelineInitData: ReportTimelineData = {
  contractDate: new Date().toISOString(),
  coolingOffDate: new Date().toISOString(),
  subjectToFinanceDate: new Date().toISOString(),
  subjectToBuildingDate: new Date().toISOString(),
  settlementDate: new Date().toISOString(),
}

export const professionalsDemo: IProfessional[] = [
  { id: "1", name: "John Doe", roles: ["Lawyer"], phone: "0413125098", email: "justicjohn@gmail.com", languages: ["English", "Italian"] },
  { id: "2", name: "Jenny Hill", roles: ["Broker", "Lawyer"], phone: "0413124444", email: "jennyhill@gmail.com", languages: ["English", "Vietnamese"] },
  { id: "3", name: "Bob Johnson", roles: ["Agent", "Accountant"], phone: "0413122222", email: "bobbubble@gmail.com", languages: ["English", "Hindi"] },
  { id: "4", name: "David Dai", roles: ["Agent"], phone: "0413127777", email: "david777@gmail.com", languages: ["English", "Mandarin"] },
]

export const profFormIntiData = {
  id: "",
  name: "",
  roles: [""],
  phone: "",
  email: "",
  languages: [""],
}
