import axios, { AxiosHeaders } from "axios"
import { PropertiesPagedPayload, Property, PropertyFilter } from "../../../Shared/Interface/property"
import { CustomHeader } from "../../../Shared/Interface/payload"
import { logger } from "../../../Shared/Utils"
import { CRM_JR_API_URL, encode } from "../utils"

const API_URL = `${CRM_JR_API_URL}`
const token = localStorage.getItem("token")

const removeEmptyAttributes = (property: Omit<Property, "PK" | "id">) => {
  /*
    Empty string check: PK, id, cityCouncil, description, agent, solicitor
    zero value check: landArea, buildsArea, landPrice, housePrice
    Array length check: POIs, files
  */
  const cleanedProperty = { ...property }

  Object.keys(cleanedProperty).forEach((key) => {
    if (cleanedProperty[key] === "" || cleanedProperty[key] === undefined || cleanedProperty[key]?.length === 0) {
      delete cleanedProperty[key]
    }
  })
  return cleanedProperty
}

export const listProperties = async (
  isPaged?: boolean,
  page?: number,
  lastEvaluatedKey?: Property,
  filter?: PropertyFilter
): Promise<PropertiesPagedPayload> => {
  const headers: CustomHeader = {
    "x-pagination-per-page": 20,
    "x-pagination-current-page": page || 1,
    "x-pagination-enabled": isPaged || false,
  }

  let param = {}
  if (lastEvaluatedKey) {
    param = { ...param, lastEvaluatedKey }
  }
  if (filter) {
    param = { ...param, filter }
  }

  return axios({
    method: "GET",
    url: `${API_URL}/property`,
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
    params: {
      param: encode(JSON.stringify(param)),
    },
  }).then((res) => {
    logger.debug("properties: " + JSON.stringify(res.data.properties))
    return res.data.properties
  })
}

export const addProperty = async (property: Omit<Property, "PK" | "id">): Promise<string> => {
  const payload = removeEmptyAttributes(property)
  logger.info(JSON.stringify(payload))
  return axios({
    method: "POST",
    url: `${API_URL}/property`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: JSON.stringify(payload),
  }).then((res) => {
    return res.data.properties.items[0]
  })
}

export const editProperty = async (id: string, property: Omit<Property, "PK" | "id">): Promise<string> => {
  const payload = removeEmptyAttributes(property)

  return axios({
    method: "PUT",
    url: `${API_URL}/property/${id}`,
    data: JSON.stringify(payload),
  }).then((res) => {
    return res.data.properties.items[0]
  })
}

export const getProperty = async (id: string): Promise<Property> => {
  return axios({
    method: "GET",
    url: `${API_URL}/property/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    return res.data.properties.items[0]
  })
}

export const deleteProperty = async (id: string): Promise<string> => {
  return axios({
    method: "DELETE",
    url: `${API_URL}/property/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    return res.data
  })
}

export const getPropertiesCount = async (): Promise<number> => {
  return axios({
    method: "GET",
    url: `${API_URL}/property/count`,
  }).then((res) => {
    return res.data.count
  })
}
