import axios from "axios"

const API_URL = "https://api.cyberlark.com.au"

interface stampDuty {
  first_home_grant: number
  mortgage: number
  transfer: number
  stamp_duty: number
  foreign_buyers_duty: number
}

const getURL = (
  state: string,
  investment_type: string,
  property_value: number,
  property_type: string,
  first_home_buyer: boolean,
  foreign_buyer: boolean
): string => {
  return `${API_URL}/housing/stampduty?state=${state}&investment_type=${investment_type}&property_value=${property_value}&property_type=${property_type}&first_home_buyer=${first_home_buyer}&foreign_buyer=${foreign_buyer}`
}

export const getStampDuty = async (
  state: string,
  investment_type: string,
  property_value: number,
  property_type: string,
  first_home_buyer: boolean,
  foreign_buyer: boolean
): Promise<stampDuty> => {
  console.log("Stamp duty API called")
  return axios.get(getURL(state, investment_type, property_value, property_type, first_home_buyer, foreign_buyer)).then((res) => {
    return res.data
  })
}
