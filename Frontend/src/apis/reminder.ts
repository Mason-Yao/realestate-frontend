import axios from "axios"
import { logger } from "../../../Shared/Utils"
import { Reminder } from "../../../Shared/Interface/reminder"
import { CRM_API_URL } from "../utils"

const API_URL = `${CRM_API_URL}/reminder`

export const getReminders = async (): Promise<Reminder[]> => {
  return axios({
    method: "GET",
    url: API_URL,
  }).then((res) => {
    logger.debug(JSON.stringify(res.data))
    return res.data.reminders.items
  })
}

export const getReminder = async (id: string): Promise<Reminder> => {
  return axios({
    method: "GET",
    url: `${API_URL}/${id}`,
  }).then((res) => {
    return res.data.reminders.items[0]
  })
}

export const addReminder = async (name: string, createdBy?: string, lastModifiedDate?: string, description?: string, reference?: object): Promise<Reminder> => {
  return axios({
    method: "POST",
    url: API_URL,
    data: {
      name,
      createdBy,
      lastModifiedDate,
      description,
      reference,
    },
  }).then((res) => {
    return res.data
  })
}

export const updateReminder = async (
  id: string,
  name: string,
  createdBy: string,
  lastModifiedDate: string,
  description: string,
  reference: object
): Promise<Reminder> => {
  return axios({
    method: "PUT",
    url: API_URL,
    data: {
      id,
      name,
      createdBy,
      lastModifiedDate,
      description,
      reference,
    },
  }).then((res) => {
    return res.data
  })
}

export const deleteReminder = async (id: string): Promise<Reminder> => {
  return axios({
    method: "DELETE",
    url: `${API_URL}/${id}`,
  }).then((res) => {
    return res.data
  })
}
