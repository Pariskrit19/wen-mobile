import { Apis } from 'services/api'
import API from 'utils/api'
import { getAPIResponse } from 'utils/api/getApiResponse'

const getBirthMonthUsers = async () => {
  try {
    let response = await API.get(`${Apis.Users}/birthday`)
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err?.response)
  }
}

const getFutureLeaves = async () => {
  try {
    let response = await API.get(`${Apis.Leaves}/users/futureLeaves`)
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err?.response)
  }
}

const getWeeklyNotices = async () => {
  try {
    let response = await API.get(`${Apis.NoticeBoard}/weekNotices`)
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err?.response)
  }
}

const getAllHolidays = async ({ page = '', limit = '', sort = '' }) => {
  try {
    let response = await API.get(
      `${Apis.Resources}/holidays/?page=${page}&limit=${limit}&sort=${sort}`
    )
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}

const updateProfile = async (payload: any) => {
  try {
    let response = await API.patch(`${Apis.Profile}`, payload)
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err?.response)
  }
}

export { getBirthMonthUsers, getFutureLeaves, getWeeklyNotices, getAllHolidays, updateProfile }
