import AsyncStorage from '@react-native-async-storage/async-storage'
import { Apis } from 'services/api'
import instance from 'utils/api'
import API from 'utils/api'
import { getAPIResponse } from 'utils/api/getApiResponse'

const sendEmail = async (payload: { email: string; username: string }) => {
  try {
    let response = await API.post(`${Apis.Users}/createOtp`, payload)

    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}
const sendOtp = async (payload: { email: string; otp: string; otpId: string }) => {
  try {
    let response = await API.post(`${Apis.Users}/verifyOtp`, payload)

    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}

const createNewPassword = async (payload: {
  password: string
  passwordConfirm: string
  email: string
}) => {
  try {
    let response = await API.patch(`${Apis.Users}/updateMobilePassword`, payload)

    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}

const UpdateUserPassword = async (payload: {
  password: string
  passwordConfirm: string
  passwordCurrent: string
}) => {
  try {
    let response = await API.patch(`${Apis.Users}/updateMyPassword`, payload)
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err?.response)
  }
}

export { sendEmail, sendOtp, createNewPassword, UpdateUserPassword }
