import axios from 'axios'
import { Apis } from 'services/api'
import API from 'utils/api'
import { getAPIResponse } from 'utils/api/getApiResponse'
import { ATTENDANCE_KEY, CONFIGURATION_KEY, decrypt } from 'utils/crypto'

export const searchAttendacentOfUser = async ({
  userId = '',
  fromDate = '',
  toDate = '',
  page = '',
  sort = '',
  limit = '',
  fields = '',
  officehourop = '',
  officehourValue = '',
}: {
  userId?: any
  fromDate?: any
  toDate?: any
  page?: number | any
  sort?: any
  limit?: number | any
  fields?: any
  officehourop?: any
  officehourValue?: any
}) => {
  try {
    let response
    if (officehourop && officehourValue >= 0) {
      response = await API.get(
        `${Apis.Attendances}/search?user=${userId}&fromDate=${fromDate}&toDate=${toDate}&page=${page}&sort=${sort}&limit=${limit}&fields=${fields}&officehour[${officehourop}]=${officehourValue}`
      )
    } else {
      response = await API.get(
        `${Apis.Attendances}/search?user=${userId}&fromDate=${fromDate}&toDate=${toDate}&page=${page}&sort=${sort}&limit=${limit}&fields=${fields}`
      )
    }

    return getAPIResponse({
      ...response,
      data: {
        ...response?.data,
        data: decrypt(response?.data?.data, ATTENDANCE_KEY),
      },
    })
  } catch (err: any) {
    return getAPIResponse(err?.response)
  }
}

export const getMaintenance = async () => {
  try {
    let response = await API.get(`${Apis.Configurations}`)
    return getAPIResponse({
      ...response,
      data: {
        ...response?.data,
        data: decrypt(response?.data?.data, CONFIGURATION_KEY),
      },
    })
  } catch (err: any) {
    return getAPIResponse(err?.response)
  }
}

export const addAttendance = async (attendance: any) => {
  try {
    let response = await API.post(`${Apis.Attendances}`, attendance)
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err?.response)
  }
}

export const updatePunchout = async (userId: any, payload: any) => {
  try {
    let response = await API.patch(`${Apis.Attendances}/${userId}/punchout`, payload)
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err?.response)
  }
}

export const getLocationName = async (lat?: number, long?: number) => {
  const data = await axios.get(
    // `https://api.mapbox.com/geocoding/v5/mapbox.places/85.322921,27.659583.json?types=poi&access_token=pk.eyJ1IjoibXVrZXNoMDcwMiIsImEiOiJjbG5jazV6MHkwaXJpMnBuem5yeGdvZXZ3In0.Cku1ep6iek-UhvW_GNoq6g`
    `https:discover.search.hereapi.com/v1/discover?at=0,-0&q=${lat},${long}&apiKey=X9CQ5qWeqUjTn5t7Dwtscjj28dvZsTMNW8ErAX7psac`
  )
  return data?.data?.items?.[0]
}
