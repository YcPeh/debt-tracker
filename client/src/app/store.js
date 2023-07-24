import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/user/userSlice'
import transactionReducer from '../features/transaction/transactionSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    transaction: transactionReducer,
  },
})