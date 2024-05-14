import { createSlice } from '@reduxjs/toolkit'

export interface CommonInitialState {
  isPunchIn: Boolean
  lastPunchId?: string
  punchInTime?: string
  punchOutTime?: string
  totalWorkingHours?: number
  lastPunchIn?: string
  location?: string
}

const initialState: CommonInitialState = {
  isPunchIn: false,
  lastPunchId: undefined,
  punchInTime: undefined,
  punchOutTime: undefined,
  totalWorkingHours: undefined,
  lastPunchIn: undefined,
  location: undefined,
}

const attendanceSlice = createSlice({
  name: 'attendance',
  initialState,
  reducers: {
    setPunchInDatas: (state, action) => {
      state.isPunchIn = action.payload.isPunchIn
      state.lastPunchId = action.payload.lastPunchId
      state.punchInTime = action.payload.punchInTime
      state.punchOutTime = action.payload.punchOutTime
      state.totalWorkingHours = action.payload.totalWorkingHours
      state.lastPunchIn = action.payload.lastPunchIn
      state.location = action.payload.location
    },
    // setUserLocation: (state, action) => {
    // },
  },
})

export const { setPunchInDatas } = attendanceSlice.actions

export default attendanceSlice.reducer
