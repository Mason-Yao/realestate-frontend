import axios from "axios"
import { EmailTemplate, TemplatesPagedPayload } from "../../../Shared/Interface/email"
import { logger } from "../../../Shared/Utils"
import { encode, CRM_API_URL } from "../utils"
import { CustomHeader } from "../../../Shared/Interface/payload"

const API_URL = `${CRM_API_URL}/template`

const token = localStorage.getItem("token")

export const listTemplates = async (isPaged?: boolean, page?: number, lastEvaluatedKey?: EmailTemplate): Promise<TemplatesPagedPayload> => {
  const headers: CustomHeader = {
    "x-pagination-per-page": 20,
    "x-pagination-current-page": page || 1,
    "x-pagination-enabled": isPaged || false,
  }

  let queryParameters
  if (lastEvaluatedKey) {
    const requestPayload = {
      ExclusiveStartKey: lastEvaluatedKey,
    }
    queryParameters = encode(JSON.stringify(requestPayload))
  }

  return axios({
    method: "GET",
    url: API_URL,
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
    params: {
      param: queryParameters,
    },
  }).then((res) => {
    logger.debug("templates: " + JSON.stringify(res.data.templates))
    return res.data.templates
  })
}

export const addTemplate = async (template: Omit<EmailTemplate, "PK" | "id">): Promise<string> => {
  return axios({
    method: "POST",
    url: API_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: JSON.stringify(template),
  }).then((res) => {
    return res.data
  })
}

export const deleteTemplate = async (id: string): Promise<string> => {
  return axios({
    method: "DELETE",
    url: `${API_URL}/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    return res.data
  })
}

export const bulkDeleteTemplates = async (templates: string[]): Promise<boolean> => {
  const deletePromises = templates.map((template) => {
    return deleteTemplate(template)
  })
  return Promise.all(deletePromises)
    .then((res) => {
      return true
    })
    .catch((err) => {
      logger.error(err)
      return false
    })
}

export const getTemplate = async (id: string): Promise<EmailTemplate> => {
  return axios({
    method: "GET",
    url: `${API_URL}/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    return res.data.templates.items[0]
  })
}

export const updateTemplate = async (id: string, template: Omit<EmailTemplate, "PK" | "id">): Promise<string> => {
  //logger.info(JSON.stringify(payload))
  return axios({
    method: "PUT",
    url: `${API_URL}/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: JSON.stringify(template),
  }).then((res) => {
    return res.data
  })
}

export const getTemplatesCount = async (): Promise<number> => {
  return axios({
    method: "GET",
    url: `${API_URL}/count`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    return res.data.count
  })
}
