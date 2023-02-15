import { configureStore } from '@reduxjs/toolkit'
import itemsApiReducer from './api/itemsApi'
import favoritesDataReducer from './features/favourites/favoritesDataSlice'

export const store = configureStore({
  reducer: {
    itemsApi: itemsApiReducer,
    favoritesData: favoritesDataReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({}).concat([])
})  
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch