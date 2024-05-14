import { createSlice } from '@reduxjs/toolkit'

export interface CommonInitialState {
  appLoading: boolean
  token: string
}

const initialState: CommonInitialState = {
  appLoading: true,
  token: '',
}

const initialSlice = createSlice({
  name: 'initial',
  initialState,
  reducers: {
    toggleAppLoading: (state) => {
      state.appLoading = !state.appLoading
    },
    setToken: (state, action) => {
      state.token = action.payload
    },
  },
})

export const { toggleAppLoading, setToken } = initialSlice.actions

export default initialSlice.reducer
