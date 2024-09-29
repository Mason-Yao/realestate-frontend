export enum AddClientStep {
  BasicInfo = 1,
  AdvancedInfo = 2,
  Finish = 3,
}

export enum ReportBuilderStep {
  ClientSection = 1,
  PropertySection = 2,
  AnalysisSection = 3,
  TimelineSection = 4,
  ProfessionalsSection = 5,
  ReportPDF = 6,
}

export enum Color {
  Transparent = "#FFFFFF",
}

export enum DATE_FILTER_CONDITION {
  WithinOneDay = "Updated since yesterday",
  WithinOneWeek = "Updated since last week",
  WithinOneMonth = "Updated since last month",
  WithinThreeMonths = "Updated since last 3 months",
  WithinSixMonths = "Updated since last 6 months",
  WithinOneYear = "Updated since last 12 months",
}

export enum BIRTHDAY_FILTER_CONDITION {
  Today = "Today",
  ThisWeek = "This week",
  ThisMonth = "This month",
}

export const tablePageSize = 20

export interface IFile {
  url: string
  fileName: string
  isPublic: boolean
  isCoverPage: boolean
  fileCategory: "image" | "document" | "video" | "others"
  tags: string[]
}

export interface IProfessional {
  id: string
  name: string
  roles: string[]
  phone: string
  email: string
  languages: string[]
}

export enum PROPERTY_STATE {
  NSW = "NSW",
  VIC = "VIC",
  QLD = "QLD",
  SA = "SA",
  WA = "WA",
  ACT = "ACT",
  TAS = "TAS",
  NT = "NT",
}

// we get this shape for building file request body later
export interface IPreparedFile {
  fileSrc: string
  file: File
}
