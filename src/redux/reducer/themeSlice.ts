import { createSlice } from '@reduxjs/toolkit'
import { systemMode } from 'helpers/constants'

interface InitialState {
  darkMode: boolean
}

const initialState: InitialState = { darkMode: false }

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme(state, action) {
      state.darkMode = action.payload
    },
  },
})

export default themeSlice.reducer

export const { toggleTheme } = themeSlice.actions
