import { Apis } from 'services/api'
import API from 'utils/api'
import { getAPIResponse } from 'utils/api/getApiResponse'

type leaveuser = {
  id: string
  status?: string
  date?: string
  page?: number
  limit?: number
  fromDate?: string
  toDate?: string
  sort?: string
  type?: string
}

const getLeavesOfUser = async ({
  id,
  status = '',
  date,
  page = 1,
  limit = 30,
  fromDate = '',
  toDate = '',
  sort = '-leaveDates,_id',
  type = '',
}: leaveuser) => {
  try {
    let response = await API.get(
      `${
        Apis.Leaves
      }?user=${id}&page=${page}&sort=${sort}&limit=${limit}&leaveStatus=${status}&leaveDates=${
        date ?? ''
      }&fromDate=${fromDate}&toDate=${toDate}&leaveType=${type}`
    )
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err?.response)
  }
}

const getTodayLeaves = async () => {
  try {
    let response = await API.get(`${Apis.Leaves}/today`)
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err?.response)
  }
}

const getLeaveTypes = async () => {
  try {
    let response = await API.get(`${Apis.Leaves}/types`)
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err?.response)
  }
}

const getLeaveQuarter = async (year: any = '') => {
  try {
    let response = await API.get(
      `${Apis.Leaves}/quarters?sort=-createdAt&limit=1${
        year ? `&fiscalYear=${year}-01-01T00:00:00.000Z` : ''
      }`
    )
    return getAPIResponse(response)
  } catch (err) {
    return getAPIResponse(err?.response)
  }
}

const getTakenAndRemainingLeaveDaysOfUser = async (id: string) => {
  try {
    let response = await API.get(`${Apis.Leaves}/${id}/leavedays`)
    return getAPIResponse(response)
  } catch (err) {
    return getAPIResponse(err?.response)
  }
}

const getQuarters = async () => {
  try {
    let response = await API.get(`${Apis.Leaves}/quarters?sort=-createdAt&limit=1`)
    return getAPIResponse(response)
  } catch (err) {
    return getAPIResponse(err?.response)
  }
}
const getUserLeavesSummary = async ({ userId = '', fiscalYear = '', quarterId = '' }) => {
  try {
    let response = await API.get(
      `${Apis.Leaves}/userLeaves?userId=${userId}&fiscalYear=${fiscalYear}&quarterId=${quarterId}`
    )
    return getAPIResponse(response)
  } catch (err) {
    return getAPIResponse(err.response)
  }
}

const createLeave = async (payload: any) => {
  try {
    let response = await API.post(`${Apis.Leaves}`, payload)
    return getAPIResponse(response)
  } catch (err) {
    return getAPIResponse(err?.response)
  }
}

const sendEmailforLeave = async (payload: any) => {
  try {
    let response = await API.post(`${Apis.Leaves}/users/sendEmail`, payload)
    return getAPIResponse(response)
  } catch (err) {
    return getAPIResponse(err?.response)
  }
}

const changeLeaveStatus = async (
  id: string,
  statusType: string,
  reason = '',
  reapplyreason = ''
) => {
  try {
    let response = await API.patch(`${Apis.Leaves}/${id}/status/${statusType}`, {
      reason,
      reapplyreason,
    })
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err?.response)
  }
}

const updateLeave = async (payload: any) => {
  try {
    let response = await API.patch(`${Apis.Leaves}/${payload.id}`, payload.data)
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err?.response)
  }
}

export {
  getLeavesOfUser,
  getTodayLeaves,
  getLeaveTypes,
  getLeaveQuarter,
  getTakenAndRemainingLeaveDaysOfUser,
  getQuarters,
  getUserLeavesSummary,
  createLeave,
  changeLeaveStatus,
  updateLeave,
  sendEmailforLeave,
}
