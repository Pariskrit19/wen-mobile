import API from 'utils/api'
import { getAPIResponse } from 'utils/api/getApiResponse'
import {
  CLIENT_KEY,
  PROJECCT_TAG_KEY,
  PROJECT_KEY,
  PROJECT_STATUS_KEY,
  PROJECT_TYPE_KEY,
  decrypt,
} from 'utils/crypto'
import { Apis } from 'services/api'

type projectProps = {
  page?: any
  sort?: string | undefined
  limit?: any
  fields?: any
  projectStatus?: string
  projectTags?: string
  projectType?: string
  projectClient?: string
  project?: string
  developer?: string
  designer?: string
  qa?: string
  endDate?: string
  projectId?: string
}

const getAllProjects = async ({
  page = '',
  sort = '',
  limit = '',
  fields = '',
  projectStatus = '',
  projectTags = '',
  projectType = '',
  projectClient = '',
  project = '',
  developer = '',
  designer = '',
  qa = '',
  endDate = '',
  projectId = '',
}: projectProps) => {
  try {
    let response = await API.get(
      `${Apis.Projects}?search=${project}&page=${page}&sort=${sort}&limit=${limit}&fields=${fields}&projectStatus=${projectStatus}&projectTags=${projectTags}&projectTypes=${projectType}&client=${projectClient}&developers=${developer}&designers=${designer}&qa=${qa}&endDate=${endDate}&_id=${projectId}`
    )
    return getAPIResponse({
      ...response,
      data: {
        ...response?.data,
        data: decrypt(response?.data?.data, PROJECT_KEY),
      },
    })
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}

const getProject = async (projectId: any) => {
  try {
    let response = await API.get(`${Apis.Projects}/${projectId}`)
    return getAPIResponse({
      ...response,
      data: {
        ...response?.data,
        data: decrypt(response?.data?.data, PROJECT_KEY),
      },
    })
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}

const getProjectTypes = async () => {
  try {
    let response = await API.get(`${Apis.Projects}/types`)
    return getAPIResponse({
      ...response,
      data: {
        ...response?.data,
        data: decrypt(response?.data?.data, PROJECT_TYPE_KEY),
      },
    })
  } catch (err) {
    return getAPIResponse(err.response)
  }
}

const getProjectStatus = async () => {
  try {
    let response = await API.get(`${Apis.Projects}/status`)
    return getAPIResponse({
      ...response,
      data: {
        ...response?.data,
        data: decrypt(response?.data?.data, PROJECT_STATUS_KEY),
      },
    })
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}

const getProjectTags = async () => {
  try {
    let response = await API.get(`${Apis.ProjectTags}`)
    return getAPIResponse({
      ...response,
      data: {
        ...response?.data,
        data: decrypt(response?.data?.data, PROJECCT_TAG_KEY),
      },
    })
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}

const getProjectClients = async () => {
  try {
    let response = await API.get(`${Apis.Projects}/clients`)
    return getAPIResponse({
      ...response,
      data: {
        ...response?.data,
        data: decrypt(response?.data?.data, CLIENT_KEY),
      },
    })
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}

export {
  getAllProjects,
  getProjectTypes,
  getProjectStatus,
  getProjectTags,
  getProjectClients,
  getProject,
}
