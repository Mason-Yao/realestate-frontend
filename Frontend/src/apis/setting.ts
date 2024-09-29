import axios from "axios"
import { logger } from "../../../Shared/Utils"
import { Settings } from "../../../Shared/Interface/settings"
import { CRM_API_URL } from "../utils"

const API_URL = `${CRM_API_URL}/settings`

export const getSettings = async (): Promise<Settings[]> => {
  return axios({
    method: "GET",
    url: API_URL,
  }).then((res) => {
    logger.debug(JSON.stringify(res.data))
    return res.data.settings
  })
}

export const addSetting = async (name: string, value: string): Promise<Settings> => {
  return axios({
    method: "POST",
    url: API_URL,
    data: {
      name,
      value,
    },
  }).then((res) => {
    return res.data
  })
}

export const updateSetting = async (name: string, value: string): Promise<Settings> => {
  return axios({
    method: "PUT",
    url: API_URL,
    data: {
      name,
      value,
    },
  }).then((res) => {
    return res.data
  })
}

export const bulkUpdateSettings = async (settings: Settings[]): Promise<boolean> => {
  const updatePromises = settings.map((setting) => {
    return updateSetting(setting.name, setting.value)
  })
  return Promise.all(updatePromises)
    .then((res) => {
      return true
    })
    .catch((err) => {
      logger.error(err)
      return false
    })
}

export const deleteSetting = async (name: string): Promise<Settings> => {
  return axios({
    method: "DELETE",
    url: `${API_URL}/${name}`,
  }).then((res) => {
    return res.data
  })
}

export const getAPIVersion = async (): Promise<string> => {
  return axios({
    method: "GET",
    url: `${CRM_API_URL}/version`,
  }).then((res) => {
    return res.data.version
  })
}
