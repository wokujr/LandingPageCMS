import { configureStore } from "@reduxjs/toolkit"
import counterReducer from "./features/counter/counterSlice"
import sessionReducer from "./features/sessions/sessionSlice"

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    session: sessionReducer
  }
})
