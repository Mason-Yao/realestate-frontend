import resolveConfig from "tailwindcss/resolveConfig"
import tailwindCssConfig from "../css/tailwind.config"
import { Buffer } from "buffer"

export const tailwindConfig = () => {
  // Tailwind config
  // @ts-ignore: Type from imported library
  return resolveConfig("./src/css/tailwind.config")
}

export const hexToRGB = (h) => {
  let r = "0"
  let g = "0"
  let b = "0"
  if (h.length === 4) {
    r = `0x${h[1]}${h[1]}`
    g = `0x${h[2]}${h[2]}`
    b = `0x${h[3]}${h[3]}`
  } else if (h.length === 7) {
    r = `0x${h[1]}${h[2]}`
    g = `0x${h[3]}${h[4]}`
    b = `0x${h[5]}${h[6]}`
  }
  return `${+r},${+g},${+b}`
}

export const formatValue = (value: number | bigint) =>
  Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumSignificantDigits: 3,
    notation: "compact",
  }).format(value)

export const formatThousands = (value: number | bigint) =>
  Intl.NumberFormat("en-US", {
    maximumSignificantDigits: 3,
    notation: "compact",
  }).format(value)

// Validates that the input string is a valid date formatted as "dd/mm/yyyy"
export const isValidDate = (dateString) => {
  // First check for the pattern
  if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString)) return false

  // Parse the date parts to integers
  var parts = dateString.split("/")
  var day = parseInt(parts[0], 10)
  var month = parseInt(parts[1], 10)
  var year = parseInt(parts[2], 10)

  // Check the ranges of month and year
  if (year < 1000 || year > 3000 || month == 0 || month > 12) return false

  var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

  // Adjust for leap years
  if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)) monthLength[1] = 29

  // Check the range of the day
  return day > 0 && day <= monthLength[month - 1]
}

export const encode = (str: string): string => Buffer.from(str, "utf8").toString("base64")

export const decode = (str: string): string => Buffer.from(str, "base64").toString("utf8")

/**
Need to run the following command to set environment variables in local to connect to DEV backend.
export CRM_API_URL="https://api-crm-dev.cyberlark.com.au"
  */
export const CRM_API_URL = process.env.CRM_API_URL || "https://api-crm-dev.cyberlark.com.au"
// temporary JR Backend url
export const CRM_JR_API_URL = process.env.CRM_JR_API_URL || "https://3oib51otce.execute-api.ap-southeast-2.amazonaws.com/prod"
