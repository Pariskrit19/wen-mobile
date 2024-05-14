import { getAPIResponse } from 'utils/api/getApiResponse'
import { LOG_KEY, LOG_TYPE_KEY, decrypt } from 'utils/crypto'
import API from 'utils/api'
import { Apis } from 'services/api'

export const getAllTimeLogs = async ({
  page = '',
  sort = '',
  limit = '',
  fields = '',
  project = '',
  user = '',
  logType = '',
  isOt = '',
  otStatus = '',
  fromDate = '',
  toDate = '',
}) => {
  try {
    let response = await API.get(
      `${
        Apis.TimeLogs
      }?page=${page}&sort=${sort}&limit=${limit}&fields=${fields}&project=${project}&user=${user}&logType=${logType}&otStatus=${otStatus}&isOt=${isOt}${
        fromDate && toDate && `&logDate[gte]=${fromDate}&logDate[lte]=${toDate}`
      }`
    )
    return getAPIResponse({
      ...response,
      data: {
        ...response?.data,
        data: decrypt(response?.data?.data, LOG_KEY),
      },
    })
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}

export const getLogTypes = async () => {
  try {
    let response = await API.get(`${Apis.TimeLogs}/types`)
    return getAPIResponse({
      ...response,
      data: {
        ...response?.data,
        data: decrypt(response?.data?.data, LOG_TYPE_KEY),
      },
    })
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}
export const getWeeklyTimeLogs = async ({
  page = '',
  sort = '',
  limit = '',
  fields = '',
  project = '',
  user = '',
  logType = '',
}) => {
  try {
    let response = await API.get(
      `${Apis.TimeLogs}/users/weeklyLogs?page=${page}&sort=${sort}&limit=${limit}&fields=${fields}&project=${project}&user=${user}&logType=${logType}`
    )
    return getAPIResponse({
      ...response,
      data: {
        ...response?.data,
        data: decrypt(response?.data?.data, LOG_KEY),
      },
    })
  } catch (err) {
    return getAPIResponse(err.response)
  }
}

export const addProjectLogTime = async (payload: any) => {
  try {
    let response = await API.post(`${Apis.Projects}/${payload.id}/timelogs`, payload.details)
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}

export const addUserTimeLog = async (payload: any) => {
  try {
    let response = await API.post(`${Apis.TimeLogs}`, payload)
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}

export const updateTimeLog = async (payload: any) => {
  try {
    let response = await API.patch(`${Apis.TimeLogs}/${payload.id}`, payload.details)
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}

export const deleteTimeLog = async (logId: string) => {
  try {
    let response = await API.delete(`${Apis.TimeLogs}/${logId}`)
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}
