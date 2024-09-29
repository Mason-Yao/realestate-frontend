import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { EmailTemplate } from "../../../Shared/Interface/email"
import { TemplatesPagedPayload } from "../../../Shared/Interface/email"

interface EmailState {
  allTemplates: EmailTemplate[]
  pagedTemplates: EmailTemplate[]
  previousKeys: EmailTemplate[] // Stack with array implementation
  currentPageKey?: EmailTemplate
  nextPageKey?: EmailTemplate
  currentPage: number
  currentTemplate: EmailTemplate
  totalTemplates: number
}

const initialCurrentTemplate: EmailTemplate = {
  PK: "Template",
  id: "",
  name: "",
  subject: "",
  template: "",
  createdBy: "",
}

export const initialState: EmailState = {
  allTemplates: [],
  pagedTemplates: [],
  previousKeys: [],
  currentPage: 1,
  currentTemplate: initialCurrentTemplate,
  totalTemplates: 0,
}

const emailSlice = createSlice({
  name: "email",
  initialState,
  reducers: {
    setAllTemplates: (state, action: PayloadAction<TemplatesPagedPayload>) => {
      state.allTemplates = JSON.parse(JSON.stringify(action.payload.items))
    },
    setPagedTemplates: (state, action: PayloadAction<TemplatesPagedPayload>) => {
      state.pagedTemplates = JSON.parse(JSON.stringify(action.payload.items))
    },
    pushPreviousKeys: (state, action: PayloadAction<EmailTemplate>) => {
      const key = action.payload
      if (!state.previousKeys.find((item) => item.id === key.id)) {
        state.previousKeys.push(key)
      }
    },
    popPreviousKey: (state) => {
      state.previousKeys.pop()
    },
    setCurrentPageKey: (state, action: PayloadAction<EmailTemplate>) => {
      state.currentPageKey = action.payload
    },
    setNextPageKey: (state, action: PayloadAction<EmailTemplate>) => {
      state.nextPageKey = action.payload
    },
    clearPagedKeys: (state) => {
      state.pagedTemplates = []
      state.previousKeys = []
      state.currentPageKey = undefined
      state.nextPageKey = undefined
      state.currentPage = 1
    },
    incrementPage: (state) => {
      state.currentPage += 1
    },
    decrementPage: (state) => {
      state.currentPage -= 1
    },
    setTotalTemplates: (state, action: PayloadAction<number>) => {
      state.totalTemplates = action.payload
    },
    setCurrentTemplate: (state, action: PayloadAction<EmailTemplate>) => {
      state.currentTemplate = action.payload
    },
    clearCurrentTemplate: (state) => {
      state.currentTemplate = initialCurrentTemplate
    },
    setCurrentName: (state, action: PayloadAction<string>) => {
      state.currentTemplate.name = action.payload
    },
    setCurrentSubject: (state, action: PayloadAction<string>) => {
      state.currentTemplate.subject = action.payload
    },
    setCurrentEditorData: (state, action: PayloadAction<string>) => {
      state.currentTemplate.template = action.payload
    },
    setCurrentCreatedBy: (state, action: PayloadAction<string>) => {
      state.currentTemplate.createdBy = action.payload
    },
  },
})

export default emailSlice.reducer
export const {
  setAllTemplates,
  setPagedTemplates,
  pushPreviousKeys,
  popPreviousKey,
  setCurrentPageKey,
  setNextPageKey,
  clearPagedKeys,
  incrementPage,
  decrementPage,
  setTotalTemplates,
  setCurrentTemplate,
  clearCurrentTemplate,
  setCurrentName,
  setCurrentSubject,
  setCurrentEditorData,
  setCurrentCreatedBy,
} = emailSlice.actions
