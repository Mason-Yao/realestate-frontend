import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Settings, DEFAULT_SETTINGS } from "../../../Shared/Interface/settings"

interface SettingRequest {
  value: string
  name: string
}

interface SettingState {
  [DEFAULT_SETTINGS.RMBCurrency]?: Settings
  [DEFAULT_SETTINGS.ClientsPageSize]?: Settings
  [DEFAULT_SETTINGS.PriceUnit]?: Settings
}

export const initialState: SettingState = {
  [DEFAULT_SETTINGS.RMBCurrency]: undefined,
  [DEFAULT_SETTINGS.ClientsPageSize]: undefined,
  [DEFAULT_SETTINGS.PriceUnit]: undefined,
}

const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    loadSettings: (state, action: PayloadAction<Settings[]>) => {
      //Remove all settings and add new ones
      Object.keys(state).forEach((key) => {
        delete state[key]
      })
      action.payload.map((setting) => {
        state[setting.name] = setting
      })
    },
    updateSettingValue: (state, action: PayloadAction<SettingRequest>) => {
      state[action.payload.name].value = action.payload.value
    },
  },
})

export default settingSlice.reducer
export const { loadSettings, updateSettingValue } = settingSlice.actions
