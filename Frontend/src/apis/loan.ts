import axios from "axios"

const API_URL = "https://api.cyberlark.com.au"

interface Repayments {
  input: {
    amount: number
    frequency: string
    rate: number
    term: number
    type: string
  }
  interest: number
  repayments: number
}

const getURL = (amount: number, rate: number, type: string): string => {
  return `${API_URL}/banking/loan?amount=${amount}&rate=${rate}&type=${type}&term=30&frequency=monthly`
}

export const getRepayments = async (amount: number, rate: number, type: string): Promise<Repayments> => {
  console.log("loan API called")

  const config = {
    headers: {
      //Authentication: `Bearer ${getEncryptedAPIKey(type)}`, // Example - todo remove
    },
  }
  //return { input: { amount: 0, frequency: "", rate: 0, term: 0, type: "" }, interest: 0, repayments: 0 }
  return axios.get(getURL(amount, rate, type), config).then((res) => {
    return res.data
  })
}
