import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UiState {
  sidebarOpen: boolean
  searchQuery: string
  theme: 'dark' | 'light'
}

const initialState: UiState = {
  sidebarOpen: false,
  searchQuery: '',
  theme: 'dark',
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
    },
    setTheme: (state, action: PayloadAction<'dark' | 'light'>) => {
      state.theme = action.payload
    },
  },
})

export const { toggleSidebar, setSearchQuery, setTheme } = uiSlice.actions
export default uiSlice.reducer

