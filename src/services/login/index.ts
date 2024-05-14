import { Apis } from 'services/api'
import instance from 'utils/api'
import API from 'utils/api'
import { getAPIResponse } from 'utils/api/getApiResponse'

const loginInUsers = async (loginDetail: any) => {
  try {
    let response = await API.post(`${Apis.Users}/login`, loginDetail)
    return getAPIResponse({
      ...response,
      data: { ...response.data, data: { ...response.data.data, token: response.data.token } },
    })
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}
const logoutUser = async () => {
  try {
    let response = await API.get(`${Apis.Users}/logout`)
    return getAPIResponse(response)
  } catch (err) {
    return getAPIResponse(err.response)
  }
}

const loginWithFingerprint = async (payload: any) => {
  try {
    let response = await API.post(`${Apis.Users}/loginWithBiometric`, { user: payload })
    return getAPIResponse({
      ...response,
      data: { ...response.data, data: { ...response.data.data, token: response.data.token } },
    })
  } catch (err) {
    return getAPIResponse(err.response)
  }
}
const storeExpoPushToken = async (payload: any) => {
  try {
    let response = await API.post(`${Apis.Users}/storePushToken`, payload)
    return getAPIResponse(response)
  } catch (err) {
    return getAPIResponse(err.response)
  }
}

export { loginInUsers, logoutUser, loginWithFingerprint, storeExpoPushToken }
