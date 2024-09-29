import { configureStore } from "@reduxjs/toolkit"
import { Store } from "redux"
import clientReducer from "../slices/clientSlice"
import userReducer from "../slices/userSlice"
import emailReducer from "../slices/emailSlice"
import configSlice from "../slices/configSlice"
import settingSlice from "../slices/settingSlice"
import propertySlice from "../slices/propertySlice"

import filesReducer from "../slices/reducers/filesSlice"
import { professionalsApiSlice } from "../slices/api/professionalsApiSlice"

const reducer = {
  client: clientReducer,
  user: userReducer,
  email: emailReducer,
  config: configSlice,
  setting: settingSlice,
  property: propertySlice,

  uploadFiles: filesReducer,
  [professionalsApiSlice.reducerPath]: professionalsApiSlice.reducer,
}
const store: Store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat([professionalsApiSlice.middleware])
  },
})

export default store
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
