import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit"
import { Client, GENDER, KNOWN_BY, VISA_STATUS, SOCIAL_MEDIA, ClientsPagedPayload, ClientEvaluatedKey, ClientFilter } from "../../../Shared/Interface/client"
import { Reminder } from "../../../Shared/Interface/reminder"

interface ClientState {
  pagedClients: Client[]
  previousKeys: ClientEvaluatedKey[] // Stack with array implementation
  currentPageKey?: ClientEvaluatedKey
  nextPageKey?: ClientEvaluatedKey
  currentPage: number
  currentClient: Client
  totalClients: number
  filter: ClientFilter | undefined
}

export interface SocialMediaNameUpdate {
  index: number
  value: SOCIAL_MEDIA
}

export interface SocialMediaValueUpdate {
  index: number
  value: string
}

const initialCurrentClient: Client = {
  PK: "Client",
  id: "",
  name: "",
  gender: undefined,
  email: "",
  phone: "",
  category: "",
  visa: VISA_STATUS.Unknown,
  dob: "",
  knownBy: KNOWN_BY.Friend,
  social: [],
  notes: "",
  relationships: undefined,
  properties: [],
  createdBy: "",
  lastModifiedDate: "",
  reminder: undefined,
}

const initialState: ClientState = {
  currentClient: initialCurrentClient,
  pagedClients: [],
  previousKeys: [],
  currentPage: 1,
  totalClients: 0,
  filter: undefined,
}

const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    setPagedClients: (state, action: PayloadAction<ClientsPagedPayload>) => {
      state.pagedClients = JSON.parse(JSON.stringify(action.payload.items))
    },
    pushPreviousKeys: (state, action: PayloadAction<ClientEvaluatedKey>) => {
      const key = action.payload
      if (!state.previousKeys.find((item) => item.id === key.id)) {
        state.previousKeys.push(key)
      }
    },
    popPreviousKey: (state) => {
      state.previousKeys.pop()
    },
    setCurrentPageKey: (state, action: PayloadAction<ClientEvaluatedKey>) => {
      state.currentPageKey = action.payload
    },
    setNextPageKey: (state, action: PayloadAction<ClientEvaluatedKey>) => {
      state.nextPageKey = action.payload
    },
    clearPagedKeys: (state) => {
      state.pagedClients = []
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
    setTotalClients: (state, action: PayloadAction<number>) => {
      state.totalClients = action.payload
    },
    setCurrent: (state, action: PayloadAction<Client>) => {
      state.currentClient = { ...state.currentClient, ...action.payload }
    },
    clearCurrent: (state) => {
      state.currentClient = initialCurrentClient
    },
    setCurrentName: (state, action: PayloadAction<string>) => {
      state.currentClient.name = action.payload
    },
    setCurrentDOB: (state, action: PayloadAction<string>) => {
      state.currentClient.dob = action.payload
    },
    setCurrentGender: (state, action: PayloadAction<GENDER>) => {
      state.currentClient.gender = action.payload
    },
    setCurrentEmail: (state, action: PayloadAction<string>) => {
      state.currentClient.email = action.payload
    },
    setCurrentPhone: (state, action: PayloadAction<string>) => {
      state.currentClient.phone = action.payload
    },
    setCurrentCategory: (state, action: PayloadAction<string>) => {
      state.currentClient.category = action.payload
    },
    setCurrentVisa: (state, action: PayloadAction<VISA_STATUS>) => {
      state.currentClient.visa = action.payload
    },
    setCurrentKnownBy: (state, action: PayloadAction<KNOWN_BY>) => {
      state.currentClient.knownBy = action.payload
    },
    addCurrentSocial: (state) => {
      return {
        ...state,
        currentClient: {
          ...state.currentClient,
          social: [...(state.currentClient.social as []), { name: SOCIAL_MEDIA.Wechat, value: "" }],
        },
      }
    },
    deleteCurrentSocial: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        currentClient: {
          ...state.currentClient,
          social: state.currentClient.social ? state.currentClient.social.filter((item, itemIndex) => itemIndex !== action.payload) : [],
        },
      }
    },
    //
    updateCurrentSocialName: (state, action: PayloadAction<SocialMediaNameUpdate>) => {
      if (state.currentClient.social) state.currentClient.social[action.payload.index].name = action.payload.value
    },
    updateCurrentSocialValue: (state, action: PayloadAction<SocialMediaValueUpdate>) => {
      if (state.currentClient.social) state.currentClient.social[action.payload.index].value = action.payload.value
    },
    setCurrentCreatedBy: (state, action: PayloadAction<string>) => {
      state.currentClient.createdBy = action.payload
    },
    setCurrentNotes: (state, action: PayloadAction<string>) => {
      state.currentClient.notes = action.payload
    },
    setCurrentReminder: (state, action: PayloadAction<Reminder>) => {
      state.currentClient.reminder = {
        ...state.currentClient.reminder,
        ...action.payload,
      }
    },
    setFilter: (state, action: PayloadAction<ClientFilter | undefined>) => {
      state.filter = action.payload
    },
    //Missing reducers for property, relation
  },
})

export default clientSlice.reducer
export const {
  setPagedClients,
  pushPreviousKeys,
  popPreviousKey,
  setCurrentPageKey,
  setNextPageKey,
  clearPagedKeys,
  incrementPage,
  decrementPage,
  setTotalClients,
  setCurrent,
  clearCurrent,
  setCurrentName,
  setCurrentDOB,
  setCurrentGender,
  setCurrentEmail,
  setCurrentPhone,
  setCurrentCategory,
  setCurrentVisa,
  setCurrentKnownBy,
  addCurrentSocial,
  deleteCurrentSocial,
  updateCurrentSocialName,
  updateCurrentSocialValue,
  setCurrentCreatedBy,
  setCurrentNotes,
  setCurrentReminder,
  setFilter,
} = clientSlice.actions
