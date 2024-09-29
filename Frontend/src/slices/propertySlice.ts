import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Property } from "../../../Shared/Interface/property"
import { PropertiesPagedPayload, PropertyFilter } from "../../../Shared/Interface/property"

interface PropertyState {
  allProperties: Property[]
  pagedProperties: Property[]
  previousKeys: Property[] // Stack with array implementation
  currentPageKey?: Property
  nextPageKey?: Property
  currentPage: number
  totalProperties: number
  filter: PropertyFilter
}

export const initialState: PropertyState = {
  allProperties: [],
  pagedProperties: [],
  previousKeys: [],
  currentPage: 1,
  totalProperties: 0,
  filter: {},
}

const propertySlice = createSlice({
  name: "property",
  initialState,
  reducers: {
    setAllProperties: (state, action: PayloadAction<PropertiesPagedPayload>) => {
      state.allProperties = JSON.parse(JSON.stringify(action.payload.items))
    },
    setPagedProperties: (state, action: PayloadAction<PropertiesPagedPayload>) => {
      state.pagedProperties = JSON.parse(JSON.stringify(action.payload.items))
    },
    pushPreviousKeys: (state, action: PayloadAction<Property>) => {
      const key = action.payload
      if (!state.previousKeys.find((item) => item.id === key.id)) {
        state.previousKeys.push(key)
      }
    },
    popPreviousKey: (state) => {
      state.previousKeys.pop()
    },
    setCurrentPageKey: (state, action: PayloadAction<Property>) => {
      state.currentPageKey = action.payload
    },
    setNextPageKey: (state, action: PayloadAction<Property>) => {
      state.nextPageKey = action.payload
    },
    clearPagedKeys: (state) => {
      state.pagedProperties = []
      state.previousKeys = []
      state.currentPageKey = undefined
      state.nextPageKey = undefined
      state.currentPage = 1
    },
    clearPagedKeysWhenFilterApplied: (state) => {
      state.previousKeys = []
      state.currentPageKey = undefined
      state.currentPage = 1
    },
    incrementPage: (state) => {
      state.currentPage += 1
    },
    decrementPage: (state) => {
      state.currentPage -= 1
    },
    setTotalProperties: (state, action: PayloadAction<number>) => {
      state.totalProperties = action.payload
    },
    setPropertyFilter: (state, action: PayloadAction<PropertyFilter>) => {
      state.filter = action.payload
    },
  },
})

export default propertySlice.reducer
export const {
  setAllProperties,
  setPagedProperties,
  pushPreviousKeys,
  popPreviousKey,
  setCurrentPageKey,
  setNextPageKey,
  clearPagedKeys,
  clearPagedKeysWhenFilterApplied,
  incrementPage,
  decrementPage,
  setTotalProperties,
  setPropertyFilter,
} = propertySlice.actions
