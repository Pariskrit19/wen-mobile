import { fontFamilyOptions } from 'ts/types'

export const USER_BIOMETRIC_KEY = 'USER_BIOMETRIC_KEY'
export const IS_FIRST_TIME = 'IS_FIRST_TIME'

export const NO_INTERNET = "You're offline. Check your internet connection."

export const fontFamilyType: fontFamilyOptions = {
  light: 'Rubik-Light',
  regular: 'NunitoSans-Regular',
  bold: 'NunitoSans-SemiBold',
  extraBold: 'NunitoSans-ExtraBold',
  black: 'NunitoSans-Black',
  medium: 'NunitoSans-Medium',
  rubikBold: 'Rubik-Bold',
  rubikExtraBold: 'Rubik-ExtraBold',
  rubikMedium: 'Rubik-Medium',
  rubikRegular: 'Rubik-Regular',
  rubikItalic: 'Rubik-Italic',
}

export const FONT_CONST = {
  rubikMedium: 'rubikMedium',
  rubikExtraBold: 'rubikExtraBold',
  light: 'light',
  regular: 'regular',
  bold: 'bold',
  extraBold: 'extraBold',
  black: 'black',
  medium: 'medium',
  rubikRegular: 'rubikRegular',
  rubikItalic: 'rubikItalic',
}

const themeLabelContainer = {
  flexDirection: 'row-reverse',
  justifyContent: 'space-between',
  width: '90%',
}

export const RoleAccess = {
  Admin: 'admin',
  ProjectManager: 'manager',
  Editor: 'editor',
  Normal: 'normal',
  HumanResource: 'hr',
  Finance: 'finance',
  TeamLead: 'lead',
  Subscriber: 'subscriber',
  OfficeAdmin: 'officeadmin',
  All: 'all',
}

const labelStyle = { fontSize: 18, fontWeight: '500' }
export const lightMode = 'light'
export const modeDark = 'dark'
export const systemMode = 'systemMode'

export const getDarkModeConst = (colors: any, darkMode: boolean) => [
  {
    id: lightMode,
    label: 'Off',
    value: 'light',
    containerStyle: themeLabelContainer,
    labelStyle: { ...labelStyle, color: colors.text },
    color: colors.text,
  },
  {
    id: modeDark,
    label: 'On',
    value: 'dark',
    containerStyle: themeLabelContainer,
    labelStyle: { ...labelStyle, color: colors.text },
    color: colors.text,
  },
  {
    id: systemMode,
    label: 'Use device settings',
    value: 'systemMode',
    containerStyle: themeLabelContainer,
    labelStyle: { ...labelStyle, color: colors.text },
    color: colors.text,
  },
]

export const LEAVE_INTERVAL = [
  { label: 'Full Day', value: 'full-day' },
  { label: 'First Half', value: 'first-half', disabled: true },
  { label: 'Second Half', value: 'second-half', disabled: true },
]

export const PROJECT_FILTER = {
  projectTypes: 'projectTypes',
  projectStatus: 'projectStatus',
  projectTags: 'projectTags',
  projectClients: 'projectClients',
  projectQa: 'projectQa',
  projectDeveloper: 'projectDeveloper',
  projectDesigner: 'projectDesigner',
}

export const LEAVE_TYPE_INTERVAL = {
  leaveInterval: 'leaveInterval',
  leaveType: 'leaveType',
}

export const months = [
  { id: 1, name: 'January' },
  { id: 2, name: 'February' },
  { id: 3, name: 'March' },
  { id: 4, name: 'April' },
  { id: 5, name: 'May' },
  { id: 6, name: 'June' },
  { id: 7, name: 'July' },
  { id: 8, name: 'August' },
  { id: 9, name: 'September' },
  { id: 10, name: 'October' },
  { id: 11, name: 'November' },
  { id: 12, name: 'December' },
]

export const FULL_MONTH_NAME = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export const DaysConstant = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
export const FullDaysConstant = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]

export const leaveInterval = [
  { name: 'Full Day', value: 'full-day' },
  { name: 'First Half', value: 'first-half' },
  { name: 'Second Half', value: 'second-half' },
]
export const LEAVE_STATUS_TYPES = [
  { id: '', value: 'All' },
  { id: 'approved', value: 'Approved' },
  { id: 'pending', value: 'Pending' },
  { id: 'cancelled', value: 'Cancelled' },
  { id: 'rejected', value: 'Rejected' },
  { id: 'user cancelled', value: 'User Cancelled' },
]

export const COWORKERS = [
  {
    officeTime: {
      utcDate: '2022-11-13T03:15:00.000Z',
      hour: '3',
      minute: '25',
    },
    officeEndTime: '2022-11-13T12:15:00.000Z',
    leaveadjustmentBalance: 0,
    isPartTime: false,
    _id: '642d034c6acfc6c6a6fe94f8',
    name: 'Aamir Khan',
    email: 'aamirkhan@webexpertsnepal.com',
    photoURL: null,
    role: {
      _id: '62b1901d31f49d10e7717060',
      key: 'admin',
      value: 'Admin',
      permission:
        '[{"Navigation":{"todaysOverview":true,"coWorkers":true,"projects":true,"attendance":true,"logTime":true,"leaveManagement":true,"noticeBoard":true,"blog":true,"reports":true,"resources":true,"settings":true},"Dashboard":{"viewCalendar":true,"viewProjectTimeLogReport":true,"viewTotalCoworkers":true,"viewAnnouncement":true,"viewCoworkersPunhedInToday":true,"viewHolidays":true,"viewPendingLeaveRequest":true,"viewSalaryReview":true,"viewCoworkersOnLeave":true,"viewBirthdays":true,"viewRecentActivities":true,"enableMaintenanceMode":true,"makeclicakbleTotalCoworkers":true,"makeclickableCoworkersPunchIn":true,"makeclickableLeavePendingRequest":true,"makeclickableCoworkersOnLeave":true},"Co-Workers":{"viewCoworkers":true,"exportCoworkers":true,"editCoworkers":true,"importCoworkers":true,"disableCoworkers":true,"resetAllocatedLeaves":true,"switchCoworkers":true},"Projects":{"createProjects":true,"editProjects":true,"viewProjects":true,"deleteProjects":true},"Attendance":{"createMyAttendance":true,"editCoworkersAttendance":true,"deleteCoworkersAttendance":true,"viewMyAttendance":true,"exportCoworkersAttendance":true,"viewMyAttendanceCalendar":true,"viewCoworkersLateAttendance":true,"viewCoworkersAttendance":true,"cutLateArrivalLeave":true,"addCoworkersAttendance":true,"viewCoworkersAttendanceCalendar":true},"Log Time":{"createLogTime":true,"editLogTime":true,"viewLogTime":true,"deleteLogTime":true,"createUserLogTime":true,"viewOtherLogTime":true},"Leave Management":{"applyLeave":true,"viewCoworkersLeaves":true,"viewMyHistory":true,"approveCoworkersLeaves":true,"viewMyLeaveDetails":true,"cancelCoworkersLeaves":true,"cancelMyLeaves":true,"exportCoworkersLeaves":true,"viewLeaves":true,"viewLeavesCalendar":true,"addCoworkersLeaves":true,"editCoworkersLeaves":true},"Notice Board":{"createNotice":true,"editNotice":true,"viewNotice":true,"deleteNotice":true},"Blog":{"createBlog":true,"editBlog":true,"viewBlog":true,"deleteBlog":true},"Reports":{"viewWeeklyReport":true,"viewLeaveReport":true,"editLeaveReport":true,"viewWorkLogReport":true,"viewSalaryReview":true,"viewActivityLog":true,"viewOvertimeReport":true},"Resources":{"createFAQ":true,"viewFAQ":true,"editFAQ":true,"deleteFAQ":true,"createPolicy":true,"viewPolicy":true,"editPolicy":true,"deletePolicy":true,"createHoliday":true,"viewHoliday":true,"editHoliday":true,"deleteHoliday":true},"Settings":{"coWorker":true,"project":true,"coworkerCUD":true,"logTimes":true,"leaveManagements":true,"noticeBoards":true,"blogs":true,"resource":true,"emails":true,"attendance":true}}]',
    },
    status: 'Permanent',
    allocatedLeaves: {
      firstQuarter: 4,
      secondQuarter: 4,
      thirdQuarter: 4,
      fourthQuarter: 3,
    },
    active: false,
    gender: 'Male',
    primaryPhone: 9876765456,
    maritalStatus: 'Unmarried',
    lastReviewDate: [],
    createdAt: '2023-04-05T05:12:44.176Z',
    updatedAt: '2023-04-05T05:12:44.176Z',
  },
  {
    officeTime: {
      utcDate: '2022-11-13T03:15:00.000Z',
      hour: '3',
      minute: '25',
    },
    officeEndTime: '2022-11-13T12:15:00.000Z',
    leaveadjustmentBalance: 0,
    isPartTime: false,
    _id: '642d0e852373b0d57dbbfef9',
    name: 'Aamir Khan Delhi',
    email: 'aamirkhandelhi@webexpertsnepal.com',
    photoURL: null,
    role: {
      _id: '62b1901d31f49d10e7717060',
      key: 'admin',
      value: 'Admin',
      permission:
        '[{"Navigation":{"todaysOverview":true,"coWorkers":true,"projects":true,"attendance":true,"logTime":true,"leaveManagement":true,"noticeBoard":true,"blog":true,"reports":true,"resources":true,"settings":true},"Dashboard":{"viewCalendar":true,"viewProjectTimeLogReport":true,"viewTotalCoworkers":true,"viewAnnouncement":true,"viewCoworkersPunhedInToday":true,"viewHolidays":true,"viewPendingLeaveRequest":true,"viewSalaryReview":true,"viewCoworkersOnLeave":true,"viewBirthdays":true,"viewRecentActivities":true,"enableMaintenanceMode":true,"makeclicakbleTotalCoworkers":true,"makeclickableCoworkersPunchIn":true,"makeclickableLeavePendingRequest":true,"makeclickableCoworkersOnLeave":true},"Co-Workers":{"viewCoworkers":true,"exportCoworkers":true,"editCoworkers":true,"importCoworkers":true,"disableCoworkers":true,"resetAllocatedLeaves":true,"switchCoworkers":true},"Projects":{"createProjects":true,"editProjects":true,"viewProjects":true,"deleteProjects":true},"Attendance":{"createMyAttendance":true,"editCoworkersAttendance":true,"deleteCoworkersAttendance":true,"viewMyAttendance":true,"exportCoworkersAttendance":true,"viewMyAttendanceCalendar":true,"viewCoworkersLateAttendance":true,"viewCoworkersAttendance":true,"cutLateArrivalLeave":true,"addCoworkersAttendance":true,"viewCoworkersAttendanceCalendar":true},"Log Time":{"createLogTime":true,"editLogTime":true,"viewLogTime":true,"deleteLogTime":true,"createUserLogTime":true,"viewOtherLogTime":true},"Leave Management":{"applyLeave":true,"viewCoworkersLeaves":true,"viewMyHistory":true,"approveCoworkersLeaves":true,"viewMyLeaveDetails":true,"cancelCoworkersLeaves":true,"cancelMyLeaves":true,"exportCoworkersLeaves":true,"viewLeaves":true,"viewLeavesCalendar":true,"addCoworkersLeaves":true,"editCoworkersLeaves":true},"Notice Board":{"createNotice":true,"editNotice":true,"viewNotice":true,"deleteNotice":true},"Blog":{"createBlog":true,"editBlog":true,"viewBlog":true,"deleteBlog":true},"Reports":{"viewWeeklyReport":true,"viewLeaveReport":true,"editLeaveReport":true,"viewWorkLogReport":true,"viewSalaryReview":true,"viewActivityLog":true,"viewOvertimeReport":true},"Resources":{"createFAQ":true,"viewFAQ":true,"editFAQ":true,"deleteFAQ":true,"createPolicy":true,"viewPolicy":true,"editPolicy":true,"deletePolicy":true,"createHoliday":true,"viewHoliday":true,"editHoliday":true,"deleteHoliday":true},"Settings":{"coWorker":true,"project":true,"coworkerCUD":true,"logTimes":true,"leaveManagements":true,"noticeBoards":true,"blogs":true,"resource":true,"emails":true,"attendance":true}}]',
    },
    status: 'Permanent',
    allocatedLeaves: {
      firstQuarter: 4,
      secondQuarter: 4,
      thirdQuarter: 4,
      fourthQuarter: 3,
    },
    active: false,
    gender: 'Male',
    primaryPhone: 9876765456,
    maritalStatus: 'Unmarried',
    lastReviewDate: [],
    createdAt: '2023-04-05T06:00:37.640Z',
    updatedAt: '2023-04-05T06:00:37.640Z',
  },
  {
    officeTime: {
      utcDate: '2022-11-13T03:15:00Z',
      hour: '3',
      minute: '25',
    },
    officeEndTime: '2022-11-13T12:15:00.000Z',
    isPartTime: false,
    _id: '62b3f3fc9beb61203b4ffc3f',
    name: 'Abhishek Sahakarmi',
    email: 'sahakarmi.abhishek@webexpertsnepal.com',
    active: false,
    dob: '2022-08-02T10:44:05.674Z',
    gender: 'Male',
    primaryPhone: 1234567890,
    joinDate: '2022-07-30T18:15:00.000Z',
    maritalStatus: 'Unmarried',
    createdAt: '2022-06-23T05:02:52.019Z',
    updatedAt: '2023-02-22T06:18:45.020Z',
    position: {
      _id: '62b1a774282f826410dc76dd',
      name: 'Intern',
    },
    role: {
      _id: '6334192d8f9fcbae8c9fee6a',
      key: 'subscriber',
      value: 'Subscriber',
      permission:
        '[{"Navigation":{"todaysOverview":false,"coWorkers":false,"projects":false,"attendance":false,"logTime":false,"leaveManagement":true,"noticeBoard":false,"blog":false,"reports":false,"resources":false,"settings":false},"Dashboard":{"viewCalendar":true,"viewProjectTimeLogReport":true,"viewTotalCoworkers":true,"viewAnnouncement":true,"viewCoworkersPunhedInToday":true,"viewHolidays":true,"viewPendingLeaveRequest":true,"viewSalaryReview":true,"viewCoworkersOnLeave":true,"viewBirthdays":true,"viewRecentActivities":false,"enableMaintenanceMode":false,"makeclicakbleTotalCoworkers":false,"makeclickableCoworkersPunchIn":false,"makeclickableLeavePendingRequest":false,"makeclickableCoworkersOnLeave":false},"Co-Workers":{"viewCoworkers":false,"exportCoworkers":false,"editCoworkers":false,"importCoworkers":false,"disableCoworkers":false,"resetAllocatedLeaves":false,"switchCoworkers":false},"Projects":{"createProjects":false,"editProjects":false,"viewProjects":false,"deleteProjects":false},"Attendance":{"createMyAttendance":false,"editCoworkersAttendance":false,"viewMyAttendance":false,"exportCoworkersAttendance":false,"viewMyAttendanceCalendar":false,"viewCoworkersLateAttendance":false,"viewCoworkersAttendance":false,"cutLateArrivalLeave":false,"addCoworkersAttendance":false,"viewCoworkersAttendanceCalendar":false},"Log Time":{"createLogTime":false,"editLogTime":false,"viewLogTime":false,"deleteLogTime":false},"Leave Management":{"applyLeave":true,"viewCoworkersLeaves":false,"viewMyHistory":true,"approveCoworkersLeaves":false,"viewMyLeaveDetails":false,"cancelCoworkersLeaves":false,"cancelMyLeaves":false,"exportCoworkersLeaves":false,"viewLeaves":false,"viewLeavesCalendar":false,"addCoworkersLeaves":false,"showQuarterlyLeaveDetails":false,"editCoworkersLeaves":false,"showAnnualLeaveDetails":false},"Notice Board":{"createNotice":false,"editNotice":false,"viewNotice":false,"deleteNotice":false},"Blog":{"createBlog":false,"editBlog":false,"viewBlog":false,"deleteBlog":false},"Reports":{"viewWeeklyReport":false,"viewLeaveReport":false,"viewWorkLogReport":false,"viewSalaryReview":false,"viewActivityLog":false},"Resources":{"createFAQ":false,"viewFAQ":false,"editFAQ":false,"deleteFAQ":false,"createPolicy":false,"viewPolicy":false,"editPolicy":false,"deletePolicy":false,"createHoliday":false,"viewHoliday":false,"editHoliday":false,"deleteHoliday":false},"Settings":{"coWorker":false,"project":false,"coworkerCUD":false,"logTimes":false,"leaveManagements":false,"noticeBoards":false,"blogs":false,"resource":false,"emails":false,"attendance":false}}]',
    },
    exitDate: '2022-08-25T06:55:43.000Z',
    photoURL: null,
    positionType: {
      _id: '62ff3e6b7582860104c727f3',
      name: 'Developer',
    },
    newSalaryReviewDate: null,
    allocatedLeaves: {
      firstQuarter: 4,
      secondQuarter: 4,
      thirdQuarter: 4,
      fourthQuarter: 3,
    },
    status: 'Probation',
    lastReviewDate: ['2022-12-01T23:59:59.000Z'],
    leaveadjustmentBalanceBalance: 0,
    leaveadjustmentBalance: 2,
  },
  {
    officeTime: {
      utcDate: '2022-12-21T18:54:07Z',
      hour: '7',
      minute: '4',
    },
    officeEndTime: '2022-11-13T12:15:00.000Z',
    leaveadjustmentBalance: 0,
    isPartTime: false,
    _id: '6329886ae454ce5426208fd3',
    name: 'Admin Test P',
    email: 'admintest@webexpertsnepal.com',
    photoURL: null,
    active: false,
    dob: '2000-06-14T00:00:00.000Z',
    gender: 'Male',
    primaryPhone: 1234567890,
    joinDate: '2022-01-25T18:15:00.000Z',
    maritalStatus: 'Unmarried',
    createdAt: '2022-09-20T09:31:22.437Z',
    updatedAt: '2023-02-22T06:18:45.020Z',
    position: {
      _id: '62b1a710282f826410dc76a6',
      name: 'Management',
    },
    positionType: {
      _id: '6329a6bb637f5061322b02b5',
      name: 'Management',
    },
    role: {
      _id: '63a93ccf25eb8bd1336e7369',
      key: 'utsav-test',
      value: 'utsav-test',
      permission:
        '[{"Navigation":{"todaysOverview":false,"coWorkers":false,"projects":false,"attendance":true,"logTime":false,"leaveManagement":true,"noticeBoard":false,"blog":true,"reports":false,"resources":false,"settings":false},"Dashboard":{"viewCalendar":true,"viewProjectTimeLogReport":false,"viewTotalCoworkers":true,"viewAnnouncement":false,"viewCoworkersPunhedInToday":false,"viewHolidays":false,"viewPendingLeaveRequest":false,"viewSalaryReview":false,"viewCoworkersOnLeave":false,"viewBirthdays":false,"viewRecentActivities":false,"enableMaintenanceMode":false,"makeclicakbleTotalCoworkers":false,"makeclickableCoworkersPunchIn":false,"makeclickableLeavePendingRequest":false,"makeclickableCoworkersOnLeave":false},"Co-Workers":{"viewCoworkers":false,"exportCoworkers":false,"editCoworkers":false,"importCoworkers":false,"disableCoworkers":false,"resetAllocatedLeaves":false,"switchCoworkers":false},"Projects":{"createProjects":false,"editProjects":false,"viewProjects":false,"deleteProjects":false},"Attendance":{"createMyAttendance":true,"editCoworkersAttendance":false,"viewMyAttendance":true,"exportCoworkersAttendance":false,"viewMyAttendanceCalendar":false,"viewCoworkersLateAttendance":false,"viewCoworkersAttendance":true,"cutLateArrivalLeave":false,"addCoworkersAttendance":false,"viewCoworkersAttendanceCalendar":true},"Log Time":{"createLogTime":false,"editLogTime":false,"viewLogTime":false,"deleteLogTime":false},"Leave Management":{"applyLeave":true,"viewCoworkersLeaves":true,"viewMyHistory":true,"approveCoworkersLeaves":true,"viewMyLeaveDetails":true,"cancelCoworkersLeaves":true,"cancelMyLeaves":true,"exportCoworkersLeaves":true,"viewLeaves":true,"viewLeavesCalendar":true,"addCoworkersLeaves":true,"showQuarterlyLeaveDetails":true,"editCoworkersLeaves":true,"showAnnualLeaveDetails":true},"Notice Board":{"createNotice":false,"editNotice":false,"viewNotice":false,"deleteNotice":false},"Blog":{"createBlog":false,"editBlog":false,"viewBlog":true,"deleteBlog":false},"Reports":{"viewWeeklyReport":false,"viewLeaveReport":false,"viewWorkLogReport":false,"viewActivityLog":false},"Resources":{"createFAQ":false,"viewFAQ":false,"editFAQ":false,"deleteFAQ":false,"createPolicy":false,"viewPolicy":false,"editPolicy":false,"deletePolicy":false,"createHoliday":false,"viewHoliday":false,"editHoliday":false,"deleteHoliday":false},"Settings":{"coWorker":false,"project":false,"coworkerCUD":false,"logTimes":false,"leaveManagements":false,"noticeBoards":false,"blogs":false,"resource":false,"emails":false}}]',
    },
    passwordChangedAt: '2022-09-28T08:05:35.819Z',
    status: 'Permanent',
    allocatedLeaves: {
      firstQuarter: 4,
      secondQuarter: 4,
      thirdQuarter: 4,
      fourthQuarter: 3,
    },
    secondaryPhone: null,
    exitDate: null,
    lastReviewDate: ['2022-01-13T23:59:59.000Z'],
    leaveadjustmentBalanceBalance: 0,
  },
  {
    officeTime: {
      utcDate: '2022-11-13T03:15:00.000Z',
      hour: '3',
      minute: '25',
    },
    officeEndTime: '2022-11-13T12:15:00.000Z',
    leaveadjustmentBalance: 0,
    isPartTime: false,
    _id: '642d0f5c6318f7c522ffa022',
    name: 'Aishwarya Rai',
    email: 'aishh@webexpertsnepal.com',
    photoURL: null,
    role: {
      _id: '62b1901d31f49d10e7717060',
      key: 'admin',
      value: 'Admin',
      permission:
        '[{"Navigation":{"todaysOverview":true,"coWorkers":true,"projects":true,"attendance":true,"logTime":true,"leaveManagement":true,"noticeBoard":true,"blog":true,"reports":true,"resources":true,"settings":true},"Dashboard":{"viewCalendar":true,"viewProjectTimeLogReport":true,"viewTotalCoworkers":true,"viewAnnouncement":true,"viewCoworkersPunhedInToday":true,"viewHolidays":true,"viewPendingLeaveRequest":true,"viewSalaryReview":true,"viewCoworkersOnLeave":true,"viewBirthdays":true,"viewRecentActivities":true,"enableMaintenanceMode":true,"makeclicakbleTotalCoworkers":true,"makeclickableCoworkersPunchIn":true,"makeclickableLeavePendingRequest":true,"makeclickableCoworkersOnLeave":true},"Co-Workers":{"viewCoworkers":true,"exportCoworkers":true,"editCoworkers":true,"importCoworkers":true,"disableCoworkers":true,"resetAllocatedLeaves":true,"switchCoworkers":true},"Projects":{"createProjects":true,"editProjects":true,"viewProjects":true,"deleteProjects":true},"Attendance":{"createMyAttendance":true,"editCoworkersAttendance":true,"deleteCoworkersAttendance":true,"viewMyAttendance":true,"exportCoworkersAttendance":true,"viewMyAttendanceCalendar":true,"viewCoworkersLateAttendance":true,"viewCoworkersAttendance":true,"cutLateArrivalLeave":true,"addCoworkersAttendance":true,"viewCoworkersAttendanceCalendar":true},"Log Time":{"createLogTime":true,"editLogTime":true,"viewLogTime":true,"deleteLogTime":true,"createUserLogTime":true,"viewOtherLogTime":true},"Leave Management":{"applyLeave":true,"viewCoworkersLeaves":true,"viewMyHistory":true,"approveCoworkersLeaves":true,"viewMyLeaveDetails":true,"cancelCoworkersLeaves":true,"cancelMyLeaves":true,"exportCoworkersLeaves":true,"viewLeaves":true,"viewLeavesCalendar":true,"addCoworkersLeaves":true,"editCoworkersLeaves":true},"Notice Board":{"createNotice":true,"editNotice":true,"viewNotice":true,"deleteNotice":true},"Blog":{"createBlog":true,"editBlog":true,"viewBlog":true,"deleteBlog":true},"Reports":{"viewWeeklyReport":true,"viewLeaveReport":true,"editLeaveReport":true,"viewWorkLogReport":true,"viewSalaryReview":true,"viewActivityLog":true,"viewOvertimeReport":true},"Resources":{"createFAQ":true,"viewFAQ":true,"editFAQ":true,"deleteFAQ":true,"createPolicy":true,"viewPolicy":true,"editPolicy":true,"deletePolicy":true,"createHoliday":true,"viewHoliday":true,"editHoliday":true,"deleteHoliday":true},"Settings":{"coWorker":true,"project":true,"coworkerCUD":true,"logTimes":true,"leaveManagements":true,"noticeBoards":true,"blogs":true,"resource":true,"emails":true,"attendance":true}}]',
    },
    status: 'Permanent',
    allocatedLeaves: {
      firstQuarter: 4,
      secondQuarter: 4,
      thirdQuarter: 4,
      fourthQuarter: 3,
    },
    active: false,
    gender: 'Male',
    primaryPhone: 9876765456,
    maritalStatus: 'Unmarried',
    lastReviewDate: [],
    createdAt: '2023-04-05T06:04:12.336Z',
    updatedAt: '2023-04-05T06:04:12.336Z',
  },
  {
    officeTime: {
      utcDate: '2022-11-13T03:15:00.000Z',
      hour: '3',
      minute: '25',
    },
    officeEndTime: '2022-11-13T12:15:00.000Z',
    isPartTime: false,
    _id: '642cfe315624adf64e3c03e1',
    name: 'Anu Maharjan',
    email: 'maharjan.anu@webexpertsnepal.com',
    photoURL: null,
    role: {
      _id: '62b1906a31f49d10e7717072',
      key: 'normal',
      value: 'Normal',
      permission:
        '[{"Navigation":{"todaysOverview":false,"coWorkers":false,"projects":true,"attendance":true,"logTime":true,"leaveManagement":true,"noticeBoard":true,"blog":true,"reports":false,"resources":true,"settings":false},"Dashboard":{"viewCalendar":true,"viewProjectTimeLogReport":false,"viewTotalCoworkers":true,"viewAnnouncement":true,"viewCoworkersPunhedInToday":true,"viewHolidays":true,"viewPendingLeaveRequest":false,"viewSalaryReview":true,"viewCoworkersOnLeave":false,"viewBirthdays":true,"viewRecentActivities":true,"enableMaintenanceMode":false,"makeclicakbleTotalCoworkers":false,"makeclickableCoworkersPunchIn":false,"makeclickableLeavePendingRequest":false,"makeclickableCoworkersOnLeave":false},"Co-Workers":{"viewCoworkers":false,"exportCoworkers":false,"editCoworkers":false,"importCoworkers":false,"disableCoworkers":false,"resetAllocatedLeaves":false,"switchCoworkers":false},"Projects":{"createProjects":false,"editProjects":false,"viewProjects":true,"deleteProjects":false},"Attendance":{"createMyAttendance":true,"editCoworkersAttendance":false,"deleteCoworkersAttendance":false,"viewMyAttendance":true,"exportCoworkersAttendance":false,"viewMyAttendanceCalendar":true,"viewCoworkersLateAttendance":false,"viewCoworkersAttendance":false,"cutLateArrivalLeave":false,"addCoworkersAttendance":false,"viewCoworkersAttendanceCalendar":false},"Log Time":{"createLogTime":true,"editLogTime":false,"viewLogTime":true,"deleteLogTime":false,"createUserLogTime":false,"viewOtherLogTime":false},"Leave Management":{"applyLeave":true,"viewCoworkersLeaves":false,"viewMyHistory":true,"approveCoworkersLeaves":false,"viewMyLeaveDetails":true,"cancelCoworkersLeaves":false,"cancelMyLeaves":true,"exportCoworkersLeaves":false,"viewLeaves":false,"viewLeavesCalendar":false,"addCoworkersLeaves":false,"editCoworkersLeaves":false},"Notice Board":{"createNotice":false,"editNotice":false,"viewNotice":true,"deleteNotice":false},"Blog":{"createBlog":false,"editBlog":false,"viewBlog":true,"deleteBlog":false},"Reports":{"viewWeeklyReport":false,"viewLeaveReport":false,"editLeaveReport":false,"viewWorkLogReport":false,"viewSalaryReview":false,"viewActivityLog":false,"viewOvertimeReport":false},"Resources":{"createFAQ":false,"viewFAQ":false,"editFAQ":false,"deleteFAQ":false,"createPolicy":false,"viewPolicy":false,"editPolicy":false,"deletePolicy":false,"createHoliday":false,"viewHoliday":true,"editHoliday":true,"deleteHoliday":true},"Settings":{"coWorker":false,"project":false,"coworkerCUD":false,"logTimes":false,"leaveManagements":false,"noticeBoards":false,"blogs":false,"resource":false,"emails":false,"attendance":false}}]',
    },
    status: 'Permanent',
    active: false,
    gender: 'Male',
    primaryPhone: 1234567890,
    maritalStatus: 'Unmarried',
    leaveadjustmentBalance: 0,
    lastReviewDate: [],
    createdAt: '2023-04-05T04:50:57.955Z',
    updatedAt: '2023-04-05T04:50:57.955Z',
  },
  {
    officeTime: {
      utcDate: '2022-11-13T03:15:00Z',
      hour: '3',
      minute: '25',
    },
    _id: '62b3f4b79beb61203b4ffc4d',
    name: 'Anuj Maharjan',
    email: 'maharjan.anuj@webexpertsnepal.com',
    active: false,
    dob: '2000-06-14T00:00:00.000Z',
    gender: 'Male',
    primaryPhone: 1234567890,
    joinDate: '2022-01-13T18:15:00.000Z',
    maritalStatus: 'Unmarried',
    createdAt: '2022-06-23T05:05:59.439Z',
    updatedAt: '2023-06-08T08:04:45.106Z',
    position: {
      _id: '62b1a72e282f826410dc76b5',
      name: 'WordPress Developer',
    },
    role: {
      _id: '62b1906a31f49d10e7717072',
      key: 'normal',
      value: 'Normal',
      permission:
        '[{"Navigation":{"todaysOverview":false,"coWorkers":false,"projects":true,"attendance":true,"logTime":true,"leaveManagement":true,"noticeBoard":true,"blog":true,"reports":false,"resources":true,"settings":false},"Dashboard":{"viewCalendar":true,"viewProjectTimeLogReport":false,"viewTotalCoworkers":true,"viewAnnouncement":true,"viewCoworkersPunhedInToday":true,"viewHolidays":true,"viewPendingLeaveRequest":false,"viewSalaryReview":true,"viewCoworkersOnLeave":false,"viewBirthdays":true,"viewRecentActivities":true,"enableMaintenanceMode":false,"makeclicakbleTotalCoworkers":false,"makeclickableCoworkersPunchIn":false,"makeclickableLeavePendingRequest":false,"makeclickableCoworkersOnLeave":false},"Co-Workers":{"viewCoworkers":false,"exportCoworkers":false,"editCoworkers":false,"importCoworkers":false,"disableCoworkers":false,"resetAllocatedLeaves":false,"switchCoworkers":false},"Projects":{"createProjects":false,"editProjects":false,"viewProjects":true,"deleteProjects":false},"Attendance":{"createMyAttendance":true,"editCoworkersAttendance":false,"deleteCoworkersAttendance":false,"viewMyAttendance":true,"exportCoworkersAttendance":false,"viewMyAttendanceCalendar":true,"viewCoworkersLateAttendance":false,"viewCoworkersAttendance":false,"cutLateArrivalLeave":false,"addCoworkersAttendance":false,"viewCoworkersAttendanceCalendar":false},"Log Time":{"createLogTime":true,"editLogTime":false,"viewLogTime":true,"deleteLogTime":false,"createUserLogTime":false,"viewOtherLogTime":false},"Leave Management":{"applyLeave":true,"viewCoworkersLeaves":false,"viewMyHistory":true,"approveCoworkersLeaves":false,"viewMyLeaveDetails":true,"cancelCoworkersLeaves":false,"cancelMyLeaves":true,"exportCoworkersLeaves":false,"viewLeaves":false,"viewLeavesCalendar":false,"addCoworkersLeaves":false,"editCoworkersLeaves":false},"Notice Board":{"createNotice":false,"editNotice":false,"viewNotice":true,"deleteNotice":false},"Blog":{"createBlog":false,"editBlog":false,"viewBlog":true,"deleteBlog":false},"Reports":{"viewWeeklyReport":false,"viewLeaveReport":false,"editLeaveReport":false,"viewWorkLogReport":false,"viewSalaryReview":false,"viewActivityLog":false,"viewOvertimeReport":false},"Resources":{"createFAQ":false,"viewFAQ":false,"editFAQ":false,"deleteFAQ":false,"createPolicy":false,"viewPolicy":false,"editPolicy":false,"deletePolicy":false,"createHoliday":false,"viewHoliday":true,"editHoliday":true,"deleteHoliday":true},"Settings":{"coWorker":false,"project":false,"coworkerCUD":false,"logTimes":false,"leaveManagements":false,"noticeBoards":false,"blogs":false,"resource":false,"emails":false,"attendance":false}}]',
    },
    photoURL: null,
    positionType: {
      _id: '62ff3c816275a483c8e69048',
      name: 'Designer',
    },
    newSalaryReviewDate: null,
    allocatedLeaves: {
      firstQuarter: 4,
      secondQuarter: 4,
      thirdQuarter: 4,
      fourthQuarter: 3,
    },
    status: 'Probation',
    exitDate: '2022-07-12T05:56:11.000Z',
    lastReviewDate: [
      '2021-12-31T18:15:00.000Z',
      '2022-01-27T18:15:00.000Z',
      '2022-02-23T18:15:00.000Z',
      '2022-02-25T18:15:00.000Z',
      '2022-02-27T18:15:00.000Z',
      '2022-02-28T18:15:00.000Z',
      '2022-03-01T18:15:00.000Z',
      '2022-03-09T18:15:00.000Z',
      '2023-02-14T18:15:00.000Z',
    ],
    leaveadjustmentBalanceBalance: 0,
    leaveadjustmentBalance: 0,
    try: 0,
    statusChangeDate: '2023-04-04T00:00:00.000Z',
    officeEndTime: '2023-04-12T14:15:00Z',
    isPartTime: true,
  },
  {
    officeTime: {
      utcDate: '2022-11-13T03:15:00Z',
      hour: '3',
      minute: '25',
    },
    isPartTime: false,
    _id: '642c14087df02c699323a2cb',
    name: 'Anujaa Maharjan',
    email: 'maharjan.anujaa@webexpertsnepal.com',
    photoURL: null,
    role: {
      _id: '62b1906a31f49d10e7717072',
      key: 'normal',
      value: 'Normal',
      permission:
        '[{"Navigation":{"todaysOverview":false,"coWorkers":false,"projects":true,"attendance":true,"logTime":true,"leaveManagement":true,"noticeBoard":true,"blog":true,"reports":false,"resources":true,"settings":false},"Dashboard":{"viewCalendar":true,"viewProjectTimeLogReport":false,"viewTotalCoworkers":true,"viewAnnouncement":true,"viewCoworkersPunhedInToday":true,"viewHolidays":true,"viewPendingLeaveRequest":false,"viewSalaryReview":true,"viewCoworkersOnLeave":false,"viewBirthdays":true,"viewRecentActivities":true,"enableMaintenanceMode":false,"makeclicakbleTotalCoworkers":false,"makeclickableCoworkersPunchIn":false,"makeclickableLeavePendingRequest":false,"makeclickableCoworkersOnLeave":false},"Co-Workers":{"viewCoworkers":false,"exportCoworkers":false,"editCoworkers":false,"importCoworkers":false,"disableCoworkers":false,"resetAllocatedLeaves":false,"switchCoworkers":false},"Projects":{"createProjects":false,"editProjects":false,"viewProjects":true,"deleteProjects":false},"Attendance":{"createMyAttendance":true,"editCoworkersAttendance":false,"deleteCoworkersAttendance":false,"viewMyAttendance":true,"exportCoworkersAttendance":false,"viewMyAttendanceCalendar":true,"viewCoworkersLateAttendance":false,"viewCoworkersAttendance":false,"cutLateArrivalLeave":false,"addCoworkersAttendance":false,"viewCoworkersAttendanceCalendar":false},"Log Time":{"createLogTime":true,"editLogTime":false,"viewLogTime":true,"deleteLogTime":false,"createUserLogTime":false,"viewOtherLogTime":false},"Leave Management":{"applyLeave":true,"viewCoworkersLeaves":false,"viewMyHistory":true,"approveCoworkersLeaves":false,"viewMyLeaveDetails":true,"cancelCoworkersLeaves":false,"cancelMyLeaves":true,"exportCoworkersLeaves":false,"viewLeaves":false,"viewLeavesCalendar":false,"addCoworkersLeaves":false,"editCoworkersLeaves":false},"Notice Board":{"createNotice":false,"editNotice":false,"viewNotice":true,"deleteNotice":false},"Blog":{"createBlog":false,"editBlog":false,"viewBlog":true,"deleteBlog":false},"Reports":{"viewWeeklyReport":false,"viewLeaveReport":false,"editLeaveReport":false,"viewWorkLogReport":false,"viewSalaryReview":false,"viewActivityLog":false,"viewOvertimeReport":false},"Resources":{"createFAQ":false,"viewFAQ":false,"editFAQ":false,"deleteFAQ":false,"createPolicy":false,"viewPolicy":false,"editPolicy":false,"deletePolicy":false,"createHoliday":false,"viewHoliday":true,"editHoliday":true,"deleteHoliday":true},"Settings":{"coWorker":false,"project":false,"coworkerCUD":false,"logTimes":false,"leaveManagements":false,"noticeBoards":false,"blogs":false,"resource":false,"emails":false,"attendance":false}}]',
    },
    status: 'Permanent',
    allocatedLeaves: {
      firstQuarter: 4,
      secondQuarter: 4,
      thirdQuarter: 4,
      fourthQuarter: 3,
    },
    active: false,
    gender: 'Male',
    primaryPhone: 1234567890,
    maritalStatus: 'Unmarried',
    lastReviewDate: ['2023-02-28T18:15:00.000Z', '2023-03-01T18:15:00.000Z'],
    createdAt: '2023-04-04T12:11:52.768Z',
    updatedAt: '2023-06-08T08:10:13.451Z',
    exitDate: null,
    joinDate: '2023-02-28T18:15:00.000Z',
    position: {
      _id: '62b1a72e282f826410dc76b5',
      name: 'WordPress Developer',
    },
    positionType: {
      _id: '62ff3e6b7582860104c727f3',
      name: 'Developer',
    },
    officeEndTime: '2023-04-12T08:20:00Z',
    leaveadjustmentBalance: 0,
  },
  {
    officeTime: {
      utcDate: '2022-11-13T03:15:00.000Z',
      hour: '3',
      minute: '25',
    },
    _id: '648a97ef41080bf047a90e44',
    name: 'Anuu Maharjan',
    username: 'anuumaharjan',
    officeEndTime: '2022-11-13T12:15:00.000Z',
    email: 'maharjan.anuu@webexpertsnepal.com',
    photoURL: null,
    role: {
      _id: '62b1906a31f49d10e7717072',
      key: 'normal',
      value: 'Normal',
      permission:
        '[{"Navigation":{"todaysOverview":false,"coWorkers":false,"projects":true,"attendance":true,"logTime":true,"leaveManagement":true,"noticeBoard":true,"blog":true,"reports":false,"resources":true,"settings":false},"Dashboard":{"viewCalendar":true,"viewProjectTimeLogReport":false,"viewTotalCoworkers":true,"viewAnnouncement":true,"viewCoworkersPunhedInToday":true,"viewHolidays":true,"viewPendingLeaveRequest":false,"viewSalaryReview":true,"viewCoworkersOnLeave":false,"viewBirthdays":true,"viewRecentActivities":true,"enableMaintenanceMode":false,"makeclicakbleTotalCoworkers":false,"makeclickableCoworkersPunchIn":false,"makeclickableLeavePendingRequest":false,"makeclickableCoworkersOnLeave":false},"Co-Workers":{"viewCoworkers":false,"exportCoworkers":false,"editCoworkers":false,"importCoworkers":false,"disableCoworkers":false,"resetAllocatedLeaves":false,"switchCoworkers":false},"Projects":{"createProjects":false,"editProjects":false,"viewProjects":true,"deleteProjects":false},"Attendance":{"createMyAttendance":true,"editCoworkersAttendance":false,"deleteCoworkersAttendance":false,"viewMyAttendance":true,"exportCoworkersAttendance":false,"viewMyAttendanceCalendar":true,"viewCoworkersLateAttendance":false,"viewCoworkersAttendance":false,"cutLateArrivalLeave":false,"addCoworkersAttendance":false,"viewCoworkersAttendanceCalendar":false},"Log Time":{"createLogTime":true,"editLogTime":false,"viewLogTime":true,"deleteLogTime":false,"createUserLogTime":false,"viewOtherLogTime":false},"Leave Management":{"applyLeave":true,"viewCoworkersLeaves":false,"viewMyHistory":true,"approveCoworkersLeaves":false,"viewMyLeaveDetails":true,"cancelCoworkersLeaves":false,"cancelMyLeaves":true,"exportCoworkersLeaves":false,"viewLeaves":false,"viewLeavesCalendar":false,"addCoworkersLeaves":false,"editCoworkersLeaves":false},"Notice Board":{"createNotice":false,"editNotice":false,"viewNotice":true,"deleteNotice":false},"Blog":{"createBlog":false,"editBlog":false,"viewBlog":true,"deleteBlog":false},"Reports":{"viewWeeklyReport":false,"viewLeaveReport":false,"editLeaveReport":false,"viewWorkLogReport":false,"viewSalaryReview":false,"viewActivityLog":false,"viewOvertimeReport":false},"Resources":{"createFAQ":false,"viewFAQ":false,"editFAQ":false,"deleteFAQ":false,"createPolicy":false,"viewPolicy":false,"editPolicy":false,"deletePolicy":false,"createHoliday":false,"viewHoliday":true,"editHoliday":true,"deleteHoliday":true},"Settings":{"coWorker":false,"project":false,"coworkerCUD":false,"logTimes":false,"leaveManagements":false,"noticeBoards":false,"blogs":false,"resource":false,"emails":false,"attendance":false}}]',
    },
    status: 'Probation',
    active: false,
    gender: 'Male',
    primaryPhone: 1234567890,
    maritalStatus: 'Unmarried',
    leaveadjustmentBalance: 0,
    lastReviewDate: [],
    isPartTime: false,
    createdAt: '2023-06-15T04:47:43.224Z',
    updatedAt: '2023-06-15T04:47:43.444Z',
    statusChangeDate: '2023-06-15T00:00:00.000Z',
  },
  {
    officeTime: {
      utcDate: '2022-11-13T03:15:00.000Z',
      hour: '3',
      minute: '25',
    },
    officeEndTime: '2022-11-13T12:15:00.000Z',
    isPartTime: false,
    _id: '642cfe315624adf64e3c03e2',
    name: 'As Chettri',
    email: 'chettri.bob1@webexpertsnepal.com',
    photoURL: null,
    role: {
      _id: '62b1901d31f49d10e7717060',
      key: 'admin',
      value: 'Admin',
      permission:
        '[{"Navigation":{"todaysOverview":true,"coWorkers":true,"projects":true,"attendance":true,"logTime":true,"leaveManagement":true,"noticeBoard":true,"blog":true,"reports":true,"resources":true,"settings":true},"Dashboard":{"viewCalendar":true,"viewProjectTimeLogReport":true,"viewTotalCoworkers":true,"viewAnnouncement":true,"viewCoworkersPunhedInToday":true,"viewHolidays":true,"viewPendingLeaveRequest":true,"viewSalaryReview":true,"viewCoworkersOnLeave":true,"viewBirthdays":true,"viewRecentActivities":true,"enableMaintenanceMode":true,"makeclicakbleTotalCoworkers":true,"makeclickableCoworkersPunchIn":true,"makeclickableLeavePendingRequest":true,"makeclickableCoworkersOnLeave":true},"Co-Workers":{"viewCoworkers":true,"exportCoworkers":true,"editCoworkers":true,"importCoworkers":true,"disableCoworkers":true,"resetAllocatedLeaves":true,"switchCoworkers":true},"Projects":{"createProjects":true,"editProjects":true,"viewProjects":true,"deleteProjects":true},"Attendance":{"createMyAttendance":true,"editCoworkersAttendance":true,"deleteCoworkersAttendance":true,"viewMyAttendance":true,"exportCoworkersAttendance":true,"viewMyAttendanceCalendar":true,"viewCoworkersLateAttendance":true,"viewCoworkersAttendance":true,"cutLateArrivalLeave":true,"addCoworkersAttendance":true,"viewCoworkersAttendanceCalendar":true},"Log Time":{"createLogTime":true,"editLogTime":true,"viewLogTime":true,"deleteLogTime":true,"createUserLogTime":true,"viewOtherLogTime":true},"Leave Management":{"applyLeave":true,"viewCoworkersLeaves":true,"viewMyHistory":true,"approveCoworkersLeaves":true,"viewMyLeaveDetails":true,"cancelCoworkersLeaves":true,"cancelMyLeaves":true,"exportCoworkersLeaves":true,"viewLeaves":true,"viewLeavesCalendar":true,"addCoworkersLeaves":true,"editCoworkersLeaves":true},"Notice Board":{"createNotice":true,"editNotice":true,"viewNotice":true,"deleteNotice":true},"Blog":{"createBlog":true,"editBlog":true,"viewBlog":true,"deleteBlog":true},"Reports":{"viewWeeklyReport":true,"viewLeaveReport":true,"editLeaveReport":true,"viewWorkLogReport":true,"viewSalaryReview":true,"viewActivityLog":true,"viewOvertimeReport":true},"Resources":{"createFAQ":true,"viewFAQ":true,"editFAQ":true,"deleteFAQ":true,"createPolicy":true,"viewPolicy":true,"editPolicy":true,"deletePolicy":true,"createHoliday":true,"viewHoliday":true,"editHoliday":true,"deleteHoliday":true},"Settings":{"coWorker":true,"project":true,"coworkerCUD":true,"logTimes":true,"leaveManagements":true,"noticeBoards":true,"blogs":true,"resource":true,"emails":true,"attendance":true}}]',
    },
    status: 'Permanent',
    active: false,
    gender: 'Male',
    primaryPhone: 9756567777,
    maritalStatus: 'Unmarried',
    leaveadjustmentBalance: 0,
    lastReviewDate: [],
    createdAt: '2023-04-05T04:50:57.955Z',
    updatedAt: '2023-04-05T04:50:57.955Z',
  },
  {
    officeTime: {
      utcDate: '2022-11-11T03:15:00Z',
      hour: '3',
      minute: '25',
    },
    _id: '62a99386eb9da2200a98cfed',
    name: 'Ashis Chettri',
    email: 'chettri.ashis@webexpertsnepal.com',
    role: {
      _id: '62b1901d31f49d10e7717060',
      key: 'admin',
      value: 'Admin',
      permission:
        '[{"Navigation":{"todaysOverview":true,"coWorkers":true,"projects":true,"attendance":true,"logTime":true,"leaveManagement":true,"noticeBoard":true,"blog":true,"reports":true,"resources":true,"settings":true},"Dashboard":{"viewCalendar":true,"viewProjectTimeLogReport":true,"viewTotalCoworkers":true,"viewAnnouncement":true,"viewCoworkersPunhedInToday":true,"viewHolidays":true,"viewPendingLeaveRequest":true,"viewSalaryReview":true,"viewCoworkersOnLeave":true,"viewBirthdays":true,"viewRecentActivities":true,"enableMaintenanceMode":true,"makeclicakbleTotalCoworkers":true,"makeclickableCoworkersPunchIn":true,"makeclickableLeavePendingRequest":true,"makeclickableCoworkersOnLeave":true},"Co-Workers":{"viewCoworkers":true,"exportCoworkers":true,"editCoworkers":true,"importCoworkers":true,"disableCoworkers":true,"resetAllocatedLeaves":true,"switchCoworkers":true},"Projects":{"createProjects":true,"editProjects":true,"viewProjects":true,"deleteProjects":true},"Attendance":{"createMyAttendance":true,"editCoworkersAttendance":true,"deleteCoworkersAttendance":true,"viewMyAttendance":true,"exportCoworkersAttendance":true,"viewMyAttendanceCalendar":true,"viewCoworkersLateAttendance":true,"viewCoworkersAttendance":true,"cutLateArrivalLeave":true,"addCoworkersAttendance":true,"viewCoworkersAttendanceCalendar":true},"Log Time":{"createLogTime":true,"editLogTime":true,"viewLogTime":true,"deleteLogTime":true,"createUserLogTime":true,"viewOtherLogTime":true},"Leave Management":{"applyLeave":true,"viewCoworkersLeaves":true,"viewMyHistory":true,"approveCoworkersLeaves":true,"viewMyLeaveDetails":true,"cancelCoworkersLeaves":true,"cancelMyLeaves":true,"exportCoworkersLeaves":true,"viewLeaves":true,"viewLeavesCalendar":true,"addCoworkersLeaves":true,"editCoworkersLeaves":true},"Notice Board":{"createNotice":true,"editNotice":true,"viewNotice":true,"deleteNotice":true},"Blog":{"createBlog":true,"editBlog":true,"viewBlog":true,"deleteBlog":true},"Reports":{"viewWeeklyReport":true,"viewLeaveReport":true,"editLeaveReport":true,"viewWorkLogReport":true,"viewSalaryReview":true,"viewActivityLog":true,"viewOvertimeReport":true},"Resources":{"createFAQ":true,"viewFAQ":true,"editFAQ":true,"deleteFAQ":true,"createPolicy":true,"viewPolicy":true,"editPolicy":true,"deletePolicy":true,"createHoliday":true,"viewHoliday":true,"editHoliday":true,"deleteHoliday":true},"Settings":{"coWorker":true,"project":true,"coworkerCUD":true,"logTimes":true,"leaveManagements":true,"noticeBoards":true,"blogs":true,"resource":true,"emails":true,"attendance":true}}]',
    },
    active: true,
    dob: '2022-06-30T00:00:00.000Z',
    gender: 'Male',
    primaryPhone: 9756567777,
    joinDate: '2021-02-09T00:00:00.000Z',
    maritalStatus: 'Married',
    createdAt: '2022-06-15T08:08:38.476Z',
    updatedAt: '2023-07-21T07:46:52.016Z',
    position: {
      _id: '62b1a710282f826410dc76a6',
      name: 'Management',
    },
    secondaryPhone: 9860104568,
    photoURL:
      'https://firebasestorage.googleapis.com/v0/b/wen-app-qa.appspot.com/o/profile%2Fsm-logo.png?alt=media&token=c8dde465-321b-4c91-8122-33d37ea88027',
    newSalaryReviewDate: null,
    passwordChangedAt: '2023-07-21T07:46:51.384Z',
    allocatedLeaves: {
      firstQuarter: 4,
      secondQuarter: 4,
      thirdQuarter: 4,
      fourthQuarter: 3,
    },
    positionType: {
      _id: '6329a6bb637f5061322b02b5',
      name: 'Management',
    },
    status: 'Permanent',
    passwordResetExpires: '2022-10-12T07:24:47.715Z',
    passwordResetToken: 'b8f466949bbce633933af45c9cf50be8596b67eaa92d23c93f0c72850c4cd6de',
    lastReviewDate: [
      '2022-01-05T18:15:00.000Z',
      '2022-01-06T18:15:00.000Z',
      '2022-01-13T18:15:00.000Z',
      '2023-01-12T18:15:00.000Z',
      '2023-01-15T18:15:00.000Z',
      '2023-01-16T18:15:00.000Z',
      '2023-01-17T18:15:00.000Z',
    ],
    exitDate: null,
    leaveadjustmentBalance: 10,
    leaveadjustmentBalanceBalance: 0,
    officeEndTime: '2022-11-13T07:16:00Z',
    isPartTime: false,
  },
  {
    officeTime: {
      utcDate: '2022-11-13T03:15:00.000Z',
      hour: '3',
      minute: '25',
    },
    officeEndTime: '2022-11-13T12:15:00.000Z',
    leaveadjustmentBalance: 0,
    isPartTime: false,
    _id: '642c14087df02c699323a2cc',
    name: 'Ashis Chettri',
    email: 'chettri.bob@webexpertsnepal.com',
    photoURL: null,
    role: {
      _id: '62b1901d31f49d10e7717060',
      key: 'admin',
      value: 'Admin',
      permission:
        '[{"Navigation":{"todaysOverview":true,"coWorkers":true,"projects":true,"attendance":true,"logTime":true,"leaveManagement":true,"noticeBoard":true,"blog":true,"reports":true,"resources":true,"settings":true},"Dashboard":{"viewCalendar":true,"viewProjectTimeLogReport":true,"viewTotalCoworkers":true,"viewAnnouncement":true,"viewCoworkersPunhedInToday":true,"viewHolidays":true,"viewPendingLeaveRequest":true,"viewSalaryReview":true,"viewCoworkersOnLeave":true,"viewBirthdays":true,"viewRecentActivities":true,"enableMaintenanceMode":true,"makeclicakbleTotalCoworkers":true,"makeclickableCoworkersPunchIn":true,"makeclickableLeavePendingRequest":true,"makeclickableCoworkersOnLeave":true},"Co-Workers":{"viewCoworkers":true,"exportCoworkers":true,"editCoworkers":true,"importCoworkers":true,"disableCoworkers":true,"resetAllocatedLeaves":true,"switchCoworkers":true},"Projects":{"createProjects":true,"editProjects":true,"viewProjects":true,"deleteProjects":true},"Attendance":{"createMyAttendance":true,"editCoworkersAttendance":true,"deleteCoworkersAttendance":true,"viewMyAttendance":true,"exportCoworkersAttendance":true,"viewMyAttendanceCalendar":true,"viewCoworkersLateAttendance":true,"viewCoworkersAttendance":true,"cutLateArrivalLeave":true,"addCoworkersAttendance":true,"viewCoworkersAttendanceCalendar":true},"Log Time":{"createLogTime":true,"editLogTime":true,"viewLogTime":true,"deleteLogTime":true,"createUserLogTime":true,"viewOtherLogTime":true},"Leave Management":{"applyLeave":true,"viewCoworkersLeaves":true,"viewMyHistory":true,"approveCoworkersLeaves":true,"viewMyLeaveDetails":true,"cancelCoworkersLeaves":true,"cancelMyLeaves":true,"exportCoworkersLeaves":true,"viewLeaves":true,"viewLeavesCalendar":true,"addCoworkersLeaves":true,"editCoworkersLeaves":true},"Notice Board":{"createNotice":true,"editNotice":true,"viewNotice":true,"deleteNotice":true},"Blog":{"createBlog":true,"editBlog":true,"viewBlog":true,"deleteBlog":true},"Reports":{"viewWeeklyReport":true,"viewLeaveReport":true,"editLeaveReport":true,"viewWorkLogReport":true,"viewSalaryReview":true,"viewActivityLog":true,"viewOvertimeReport":true},"Resources":{"createFAQ":true,"viewFAQ":true,"editFAQ":true,"deleteFAQ":true,"createPolicy":true,"viewPolicy":true,"editPolicy":true,"deletePolicy":true,"createHoliday":true,"viewHoliday":true,"editHoliday":true,"deleteHoliday":true},"Settings":{"coWorker":true,"project":true,"coworkerCUD":true,"logTimes":true,"leaveManagements":true,"noticeBoards":true,"blogs":true,"resource":true,"emails":true,"attendance":true}}]',
    },
    status: 'Permanent',
    allocatedLeaves: {
      firstQuarter: 4,
      secondQuarter: 4,
      thirdQuarter: 4,
      fourthQuarter: 3,
    },
    active: false,
    gender: 'Male',
    primaryPhone: 9756567777,
    maritalStatus: 'Unmarried',
    lastReviewDate: [],
    createdAt: '2023-04-04T12:11:52.768Z',
    updatedAt: '2023-04-04T12:11:52.768Z',
  },
]

export const PROJECTS = [
  {
    _id: '648859af607686724b4caa80',
    name: 'Utsab Neupane',
    priority: true,
    path: 'W:\\fortress-projects\\lawyer-marketing',
    estimatedHours: 10,
    startDate: '2023-06-13T00:00:00.000Z',
    endDate: '2023-06-17T00:00:00.000Z',
    projectTypes: [],
    projectStatus: {
      _id: '62b1c12898aee94c2cb06884',
      name: 'Awaiting Response',
    },
    projectTags: [],
    developers: [],
    designers: [],
    qa: [],
    devOps: [],
    stagingUrls: [],
    maintenance: [
      {
        enabled: false,
        selectMonths: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December',
        ],
        emailDay: 10,
        _id: '64b4f556aee7cc56a87c9595',
      },
    ],
    totalTimeSpent: 0,
    weeklyTimeSpent: 2,
    createdBy: {
      _id: '62a99386eb9da2200a98cfed',
      name: 'Ashis Chettri',
      positionType: {
        _id: '6329a6bb637f5061322b02b5',
        name: 'Management',
      },
    },
    createdAt: '2023-06-13T11:57:35.342Z',
    updatedAt: '2023-07-17T08:02:02.849Z',
    slug: 'utsab-neupane',
    notes: '',
    updatedBy: {
      _id: '62a99386eb9da2200a98cfed',
      name: 'Ashis Chettri',
      positionType: {
        _id: '6329a6bb637f5061322b02b5',
        name: 'Management',
      },
    },
    client: {
      _id: '62aaea25e37359fff7ab7441',
      name: 'Cyber Projects',
    },
    estimateHistory: [
      {
        estimatedHours: 10,
        updatedBy: {
          _id: '62a99386eb9da2200a98cfed',
          name: 'Ashis Chettri',
        },
        updatedAt: '2023-07-17T08:01:54.555Z',
        _id: '64b4f57a204a4fbc54681f78',
      },
    ],
    id: '648859af607686724b4caa80',
  },
  {
    _id: '6475e10f86334a9b40e27678',
    name: 'Utsab test57',
    priority: false,
    path: 'W:\\online-karma\\kurse-bs',
    startDate: '2023-05-30T00:00:00.000Z',
    projectTypes: [
      {
        _id: '62b1c3645d899f47df762a26',
        name: 'Plugin Development',
      },
    ],
    projectStatus: {
      _id: '62b1c13d98aee94c2cb06890',
      name: 'Need Follow Up',
    },
    projectTags: [
      {
        _id: '62aae553602fc10039885da9',
        name: 'HubSpot',
      },
    ],
    developers: [
      {
        _id: '646efb682bac34cd030a8837',
        name: 'Joe Biden',
        positionType: {
          _id: '62ff3e6b7582860104c727f3',
          name: 'Developer',
        },
      },
    ],
    designers: [
      {
        _id: '62f0840e242e869058d23bb6',
        name: 'Raul Shahi',
        positionType: {
          _id: '62ff3c816275a483c8e69048',
          name: 'Designer',
        },
      },
      {
        _id: '62a9c21a09c4f048f5a12dfb',
        name: 'Rosan Naga',
        positionType: {
          _id: '62ff3c816275a483c8e69048',
          name: 'Designer',
        },
      },
    ],
    qa: [
      {
        _id: '62b3f5f29beb61203b4ffc77',
        name: 'Niva Maharjan',
        positionType: {
          _id: '63089be90206d0f581f1c05a',
          name: 'QA',
        },
      },
    ],
    devOps: [
      {
        _id: '62b3f3af9beb61203b4ffc31',
        name: 'Bikesh sugar',
        positionType: {
          _id: '62ff3cb46275a483c8e69050',
          name: 'DevOps',
        },
      },
    ],
    stagingUrls: [],
    maintenance: [
      {
        enabled: true,
        selectMonths: ['May'],
        emailDay: 30,
        _id: '648aacbb19fdd03322591d42',
      },
    ],
    totalTimeSpent: 0,
    weeklyTimeSpent: 0,
    createdBy: {
      _id: '62a99386eb9da2200a98cfed',
      name: 'Ashis Chettri',
      positionType: {
        _id: '6329a6bb637f5061322b02b5',
        name: 'Management',
      },
    },
    createdAt: '2023-05-30T11:42:07.682Z',
    updatedAt: '2023-07-17T08:02:02.798Z',
    slug: 'utsab-test57',
    notes: '',
    updatedBy: {
      _id: '62a99386eb9da2200a98cfed',
      name: 'Ashis Chettri',
      positionType: {
        _id: '6329a6bb637f5061322b02b5',
        name: 'Management',
      },
    },
    estimatedHours: 24,
    client: {
      _id: '62aaea46e37359fff7ab7450',
      name: 'Kickstartup',
    },
    estimateHistory: [
      {
        estimatedHours: 24,
        updatedBy: {
          _id: '62a99386eb9da2200a98cfed',
          name: 'Ashis Chettri',
        },
        updatedAt: '2023-07-17T08:01:54.555Z',
        _id: '64b4f57a204a4fbc54681f76',
      },
    ],
    id: '6475e10f86334a9b40e27678',
  },
  {
    _id: '6475df1f00f0b23f1020f18f',
    name: 'Utsab test 5',
    priority: false,
    path: 'W:\\online-karma\\kurse-bs',
    startDate: '2023-05-30T00:00:00.000Z',
    projectTypes: [],
    projectStatus: {
      _id: '62b1c14b98aee94c2cb06896',
      name: 'On Going',
    },
    projectTags: [],
    developers: [
      {
        _id: '637b1b178656661a10ac8eb8',
        name: 'Jsonss',
        positionType: {
          _id: '62ff3e6b7582860104c727f3',
          name: 'Developer',
        },
      },
      {
        _id: '636dc311153d970acb826618',
        name: 'Michael Jackson Image',
        positionType: {
          _id: '62ff3e6b7582860104c727f3',
          name: 'Developer',
        },
      },
      {
        _id: '62b3f6d49beb61203b4ffca5',
        name: 'Pariskrit Moktan',
        positionType: {
          _id: '62ff3e6b7582860104c727f3',
          name: 'Developer',
        },
      },
    ],
    designers: [
      {
        _id: '62a9c21a09c4f048f5a12dfb',
        name: 'Rosan Naga',
        positionType: {
          _id: '62ff3c816275a483c8e69048',
          name: 'Designer',
        },
      },
      {
        _id: '62b3f5969beb61203b4ffc69',
        name: 'Sabin Sharma',
        positionType: {
          _id: '62ff3c816275a483c8e69048',
          name: 'Designer',
        },
      },
    ],
    qa: [],
    devOps: [],
    stagingUrls: [],
    maintenance: [
      {
        enabled: true,
        selectMonths: ['May'],
        emailDay: 28,
        _id: '64898523e5c3c20d642ca90a',
      },
    ],
    totalTimeSpent: 0,
    weeklyTimeSpent: 0,
    createdBy: {
      _id: '62a99386eb9da2200a98cfed',
      name: 'Ashis Chettri',
      positionType: {
        _id: '6329a6bb637f5061322b02b5',
        name: 'Management',
      },
    },
    createdAt: '2023-05-30T11:33:51.239Z',
    updatedAt: '2023-07-17T08:02:02.744Z',
    slug: 'utsab-test-5',
    notes: '',
    updatedBy: {
      _id: '62a99386eb9da2200a98cfed',
      name: 'Ashis Chettri',
      positionType: {
        _id: '6329a6bb637f5061322b02b5',
        name: 'Management',
      },
    },
    estimatedHours: 30,
    estimateHistory: [
      {
        estimatedHours: 30,
        updatedBy: {
          _id: '62a99386eb9da2200a98cfed',
          name: 'Ashis Chettri',
        },
        updatedAt: '2023-07-17T08:01:54.555Z',
        _id: '64b4f57a204a4fbc54681f74',
      },
    ],
    id: '6475df1f00f0b23f1020f18f',
  },
  {
    _id: '6475da975f344c14d04e75bd',
    name: 'Susan test',
    priority: false,
    path: 'W:\\online-karma\\kurse-bs',
    startDate: '2023-05-01T00:00:00.000Z',
    projectTypes: [],
    projectStatus: {
      _id: '62b1c13d98aee94c2cb06890',
      name: 'Need Follow Up',
    },
    projectTags: [],
    developers: [
      {
        _id: '62b3f6949beb61203b4ffc97',
        name: 'Ashok Ganika',
        positionType: {
          _id: '62ff3e6b7582860104c727f3',
          name: 'Developer',
        },
      },
      {
        _id: '62b3f52a9beb61203b4ffc5b',
        name: 'Bhawana Khadka',
        positionType: {
          _id: '62ff3e6b7582860104c727f3',
          name: 'Developer',
        },
      },
    ],
    designers: [],
    qa: [],
    devOps: [],
    stagingUrls: [],
    maintenance: [
      {
        enabled: false,
        selectMonths: ['May'],
        emailDay: 31,
        _id: '64773a5c13420a796300f07d',
      },
    ],
    totalTimeSpent: 0,
    weeklyTimeSpent: 0,
    createdBy: {
      _id: '62a99386eb9da2200a98cfed',
      name: 'Ashis Chettri',
      positionType: {
        _id: '6329a6bb637f5061322b02b5',
        name: 'Management',
      },
    },
    createdAt: '2023-05-30T11:14:31.657Z',
    updatedAt: '2023-07-17T08:02:02.692Z',
    slug: 'susan-test',
    notes: '',
    updatedBy: {
      _id: '62a99386eb9da2200a98cfed',
      name: 'Ashis Chettri',
      positionType: {
        _id: '6329a6bb637f5061322b02b5',
        name: 'Management',
      },
    },
    estimateHistory: [
      {
        estimatedHours: 0,
        updatedBy: {
          _id: '62a99386eb9da2200a98cfed',
          name: 'Ashis Chettri',
        },
        updatedAt: '2023-07-17T08:01:54.555Z',
        _id: '64b4f57a204a4fbc54681f72',
      },
    ],
    id: '6475da975f344c14d04e75bd',
  },
  {
    _id: '644f810cb425966c8cee01c0',
    name: 'OT-test',
    priority: false,
    path: 'W:\\kickstartup-projects\\matigmi',
    startDate: '2023-05-01T00:00:00.000Z',
    projectTypes: [],
    projectStatus: {
      _id: '62b1c13198aee94c2cb0688a',
      name: 'Completed',
    },
    projectTags: [],
    developers: [],
    designers: [
      {
        _id: '62b3f4b79beb61203b4ffc4d',
        name: 'Anuj Maharjan',
        positionType: {
          _id: '62ff3c816275a483c8e69048',
          name: 'Designer',
        },
      },
      {
        _id: '62f0840e242e869058d23bb6',
        name: 'Raul Shahi',
        positionType: {
          _id: '62ff3c816275a483c8e69048',
          name: 'Designer',
        },
      },
    ],
    qa: [],
    devOps: [],
    stagingUrls: [],
    maintenance: [
      {
        enabled: true,
        selectMonths: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December',
        ],
        emailDay: 31,
        sendEmailTo: 'khadka.bhawana@webexpertsnepal.com',
        _id: '64773a5013420a796300f052',
      },
    ],
    totalTimeSpent: 14.5,
    weeklyTimeSpent: 14.5,
    createdBy: {
      _id: '62a99386eb9da2200a98cfed',
      name: 'Ashis Chettri',
      positionType: {
        _id: '6329a6bb637f5061322b02b5',
        name: 'Management',
      },
    },
    createdAt: '2023-05-01T09:06:20.840Z',
    updatedAt: '2023-07-17T08:02:02.637Z',
    slug: 'ot-test',
    notes: '',
    updatedBy: {
      _id: '62a99386eb9da2200a98cfed',
      name: 'Ashis Chettri',
      positionType: {
        _id: '6329a6bb637f5061322b02b5',
        name: 'Management',
      },
    },
    estimateHistory: [
      {
        estimatedHours: 0,
        updatedBy: {
          _id: '62a99386eb9da2200a98cfed',
          name: 'Ashis Chettri',
        },
        updatedAt: '2023-07-17T08:01:54.555Z',
        _id: '64b4f57a204a4fbc54681f70',
      },
    ],
    id: '644f810cb425966c8cee01c0',
  },
  {
    _id: '64477eb7bc8a5e623c19fb6e',
    name: 'Urvashi',
    priority: true,
    path: 'W:\\chantel-maalouf',
    startDate: '2023-04-29T00:00:00.000Z',
    projectTypes: [],
    projectStatus: {
      _id: '62b1c15598aee94c2cb0689c',
      name: 'On Hold',
    },
    projectTags: [],
    developers: [],
    designers: [],
    qa: [],
    devOps: [],
    stagingUrls: [],
    maintenance: [
      {
        enabled: false,
        selectMonths: [],
        _id: '64478406bc8a5e623c19fcfb',
      },
    ],
    totalTimeSpent: 0,
    weeklyTimeSpent: 0,
    createdBy: {
      _id: '62a99386eb9da2200a98cfed',
      name: 'Ashis Chettri',
      positionType: {
        _id: '6329a6bb637f5061322b02b5',
        name: 'Management',
      },
    },
    createdAt: '2023-04-25T07:18:15.343Z',
    updatedAt: '2023-07-17T08:02:02.580Z',
    slug: 'urvashi',
    notes: '',
    updatedBy: {
      _id: '62a99386eb9da2200a98cfed',
      name: 'Ashis Chettri',
      positionType: {
        _id: '6329a6bb637f5061322b02b5',
        name: 'Management',
      },
    },
    estimateHistory: [
      {
        estimatedHours: 0,
        updatedBy: {
          _id: '62a99386eb9da2200a98cfed',
          name: 'Ashis Chettri',
        },
        updatedAt: '2023-07-17T08:01:54.555Z',
        _id: '64b4f57a204a4fbc54681f6e',
      },
    ],
    id: '64477eb7bc8a5e623c19fb6e',
  },
  {
    _id: '64477bfbbc8a5e623c19faf5',
    name: 'Madhuri Dixit',
    priority: true,
    path: 'W:\\fortress-projects\\accretive-portco',
    startDate: '2023-04-15T00:00:00.000Z',
    projectTypes: [
      {
        _id: '62b1c37f5d899f47df762a38',
        name: 'React',
      },
    ],
    projectStatus: {
      _id: '62b1c14b98aee94c2cb06896',
      name: 'On Going',
    },
    projectTags: [
      {
        _id: '62aae55d602fc10039885dac',
        name: 'LearnDash',
      },
    ],
    client: {
      _id: '62aaea46e37359fff7ab7450',
      name: 'Kickstartup',
    },
    developers: [
      {
        _id: '636dc311153d970acb826618',
        name: 'Michael Jackson Image',
        positionType: {
          _id: '62ff3e6b7582860104c727f3',
          name: 'Developer',
        },
      },
    ],
    designers: [
      {
        _id: '636cd565088d4190195bc5d0',
        name: 'marley',
        positionType: {
          _id: '62ff3c816275a483c8e69048',
          name: 'Designer',
        },
      },
    ],
    qa: [
      {
        _id: '62b3f5f29beb61203b4ffc77',
        name: 'Niva Maharjan',
        positionType: {
          _id: '63089be90206d0f581f1c05a',
          name: 'QA',
        },
      },
    ],
    devOps: [
      {
        _id: '62a9c26f09c4f048f5a12e03',
        name: 'Subir Shakya',
        positionType: {
          _id: '62ff3cb46275a483c8e69050',
          name: 'DevOps',
        },
      },
    ],
    stagingUrls: ['bob@madhuri.com'],
    liveUrl: 'madhuri.dixit.com',
    notes: 'mmaaaaaaaaaadhuuuuuuuuuriiiiiiiiiiiiiii',
    maintenance: [
      {
        enabled: false,
        selectMonths: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December',
        ],
        _id: '64477e5602112bbac72c6a54',
      },
    ],
    totalTimeSpent: 0,
    weeklyTimeSpent: 0,
    createdBy: {
      _id: '62a99386eb9da2200a98cfed',
      name: 'Ashis Chettri',
      positionType: {
        _id: '6329a6bb637f5061322b02b5',
        name: 'Management',
      },
    },
    createdAt: '2023-04-25T07:06:35.302Z',
    updatedAt: '2023-07-17T08:02:02.496Z',
    slug: 'madhuri-dixit',
    updatedBy: {
      _id: '62a99386eb9da2200a98cfed',
      name: 'Ashis Chettri',
      positionType: {
        _id: '6329a6bb637f5061322b02b5',
        name: 'Management',
      },
    },
    estimateHistory: [
      {
        estimatedHours: 0,
        updatedBy: {
          _id: '62a99386eb9da2200a98cfed',
          name: 'Ashis Chettri',
        },
        updatedAt: '2023-07-17T08:01:54.555Z',
        _id: '64b4f57a204a4fbc54681f6c',
      },
    ],
    id: '64477bfbbc8a5e623c19faf5',
  },
  {
    _id: '64477b83bc8a5e623c19faad',
    name: 'Kay Sara Sara Bob',
    priority: false,
    path: 'W:\\ferras-projects\\headwind',
    startDate: '2023-04-21T00:00:00.000Z',
    projectTypes: [],
    projectStatus: {
      _id: '62b1c14b98aee94c2cb06896',
      name: 'On Going',
    },
    projectTags: [],
    developers: [],
    designers: [],
    qa: [],
    devOps: [],
    stagingUrls: [],
    maintenance: [
      {
        enabled: false,
        selectMonths: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December',
        ],
        _id: '64477d04bc8a5e623c19fb48',
      },
    ],
    totalTimeSpent: 0,
    weeklyTimeSpent: 0,
    createdBy: {
      _id: '62a99386eb9da2200a98cfed',
      name: 'Ashis Chettri',
      positionType: {
        _id: '6329a6bb637f5061322b02b5',
        name: 'Management',
      },
    },
    createdAt: '2023-04-25T07:04:35.108Z',
    updatedAt: '2023-07-17T08:02:02.445Z',
    slug: 'kay-sara-sara-bob',
    notes: '',
    updatedBy: {
      _id: '62a99386eb9da2200a98cfed',
      name: 'Ashis Chettri',
      positionType: {
        _id: '6329a6bb637f5061322b02b5',
        name: 'Management',
      },
    },
    estimateHistory: [
      {
        estimatedHours: 0,
        updatedBy: {
          _id: '62a99386eb9da2200a98cfed',
          name: 'Ashis Chettri',
        },
        updatedAt: '2023-07-17T08:01:54.555Z',
        _id: '64b4f57a204a4fbc54681f6a',
      },
    ],
    id: '64477b83bc8a5e623c19faad',
  },
  {
    _id: '644775a906624d540625f9ee',
    name: 'Ashok',
    priority: false,
    path: 'W:\\kickstartup-projects\\matigmi',
    startDate: '2023-04-25T00:00:00.000Z',
    projectTypes: [],
    projectStatus: {
      _id: '62b1c12898aee94c2cb06884',
      name: 'Awaiting Response',
    },
    projectTags: [],
    developers: [],
    designers: [],
    qa: [],
    devOps: [],
    stagingUrls: [],
    maintenance: [
      {
        enabled: false,
        selectMonths: [],
        _id: '644775a906624d540625f9ef',
      },
    ],
    totalTimeSpent: 0,
    weeklyTimeSpent: 0,
    createdBy: {
      _id: '62a99386eb9da2200a98cfed',
      name: 'Ashis Chettri',
      positionType: {
        _id: '6329a6bb637f5061322b02b5',
        name: 'Management',
      },
    },
    createdAt: '2023-04-25T06:39:37.583Z',
    updatedAt: '2023-07-17T08:02:02.386Z',
    slug: 'ashok',
    estimateHistory: [
      {
        estimatedHours: 0,
        updatedBy: {
          _id: '62a99386eb9da2200a98cfed',
          name: 'Ashis Chettri',
        },
        updatedAt: '2023-07-17T08:01:54.555Z',
        _id: '64b4f57a204a4fbc54681f68',
      },
    ],
    id: '644775a906624d540625f9ee',
  },
  {
    _id: '63f35b3b014db7a10e6bc230',
    name: 'Susan Dai',
    priority: false,
    path: 'W:\\ferras-projects\\headwind',
    startDate: '2023-02-20T00:00:00.000Z',
    projectTypes: [
      {
        _id: '62b1c3555d899f47df762a1a',
        name: 'Maintenance',
      },
    ],
    projectStatus: {
      _id: '62b1c13198aee94c2cb0688a',
      name: 'Completed',
    },
    projectTags: [
      {
        _id: '62aae51b602fc10039885d9a',
        name: 'Divi Theme',
      },
      {
        _id: '62aae530602fc10039885da0',
        name: 'Enfold Theme',
      },
      {
        _id: '62aae549602fc10039885da6',
        name: 'Grandtour Theme',
      },
      {
        _id: '62aae58a602fc10039885db5',
        name: 'WooCommerce',
      },
      {
        _id: '62aae572602fc10039885db2',
        name: 'Multilanguage',
      },
      {
        _id: '62aae55d602fc10039885dac',
        name: 'LearnDash',
      },
      {
        _id: '62aae565602fc10039885daf',
        name: 'Multisite',
      },
      {
        _id: '62aae553602fc10039885da9',
        name: 'HubSpot',
      },
    ],
    developers: [
      {
        _id: '62b3f6949beb61203b4ffc97',
        name: 'Ashok Ganika',
        positionType: {
          _id: '62ff3e6b7582860104c727f3',
          name: 'Developer',
        },
      },
    ],
    designers: [
      {
        _id: '62f0840e242e869058d23bb6',
        name: 'Raul Shahi',
        positionType: {
          _id: '62ff3c816275a483c8e69048',
          name: 'Designer',
        },
      },
    ],
    qa: [
      {
        _id: '62b3f5f29beb61203b4ffc77',
        name: 'Niva Maharjan',
        positionType: {
          _id: '63089be90206d0f581f1c05a',
          name: 'QA',
        },
      },
    ],
    devOps: [
      {
        _id: '62a9c26f09c4f048f5a12e03',
        name: 'Subir Shakya',
        positionType: {
          _id: '62ff3cb46275a483c8e69050',
          name: 'DevOps',
        },
      },
    ],
    stagingUrls: [],
    maintenance: [
      {
        enabled: false,
        selectMonths: [],
        _id: '644775c106624d540625fa10',
      },
    ],
    totalTimeSpent: 163,
    weeklyTimeSpent: 3,
    createdBy: {
      _id: '62a99386eb9da2200a98cfed',
      name: 'Ashis Chettri',
      positionType: {
        _id: '6329a6bb637f5061322b02b5',
        name: 'Management',
      },
    },
    createdAt: '2023-02-20T11:36:27.377Z',
    updatedAt: '2023-07-17T08:02:02.285Z',
    slug: 'susan-dai',
    notes: '',
    updatedBy: {
      _id: '62a99386eb9da2200a98cfed',
      name: 'Ashis Chettri',
      positionType: {
        _id: '6329a6bb637f5061322b02b5',
        name: 'Management',
      },
    },
    client: {
      _id: '62aaea2de37359fff7ab7444',
      name: 'Ferras',
    },
    estimateHistory: [
      {
        estimatedHours: 0,
        updatedBy: {
          _id: '62a99386eb9da2200a98cfed',
          name: 'Ashis Chettri',
        },
        updatedAt: '2023-07-17T08:01:54.555Z',
        _id: '64b4f57a204a4fbc54681f66',
      },
    ],
    id: '63f35b3b014db7a10e6bc230',
  },
  {
    _id: '63f35ad3014db7a10e6bc1fb',
    name: 'Susan dangol',
    priority: true,
    path: 'W:\\uwl',
    startDate: '2023-02-22T00:00:00.000Z',
    projectTypes: [],
    projectStatus: {
      _id: '62b1c13d98aee94c2cb06890',
      name: 'Need Follow Up',
    },
    projectTags: [],
    developers: [],
    designers: [],
    qa: [],
    devOps: [],
    stagingUrls: [],
    maintenance: [
      {
        enabled: false,
        selectMonths: [],
        _id: '64899ec97af90a0dfd97f696',
      },
    ],
    totalTimeSpent: 21,
    weeklyTimeSpent: 2,
    createdBy: {
      _id: '62a99386eb9da2200a98cfed',
      name: 'Ashis Chettri',
      positionType: {
        _id: '6329a6bb637f5061322b02b5',
        name: 'Management',
      },
    },
    createdAt: '2023-02-20T11:34:43.939Z',
    updatedAt: '2023-07-17T08:02:02.185Z',
    slug: 'susan-dangol',
    notes: '',
    updatedBy: {
      _id: '62a99386eb9da2200a98cfed',
      name: 'Ashis Chettri',
      positionType: {
        _id: '6329a6bb637f5061322b02b5',
        name: 'Management',
      },
    },
    estimateHistory: [
      {
        estimatedHours: 0,
        updatedBy: {
          _id: '62a99386eb9da2200a98cfed',
          name: 'Ashis Chettri',
        },
        updatedAt: '2023-07-17T08:01:54.555Z',
        _id: '64b4f57a204a4fbc54681f64',
      },
    ],
    id: '63f35ad3014db7a10e6bc1fb',
  },
  {
    _id: '63f3461d014db7a10e6bc1d6',
    name: 'Utsab-nepal',
    priority: false,
    path: 'https://www.linkedin.com/feed/',
    estimatedHours: 10,
    startDate: '2023-02-22T00:00:00.000Z',
    projectTypes: [],
    projectStatus: {
      _id: '62b1c13d98aee94c2cb06890',
      name: 'Need Follow Up',
    },
    projectTags: [],
    developers: [],
    designers: [],
    qa: [],
    devOps: [],
    stagingUrls: [],
    maintenance: [
      {
        enabled: false,
        selectMonths: [],
        _id: '63f3461d014db7a10e6bc1d7',
      },
    ],
    totalTimeSpent: 25.75,
    weeklyTimeSpent: 1,
    createdBy: {
      _id: '62a99386eb9da2200a98cfed',
      name: 'Ashis Chettri',
      positionType: {
        _id: '6329a6bb637f5061322b02b5',
        name: 'Management',
      },
    },
    createdAt: '2023-02-20T10:06:21.687Z',
    updatedAt: '2023-07-17T08:02:02.121Z',
    slug: 'utsab-nepal',
    estimateHistory: [
      {
        estimatedHours: 10,
        updatedBy: {
          _id: '62a99386eb9da2200a98cfed',
          name: 'Ashis Chettri',
        },
        updatedAt: '2023-07-17T08:01:54.555Z',
        _id: '64b4f57a204a4fbc54681f62',
      },
    ],
    id: '63f3461d014db7a10e6bc1d6',
  },
  {
    _id: '63c0e756bdb1b6d257de52c7',
    name: 'Completed',
    priority: false,
    path: 'timro.najar',
    estimatedHours: 45,
    startDate: '2023-01-07T00:00:00.000Z',
    projectTypes: [],
    projectStatus: {
      _id: '62b1c13198aee94c2cb0688a',
      name: 'Completed',
    },
    projectTags: [],
    developers: [],
    designers: [],
    qa: [],
    devOps: [],
    stagingUrls: [],
    maintenance: [
      {
        enabled: false,
        selectMonths: [],
        _id: '63c0e756bdb1b6d257de52c8',
      },
    ],
    totalTimeSpent: 38.5,
    weeklyTimeSpent: 0,
    createdBy: {
      _id: '62a99386eb9da2200a98cfed',
      name: 'Ashis Chettri',
      positionType: {
        _id: '6329a6bb637f5061322b02b5',
        name: 'Management',
      },
    },
    createdAt: '2023-01-13T05:08:38.083Z',
    updatedAt: '2023-07-17T08:02:02.068Z',
    slug: 'completed',
    estimateHistory: [
      {
        estimatedHours: 45,
        updatedBy: {
          _id: '62a99386eb9da2200a98cfed',
          name: 'Ashis Chettri',
        },
        updatedAt: '2023-07-17T08:01:54.555Z',
        _id: '64b4f57a204a4fbc54681f60',
      },
    ],
    id: '63c0e756bdb1b6d257de52c7',
  },
  {
    _id: '63c0df20bdb1b6d257de4fb6',
    name: 'Zoro Dangol',
    priority: false,
    path: 'W:\\kickstartup-projects\\matigmi',
    estimatedHours: 34,
    startDate: '2023-01-11T00:00:00.000Z',
    endDate: '2023-01-12T00:00:00.000Z',
    projectTypes: [
      {
        _id: '62b1c34e5d899f47df762a14',
        name: 'Fixing',
      },
    ],
    projectStatus: {
      _id: '62b1c13198aee94c2cb0688a',
      name: 'Completed',
    },
    projectTags: [
      {
        _id: '62aae4c615ab9aa04e49afa2',
        name: 'Avada',
      },
    ],
    client: {
      _id: '62aaea16e37359fff7ab743e',
      name: 'Brainsell',
    },
    developers: [
      {
        _id: '62b3f6949beb61203b4ffc97',
        name: 'Ashok Ganika',
        positionType: {
          _id: '62ff3e6b7582860104c727f3',
          name: 'Developer',
        },
      },
    ],
    designers: [
      {
        _id: '62b3f4b79beb61203b4ffc4d',
        name: 'Anuj Maharjan',
        positionType: {
          _id: '62ff3c816275a483c8e69048',
          name: 'Designer',
        },
      },
    ],
    qa: [
      {
        _id: '6385b59db184cb459af54462',
        name: 'Avengers Endgame',
        positionType: {
          _id: '63089be90206d0f581f1c05a',
          name: 'QA',
        },
      },
    ],
    devOps: [
      {
        _id: '62b3f3649beb61203b4ffc22',
        name: 'Bijay karki',
        positionType: {
          _id: '62ff3cb46275a483c8e69050',
          name: 'DevOps',
        },
      },
    ],
    stagingUrls: ['testt.tess'],
    liveUrl: 'teee.st',
    maintenance: [
      {
        enabled: true,
        selectMonths: ['June'],
        emailDay: 1,
        _id: '647838f9b8d7d55243f699f7',
      },
    ],
    totalTimeSpent: 0.25,
    weeklyTimeSpent: 0,
    createdBy: {
      _id: '62a99386eb9da2200a98cfed',
      name: 'Ashis Chettri',
      positionType: {
        _id: '6329a6bb637f5061322b02b5',
        name: 'Management',
      },
    },
    createdAt: '2023-01-13T04:33:36.668Z',
    updatedAt: '2023-07-17T08:02:02.014Z',
    slug: 'zoro-dangol',
    notes: '',
    updatedBy: {
      _id: '62a99386eb9da2200a98cfed',
      name: 'Ashis Chettri',
      positionType: {
        _id: '6329a6bb637f5061322b02b5',
        name: 'Management',
      },
    },
    estimateHistory: [
      {
        estimatedHours: 34,
        updatedBy: {
          _id: '62a99386eb9da2200a98cfed',
          name: 'Ashis Chettri',
        },
        updatedAt: '2023-07-17T08:01:54.555Z',
        _id: '64b4f57a204a4fbc54681f5e',
      },
    ],
    id: '63c0df20bdb1b6d257de4fb6',
  },
  {
    _id: '63b668e7d1bdbe5f7ee8460a',
    name: 'Testing_project',
    priority: false,
    path: 'test.test',
    estimatedHours: 33,
    startDate: '2023-01-06T00:00:00.000Z',
    endDate: '2023-01-20T00:00:00.000Z',
    projectTypes: [
      {
        _id: '62b1c34e5d899f47df762a14',
        name: 'Fixing',
      },
      {
        _id: '62b1c3455d899f47df762a0e',
        name: 'Custom Build',
      },
    ],
    projectStatus: {
      _id: '62b1c13198aee94c2cb0688a',
      name: 'Completed',
    },
    projectTags: [
      {
        _id: '62aae527602fc10039885d9d',
        name: 'Elementor',
      },
      {
        _id: '62aae55d602fc10039885dac',
        name: 'LearnDash',
      },
      {
        _id: '62aae530602fc10039885da0',
        name: 'Enfold Theme',
      },
    ],
    client: {
      _id: '62aaea16e37359fff7ab743e',
      name: 'Brainsell',
    },
    developers: [
      {
        _id: '6332b1bac30e9700061b7e63',
        name: 'Susan Dangol',
        positionType: {
          _id: '62ff3e6b7582860104c727f3',
          name: 'Developer',
        },
      },
    ],
    designers: [
      {
        _id: '62b3f4b79beb61203b4ffc4d',
        name: 'Anuj Maharjan',
        positionType: {
          _id: '62ff3c816275a483c8e69048',
          name: 'Designer',
        },
      },
    ],
    qa: [
      {
        _id: '62b3f5f29beb61203b4ffc77',
        name: 'Niva Maharjan',
        positionType: {
          _id: '63089be90206d0f581f1c05a',
          name: 'QA',
        },
      },
    ],
    devOps: [
      {
        _id: '62b3f3649beb61203b4ffc22',
        name: 'Bijay karki',
        positionType: {
          _id: '62ff3cb46275a483c8e69050',
          name: 'DevOps',
        },
      },
    ],
    stagingUrls: ['test.test'],
    liveUrl: 'test.test',
    maintenance: [
      {
        enabled: false,
        selectMonths: [],
        _id: '63c0f504bdb1b6d257de531a',
      },
    ],
    totalTimeSpent: 3.25,
    weeklyTimeSpent: 3.25,
    createdBy: {
      _id: '62a99386eb9da2200a98cfed',
      name: 'Ashis Chettri',
      positionType: {
        _id: '6329a6bb637f5061322b02b5',
        name: 'Management',
      },
    },
    createdAt: '2023-01-05T06:06:31.668Z',
    updatedAt: '2023-07-17T08:02:01.962Z',
    slug: 'testing_project',
    notes: '',
    updatedBy: {
      _id: '62a99386eb9da2200a98cfed',
      name: 'Ashis Chettri',
      positionType: {
        _id: '6329a6bb637f5061322b02b5',
        name: 'Management',
      },
    },
    estimateHistory: [
      {
        estimatedHours: 33,
        updatedBy: {
          _id: '62a99386eb9da2200a98cfed',
          name: 'Ashis Chettri',
        },
        updatedAt: '2023-07-17T08:01:54.555Z',
        _id: '64b4f579204a4fbc54681f5c',
      },
    ],
    id: '63b668e7d1bdbe5f7ee8460a',
  },
  {
    _id: '63a438170d90bb919c360db5',
    name: '340Prroject - (asd2323)',
    priority: false,
    path: 'asdasd asd',
    startDate: '2022-12-23T00:00:00.000Z',
    projectTypes: [
      {
        _id: '62b1c37f5d899f47df762a38',
        name: 'React',
      },
    ],
    projectStatus: {
      _id: '62b1c13d98aee94c2cb06890',
      name: 'Need Follow Up',
    },
    projectTags: [],
    developers: [],
    designers: [],
    qa: [],
    devOps: [],
    stagingUrls: [],
    maintenance: [
      {
        enabled: false,
        selectMonths: [],
        _id: '63a58768a1539e91d6bcb961',
      },
    ],
    totalTimeSpent: 40.25,
    weeklyTimeSpent: 30,
    createdBy: {
      _id: '62a99386eb9da2200a98cfed',
      name: 'Ashis Chettri',
      positionType: {
        _id: '6329a6bb637f5061322b02b5',
        name: 'Management',
      },
    },
    createdAt: '2022-12-22T10:57:27.263Z',
    updatedAt: '2023-07-17T08:02:01.875Z',
    slug: '340prroject-(asd2323)',
    notes: '',
    updatedBy: {
      _id: '62a99386eb9da2200a98cfed',
      name: 'Ashis Chettri',
      positionType: {
        _id: '6329a6bb637f5061322b02b5',
        name: 'Management',
      },
    },
    estimateHistory: [
      {
        estimatedHours: 0,
        updatedBy: {
          _id: '62a99386eb9da2200a98cfed',
          name: 'Ashis Chettri',
        },
        updatedAt: '2023-07-17T08:01:54.555Z',
        _id: '64b4f579204a4fbc54681f5a',
      },
    ],
    id: '63a438170d90bb919c360db5',
  },
]
