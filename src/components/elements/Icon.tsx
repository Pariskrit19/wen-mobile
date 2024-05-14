import * as React from 'react'
import { View } from 'react-native'
import { defaultIconColor, defaultIconFillColor } from 'styles/colors'
import MyText from './MyText'

import Calendar from 'assets/svgs/Calendar.svg'
import CheckFill from 'assets/svgs/Check.svg'
import Clock from 'assets/svgs/Clock.svg'
import Folder from 'assets/svgs/Folder.svg'
import Log from 'assets/svgs/LogTime.svg'
import Leave from 'assets/svgs/Leave.svg'
import DateRange from 'assets/svgs/DateRange.svg'
import WENLIGHT from 'assets/svgs/Main.svg'
import WENDARK from 'assets/svgs/wen-logo-white 1.svg'
import SunIcon from 'assets/svgs/SunIcon.svg'
import MoonIcon from 'assets/svgs/Dark.svg'
import Notification from 'assets/svgs/Notification.svg'
import NewNotification from 'assets/svgs/NewNotificationIcon.svg'
import UserLeaveCalendar from 'assets/svgs/Calendar.svg'
import ActivityIcon from 'assets/svgs//UpcomingActivities.svg'
import BirthdayIcon from 'assets/svgs/birthdayCake.svg'
import HolidayIcon from 'assets/svgs/Event.svg'
import HolidayDashboard from 'assets/svgs/Holiday.svg'
import LeaveNotify from 'assets/svgs/LeaveNotify.svg'
import Notice from 'assets/svgs/Notice.svg'
import Blog from 'assets/svgs/blog.svg'
import Event from 'assets/svgs/event-com.svg'
import Briefcase from 'assets/svgs/Briefcase.svg'
import Plus from 'assets/svgs/plus.svg'
import SmallCalendar from 'assets/svgs/SmallCalendar.svg'
import KeyboardArrowRight from 'assets/svgs/KeyboardArrowRight.svg'
import BackIcon from 'assets/svgs/backArrow.svg'
import KeyboardDownArrow from 'assets/svgs/KeyboardDownArrow.svg'
import KeyboardUpArrow from 'assets/svgs/KeyboardUpArrow.svg'
import Edit from 'assets/svgs/Edit.svg'
import DarkModeSwitch from 'assets/svgs/DarkModeSwitch.svg'
import Mobile from 'assets/svgs/Mobile.svg'
import Email from 'assets/svgs/Email.svg'
import UserIcon from 'assets/svgs/user.svg'
import Logout from 'assets/svgs/Logout.svg'
import LockIcon from 'assets/svgs/lock.svg'
import FingerPrint from 'assets/svgs/FingerPrint.svg'
import AtTheRate from 'assets/svgs/at-sign.svg'
import EyeIcon from 'assets/svgs/showEye.svg'
import HideIcon from 'assets/svgs/HideIcon.svg'
import PunchInOut from 'assets/svgs/PunchInOut.svg'
import PunchInLight from 'assets/svgs/punchInLight.svg'
import PunchInDark from 'assets/svgs/punchInDark.svg'
import TabBackground from 'assets/svgs/tabBackground.svg'
import SearchIcon from 'assets/svgs/SearchIcon.svg'
import FilterIcon from 'assets/svgs/Filter.svg'
import MinusIcon from 'assets/svgs/Minus.svg'
import ClockPunchIn from 'assets/svgs/ClockPunchIn.svg'
import ClockPunchOut from 'assets/svgs/ClockPunchOut.svg'
import ClockWorkingHour from 'assets/svgs/ClockWorkingHour.svg'
import ThreeDotOptions from 'assets/svgs/ThreeDot.svg'
import Close from 'assets/svgs/Close.svg'
import PunchOutDark from 'assets/svgs/PunchOutDark.svg'
import Recycle from 'assets/svgs/recycle.svg'
import LightDark from 'assets/svgs/lightDark.svg'
import CoWorkerOnLeave from 'assets/svgs/CoWorkerOnLeave.svg'
import PunchHand from 'assets/svgs/PunchHand.svg'
import Location from 'assets/svgs/Location.svg'
import ErrorToast from 'assets/svgs/ErrorToast.svg'
import WarningToast from 'assets/svgs/WarningToast.svg'
import SuccessToast from 'assets/svgs/SuccessToast.svg'
import NotFound from 'assets/svgs/NotFound.svg'
import Description from 'assets/svgs/Description.svg'
import NoWifi from 'assets/svgs/NoWifi.svg'
import FaceId from 'assets/svgs/FaceId.svg'

interface IIconProps {
  size?: number
  width?: number | string
  height?: number | string
  name: string
  containerStyles?: Object
  color?: string
  fill?: string
  isFill?: boolean
  isStroke?: boolean
  stroke?: string
}

const defaultProps = {
  size: 20,
  width: 20,
  height: 20,
  color: defaultIconColor,
  isFill: false,
  fill: defaultIconFillColor,
  isStroke: false,
  stroke: '#05A9C5',
}
const Icon: React.FunctionComponent<IIconProps> = (props) => {
  const { width, height, name, containerStyles, color, fill, isFill, isStroke, stroke } = props
  const getIcon = (Iconname: string) => {
    switch (Iconname) {
      case 'check-fill':
        return CheckFill
      case 'clock':
        return Clock
      case 'calendar':
        return Calendar
      case 'folder':
        return Folder
      case 'close':
        return Close
      case 'log':
        return Log
      case 'leave':
        return Leave
      case 'attendance':
        return DateRange
      case 'WENLIGHT':
        return WENLIGHT
      case 'WENDARK':
        return WENDARK
      case 'Sun':
        return SunIcon
      case 'Moon':
        return MoonIcon
      case 'Notifications':
        return Notification
      case 'newNotification':
        return NewNotification
      case 'userLeaveIcon':
        return UserLeaveCalendar
      case 'upcomingActivities':
        return ActivityIcon
      case 'birthday':
        return BirthdayIcon
      case 'holidayIcon':
        return HolidayIcon
      case 'holidayDashboardIcon':
        return HolidayDashboard
      case 'LeaveNotify':
        return LeaveNotify
      case 'Notice':
        return Notice
      case 'Blog':
        return Blog
      case 'Event':
        return Event
      case 'Briefcase':
        return Briefcase
      case 'Plus':
        return Plus
      case 'smallCalendar':
        return SmallCalendar
      case 'KeyboardRightArrow':
        return KeyboardArrowRight
      case 'BackArrow':
        return BackIcon
      case 'KeyboardDownArrow':
        return KeyboardDownArrow
      case 'KeyboardUpArrow':
        return KeyboardUpArrow
      case 'Edit':
        return Edit
      case 'DarkModeSwitch':
        return DarkModeSwitch
      case 'Mobile':
        return Mobile
      case 'Email':
        return Email
      case 'User':
        return UserIcon
      case 'Logout':
        return Logout
      case 'Lock':
        return LockIcon
      case 'FingerPrint':
        return FingerPrint
      case 'AtTheRate':
        return AtTheRate
      case 'ShowPassword':
        return EyeIcon
      case 'HidePassword':
        return HideIcon
      case 'punch-in-out':
        return PunchInOut
      case 'punchInLight':
        return PunchInLight
      case 'punchInDark':
        return PunchInDark
      case 'tabBackground':
        return TabBackground
      case 'search':
        return SearchIcon
      case 'filter':
        return FilterIcon
      case 'minus':
        return MinusIcon
      case 'punchInClock':
        return ClockPunchIn
      case 'punchOutClock':
        return ClockPunchOut
      case 'workingHourClock':
        return ClockWorkingHour
      case 'dotOptions':
        return ThreeDotOptions
      case 'punchoutDark':
        return PunchOutDark
      case 'recycle':
        return Recycle
      case 'lightDark':
        return LightDark
      case 'coworkerOnLeave':
        return CoWorkerOnLeave
      case 'punchHand':
        return PunchHand
      case 'location':
        return Location
      case 'successToast':
        return SuccessToast
      case 'warningToast':
        return WarningToast
      case 'errorToast':
        return ErrorToast
      case 'notFound':
        return NotFound
      case 'description':
        return Description
      case 'nowifi':
        return NoWifi
      case 'faceId':
        return FaceId
      default:
        return null
    }
  }
  let IconComp = getIcon(name)
  return (
    <View style={containerStyles}>
      {IconComp ? (
        isFill ? (
          <IconComp width={width} height={height} color={color} fill={fill} />
        ) : isStroke ? (
          <IconComp width={width} height={height} color={color} stroke={stroke} />
        ) : (
          <IconComp width={width} height={height} color={color} />
        )
      ) : (
        <MyText>Invalid icon</MyText>
      )}
    </View>
  )
}
Icon.defaultProps = defaultProps

export default Icon
