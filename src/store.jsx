import { configureStore } from '@reduxjs/toolkit'
import counterSlice from './Utils/Services/counterSlice'

export const store = configureStore({
  reducer: {
    myCounter: counterSlice,
  },
})