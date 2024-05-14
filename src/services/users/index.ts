import { Apis } from 'services/api'
import API from 'utils/api'
import { getAPIResponse } from 'utils/api/getApiResponse'
import { USERS_KEY, USER_POSITION_TYPE_KEY, decrypt } from 'utils/crypto'

export const getAllUsers = async ({
  page = 1,
  sort = 'name',
  limit = 25,
  fields = '',
  name = '',
  role = '',
  position = '',
  positionType = '',
  active = 'true',
}) => {
  try {
    let response = await API.get(
      `${Apis.Users}?search=${name}&page=${page}&sort=${sort}&limit=${limit}&fields=${fields}&role=${role}&position=${position}&positionType=${positionType}&active=${active}`
    )
    return getAPIResponse({
      ...response,
      data: { ...response?.data, data: decrypt(response?.data?.data, USERS_KEY) },
    })
  } catch (err: any) {
    return getAPIResponse(err?.response)
  }
}

export const getUserPositionTypes = async () => {
  try {
    let response = await API.get(`${Apis.PositionTypes}`)
    return getAPIResponse({
      ...response,
      data: {
        ...response?.data,
        data: decrypt(response?.data?.data, USER_POSITION_TYPE_KEY),
      },
    })
  } catch (err: any) {
    return getAPIResponse(err?.response)
  }
}

export const getUser = async (id: string) => {
  try {
    let response = await API.get(`${Apis.Users}?_id=${id}`)
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err?.response)
  }
}
