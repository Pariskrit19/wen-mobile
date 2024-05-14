import { Apis } from 'services/api'
import API from 'utils/api'
import { getAPIResponse } from 'utils/api/getApiResponse'

export const getNotifications = async ({
  page = 1,
  sort = '',
  limit = 10,
  fields = '',
  role = '',
  userId = '',
  joinDate = '',
}) => {
  try {
    let response = await API.get(
      `${Apis.Notification}/get-available-notifications?page=${page}&sort=${sort}&limit=${limit}&fields=${fields}&role=${role}&userId=${userId}&joinDate=${joinDate}`
    )
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err?.response)
  }
}

export const deleteNotification = async ({
  role = '',
  userId = '',
  notificationId,
}: {
  role: string
  userId: string
  notificationId: number
}) => {
  try {
    let response = await API.delete(
      `${Apis.Notification}/delete-notification?notificationId=${notificationId}&role=${role}&userId=${userId}`
    )
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err?.response)
  }
}
