import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface ConfigState {
  isLoading: boolean
  banner: Banner
}

export const initialState: ConfigState = {
  isLoading: false,
  banner: {
    status: "",
    content: "",
  },
}

interface Banner {
  status: string
  content: string
}

const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setBanner: (state, action: PayloadAction<Banner>) => {
      state.banner = { ...state.banner, ...action.payload }
    },
  },
})

export default configSlice.reducer
export const { setIsLoading, setBanner } = configSlice.actions
