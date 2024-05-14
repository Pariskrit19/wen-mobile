import { Apis } from 'services/api'
import API from 'utils/api'
import { getAPIResponse } from 'utils/api/getApiResponse'
import { USERS_KEY, decrypt } from 'utils/crypto'

const getAllUsers = async ({
  page = '',
  sort = 'name',
  limit = '',
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

export { getAllUsers }
