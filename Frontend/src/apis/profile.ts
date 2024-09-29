import axios from "axios"
import { logger } from "../../../Shared/Utils"
import { Profile } from "../../../Shared/Interface/profile"
import { CRM_API_URL } from "../utils"

const API_URL = `${CRM_API_URL}/profile`

const token = localStorage.getItem("token")

export const getProfile = async (email: string): Promise<Profile> => {
  return axios({
    method: "POST",
    url: API_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      email: email,
    },
  }).then((res) => {
    logger.info("profile: " + JSON.stringify(res.data))
    return res.data
  })
}
