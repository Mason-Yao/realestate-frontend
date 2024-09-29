import axios, { AxiosHeaders } from "axios"
import { CRM_JR_API_URL } from "../utils"

const API_URL = CRM_JR_API_URL
const token = localStorage.getItem("token")

export const getUploadPresignedUrl = async (numOfUrlRequests: number = 1) => {
  return axios({
    method: "GET",
    url: `${API_URL}/file/upload?numOfUrlRequests=${numOfUrlRequests}`,
  }).then((res) => {
    return res.data
  })
}

export const directUploadToS3 = async (url: string, body: File) => {
  return axios({
    method: "PUT",
    url: url,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: body,
  })
}

export const deleteFromS3 = async (path: string) => {
  return axios({
    method: "DELETE",
    url: `${API_URL}/file/${path}`,
  }).then((res) => {
    return res.data
  })
}
