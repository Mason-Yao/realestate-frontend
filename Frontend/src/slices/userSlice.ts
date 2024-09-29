import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Profile } from "../../../Shared/Interface/profile"

interface UserState {
  isValid: boolean
  name: string
  profile: Profile
}

export const initialState: UserState = {
  isValid: false,
  name: "",
  profile: {
    PK: "User",
    id: "",
    email: "",
    phone: "",
  },
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<UserState>) => {
      state.isValid = action.payload.isValid
      state.name = action.payload.name
      state.profile = action.payload.profile
    },
  },
})

export default userSlice.reducer
export const { setCurrentUser } = userSlice.actions
