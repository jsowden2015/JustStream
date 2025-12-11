import { configureStore } from '@reduxjs/toolkit'
import contentReducer from './slices/contentSlice'
import playerReducer from './slices/playerSlice'
import uiReducer from './slices/uiSlice'

export const store = configureStore({
  reducer: {
    content: contentReducer,
    player: playerReducer,
    ui: uiReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

