import { configureStore } from '@reduxjs/toolkit'
import itemsApiReducer from './api/itemsApi'

export const store = configureStore({
  reducer: {
    itemsApi: itemsApiReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({}).concat([])
})  
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch