import axios from "axios"
import { EmailServiceRequest } from "../../../Shared/Interface/email"
import { logger } from "../../../Shared/Utils"
import { CRM_API_URL } from "../utils"

const API_URL = `${CRM_API_URL}/marketing`

const token = localStorage.getItem("token")

export const sendEmail = async (subject: string, sender: string, receivers: string[], content: string) => {
  const payload: EmailServiceRequest = {
    subject: subject,
    sender: sender,
    receivers: receivers,
    content: content,
  }
  logger.info("Send Email Payload: " + JSON.stringify(payload))
  return axios({
    method: "POST",
    url: API_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: payload,
  }).then((res) => {
    return res
  })
}
