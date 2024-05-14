import AsyncStorage from '@react-native-async-storage/async-storage'
import axios, { InternalAxiosRequestConfig } from 'axios'
import { Env } from '../../env'
import store from 'redux/store'
import { setToken } from 'redux/reducer/initialLoadingSlice'
import { setPunchInDatas } from 'redux/reducer/attendanceSlice'
import { setUserData } from 'redux/reducer/authSlice'
import * as RootNavigation from 'navigation/RootNavigation.js'
import { NavigationRoutes } from 'constants/routes'

export const BASE_API_PATH = '/api/v1/'
// Setting base URL for backend requests
const instance = axios.create({
  baseURL: Env.API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})
instance.defaults.headers['x-team-access'] = Env.TEAM_ACCESS_KEY

instance.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  // Setting auth (if JWT present)
  const token = await AsyncStorage.getItem('token')
  if (token) {
    config = { ...config, headers: { ...config.headers, Authorization: `Bearer ${token}` } }
  }
  return config
})

instance.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    if (
      error?.response?.status === 503 &&
      error?.response?.data?.data?.isMaintenanceEnabled &&
      error?.response?.config?.url !== '/api/v1/users/storePushToken'
    ) {
      RootNavigation.navigate(NavigationRoutes.Maintenance)
    }
    if (error?.config?.url.split('/').at(-1) === 'updateMyPassword') {
      return Promise.reject(error)
    }
    if (error.response.status === 401) {
      await AsyncStorage.setItem('token', '')
      await AsyncStorage.setItem('authUser', '')
      store.dispatch(setToken(''))
      store.dispatch(setPunchInDatas({}))
      store.dispatch(setUserData({}))
    }
    return Promise.reject(error)
  }
)

export default instance
