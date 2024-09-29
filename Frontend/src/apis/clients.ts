import axios, { AxiosHeaders } from "axios"
import { Client, ClientEvaluatedKey, ClientFilter, ClientListParam, VISA_STATUS, ClientsPagedPayload } from "../../../Shared/Interface/client"
import { logger } from "../../../Shared/Utils"
import { CRM_API_URL, encode } from "../utils"
import { CustomHeader } from "../../../Shared/Interface/payload"

const API_URL = `${CRM_API_URL}/client`

const removeEmptyAttributes = (client: Omit<Client, "PK" | "id">) => {
  /*
    Empty string check: email, phone, lastEditDate, dob, notes, createdBy
    Undefined check: gender, relationships, reminder
    Unknown check: visa
    Array length check: social, properties
  */
  Object.keys(client).forEach((key) => {
    if (client[key] === "" || client[key] === undefined || client[key]?.length === 0 || client[key] === VISA_STATUS.Unknown) {
      delete client[key]
    }
  })
  return client
}

//fake
export const getClients = async (): Promise<Client[]> => {
  return axios.get("../../public/users.json").then((res) => {
    return res.data
  })
}

//fake
export const getRelationSearchResult = async (): Promise<[]> => {
  return axios.get("../../public/users.json").then((res) => {
    return res.data
  })
}

export const listClients = async (
  pageSize: number = 20,
  page: number = 1,
  lastEvaluatedKey?: ClientEvaluatedKey,
  filter?: ClientFilter
): Promise<ClientsPagedPayload> => {
  const headers: CustomHeader = {
    "x-pagination-per-page": pageSize,
    "x-pagination-current-page": page,
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
    url: API_URL,
    headers: headers as AxiosHeaders,
    params: {
      param: encode(JSON.stringify(param)),
    },
  }).then((res) => {
    logger.debug(res.data.clients)
    return res.data.clients
  })
}

export const addClient = async (client: Omit<Client, "PK" | "id">): Promise<string> => {
  let payload = removeEmptyAttributes(client)
  logger.info(JSON.stringify(payload))
  return axios({
    method: "POST",
    url: API_URL,
    data: JSON.stringify(payload),
  }).then((res) => {
    return res.data.clients.items[0]
  })
}

export const updateClient = async (id: string, client: Omit<Client, "PK" | "id">): Promise<string> => {
  let payload = removeEmptyAttributes(client)
  logger.info(JSON.stringify(payload))
  return axios({
    method: "PUT",
    url: `${API_URL}/${id}`,
    data: JSON.stringify(payload),
  }).then((res) => {
    return res.data.clients.items[0]
  })
}

export const getClient = async (id: string): Promise<Client> => {
  return axios({
    method: "GET",
    url: `${API_URL}/${id}`,
  }).then((res) => {
    return res.data.clients.items[0]
  })
}

export const deleteClient = async (id: string): Promise<Client[]> => {
  logger.info(`${API_URL}/${id}`)
  return axios({
    method: "DELETE",
    url: `${API_URL}/${id}`,
  }).then((res) => {
    return res.data
  })
}

export const bulkDeleteClients = async (clients: Client[]): Promise<boolean> => {
  const deletePromises = clients.map((client) => {
    return deleteClient(client.id)
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

export const searchClient = async (keyword: string): Promise<ClientsPagedPayload> => {
  logger.info(`Search for: ${keyword}`)
  return axios({
    method: "GET",
    url: `${API_URL}/search?keyword=${keyword}&scope=all`,
  }).then((res) => {
    return res.data.clients
  })
}

export const getClientsCount = async (): Promise<number> => {
  return axios({
    method: "GET",
    url: `${API_URL}/count`,
  }).then((res) => {
    return res.data.count
  })
}
