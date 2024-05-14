import { createSlice } from '@reduxjs/toolkit'

export interface CommonInitialState {
  authUser: null | Object
}

const initialState: CommonInitialState = {
  authUser: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.authUser = action.payload
    },
  },
})

export const { setUserData } = authSlice.actions

export default authSlice.reducer
