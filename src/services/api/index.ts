import { BASE_API_PATH } from './../../utils/api/index'

// Users
const BASE_API_PATH_USER = `${BASE_API_PATH}user`
const BASE_API_PATH_AUTH = `${BASE_API_PATH}auth`
const BASE_API_PATH_USERS = `${BASE_API_PATH}users`
const BASE_API_PATH_EVENT = `${BASE_API_PATH}event`
const BASE_API_PATH_RESOURCES = `${BASE_API_PATH}resources`
const BASE_API_PATH_UPDATE_PROFILE = `${BASE_API_PATH_USERS}/updateMe`

//Notiboard
const BASE_API_PATH_NOTICEBOARD = `${BASE_API_PATH}notices`

// Leaves
const BASE_API_PATH_LEAVES = `${BASE_API_PATH}leaves`
const BASE_API_PATH_PROJECTS = `${BASE_API_PATH}projects`
const BASE_API_PATH_PROJECTS_TAGS = `${BASE_API_PATH_PROJECTS}/tags`
const BASE_API_PATH_POSITION_TYPES = `${BASE_API_PATH_USERS}/positionTypes`
const BASE_API_PATH_TIMELOGS = `${BASE_API_PATH}timelogs`
const BASE_API_PATH_ATTENDENTS = `${BASE_API_PATH}attendances`
const BASE_API_PATH_CONFIGURATIONS = `${BASE_API_PATH}configurations`

// Notification
const BASE_API_PATH_NOTIFICATION = `${BASE_API_PATH}notifications`

export const Apis = {
  // Users
  User: `${BASE_API_PATH_USER}`,
  Users: `${BASE_API_PATH_USERS}`,
  Auth: `${BASE_API_PATH_AUTH}`,
  Event: `${BASE_API_PATH_EVENT}`,
  Resources: `${BASE_API_PATH_RESOURCES}`,
  NoticeBoard: `${BASE_API_PATH_NOTICEBOARD}`,
  Leaves: `${BASE_API_PATH_LEAVES}`,
  Projects: `${BASE_API_PATH_PROJECTS}`,
  ProjectTags: `${BASE_API_PATH_PROJECTS_TAGS}`,
  PositionTypes: `${BASE_API_PATH_POSITION_TYPES}`,
  TimeLogs: `${BASE_API_PATH_TIMELOGS}`,
  Attendances: `${BASE_API_PATH_ATTENDENTS}`,
  Configurations: `${BASE_API_PATH_CONFIGURATIONS}`,
  Notification: `${BASE_API_PATH_NOTIFICATION}`,
  Profile: `${BASE_API_PATH_UPDATE_PROFILE}`,
}
