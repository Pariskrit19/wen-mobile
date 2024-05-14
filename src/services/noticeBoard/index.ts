import { Apis } from 'services/api'
import API from 'utils/api'
import { getAPIResponse } from 'utils/api/getApiResponse'

interface NoticeProps {
  page?: string
  sort?: string
  limit?: string
  fields?: string
  search?: string
  endDate?: string
  startDate?: string
}

const getAllNotices = async ({
  page = '',
  sort = '',
  limit = '',
  fields = '',
  search = '',
  endDate = '',
  startDate = '',
}: NoticeProps) => {
  try {
    let response = await API.get(
      `${Apis.NoticeBoard}?page=${page}&sort=${sort}&limit=${limit}&fields=${fields}&search=${search}&startDate=${startDate}&endDate=${endDate}`
    )
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err?.response)
  }
}

export { getAllNotices }
