import { AxiosResponse } from 'axios'

const getAPIResponse = (response: AxiosResponse) => {
  const status = response?.status === 200 || response?.status === 201 || response?.status === 204
  const res = response?.data
  return {
    status: status,
    message: res?.message,
    messageType: status ? 'Sucess' : 'Danger',
    data: res?.data,
  }
}

export { getAPIResponse }
