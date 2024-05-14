import LeaveCalendar from 'components/modules/leaves/LeaveCalendar'
import ButtonEl from 'components/elements/Button'
import Dropdown from 'components/elements/Dropdown'
import MyText from 'components/elements/MyText'
import TextInputEl from 'components/elements/form/TextInput'
import moment from 'moment'
import React, { useState, useRef, useCallback } from 'react'
import { View, StyleSheet, ScrollView, ActivityIndicator, Platform } from 'react-native'
import { MuiFormatDate } from 'utils'
import KeyboardAvoidingComponent from 'components/elements/KeyboardDismissal'
import useForm from 'hooks/useForm'
import { useFocusEffect, useTheme } from '@react-navigation/native'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  createLeave,
  getLeaveQuarter,
  getLeaveTypes,
  getLeavesOfUser,
  getQuarters,
  getTakenAndRemainingLeaveDaysOfUser,
  getUserLeavesSummary,
  sendEmailforLeave,
  updateLeave,
} from 'services/leaves'
import {
  FONT_CONST,
  LEAVE_INTERVAL,
  LEAVE_STATUS_TYPES,
  LEAVE_TYPE_INTERVAL,
  NO_INTERNET,
  RoleAccess,
} from 'helpers/constants'
import { calendarWeedkendColor } from 'styles/colors'
import {
  changeDate,
  commonToast,
  getHalfDayLeave,
  getLeaveDisabledDays,
  getRangeofDates,
  handleResponse,
  removeDash,
  uriToBlob,
} from 'helpers/utils'
import { useAppSelector } from 'redux/hook'
import { LeaveRoutes } from 'constants/routes'
import { useRefreshOnFocus } from 'hooks/useRefreshOnFocus'
import { socket } from '../../../App'
import { useToast } from 'react-native-toast-notifications'
import { getAllHolidays } from 'services/dashboard'
import * as DocumentPicker from 'expo-document-picker'
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { storage } from 'firebase'
import DocumentUpload from 'components/modules/leaves/DocumentUpload'
import * as ImagePicker from 'expo-image-picker'

type Props = {
  route: any
  navigation: any
}

const initialState = {
  leaveType: { isRequired: true, value: '' },
  leaveInterval: { isRequired: true, value: '' },
  leaveReason: { isRequired: false, value: '', isVital: true },
  leaveDate: { isRequired: true, value: '' },
  leaveDocument: { isRequired: false, value: {}, isDocument: true },
}

const AddLeave = ({ navigation, route }: Props) => {
  const isOffline = useAppSelector((state) => state?.common?.isOffline)

  const toast = useToast()
  const paramsData = route?.params?.item
  const [isDocumentDeleted, setIsDocumentDeleted] = useState(false)
  const { colors } = useTheme()
  const queryClient = useQueryClient()
  const [typeOpen, setTypeOpen] = useState('')
  const [yearStartDate, setYearStartDate] = useState(undefined)
  const [yearEndDate, setYearEndDate] = useState(undefined)
  const [subId, setSubId] = useState(undefined)
  const isSpecialLeave = useRef(null)
  const authUser = useAppSelector((state) => state?.auth?.authUser)
  const [MediaLibraryStatus, requestMediaLibrary] = ImagePicker.useMediaLibraryPermissions()

  const { onSubmit, onChange, onBlur, values, errors, clearValues, isSubmitting, setSubmitting } =
    useForm(initialState, undefined)

  const arraySelectedDates = Object.keys(values?.leaveDate?.value || {})

  const leaveTypeQuery = useQuery(['leaveType'], getLeaveTypes, {
    onSuccess: (data) => {
      const substituteId = data?.find((d: any) => d.name === 'Substitute Leave')?._id
      setSubId(substituteId)
    },
    select: (res) => {
      return res?.data?.data?.map((type: any) => ({
        ...type,
        id: type._id,
        value: type._id,
        label: type?.name.replace('Leave', '').trim(),
        leaveDays: type?.leaveDays,
      }))
    },
    enabled: !isOffline,
  })

  const defaultCasualLeaveDays = leaveTypeQuery?.data?.find(
    (leave: any) => leave.name === 'Casual Leave'
  )?.leaveDays

  const { data: leaveQuarter, refetch: quarterRefetch } = useQuery(
    ['leaveQuarter'],
    () => getLeaveQuarter(),
    {
      onSuccess: (data) => {
        const quarterLength = data?.data?.data?.[0]?.quarters?.length - 1
        setYearStartDate(data?.data?.data?.[0]?.quarters?.[0]?.fromDate)
        setYearEndDate(data?.data?.data?.[0]?.quarters?.[quarterLength]?.toDate)
      },
      enabled: !isOffline,
    }
  )

  const userSubstituteLeave = useQuery(
    ['substitute', yearStartDate, yearEndDate],
    () =>
      getLeavesOfUser({
        id: authUser?._id,
        status: '',
        date: undefined,
        page: undefined,
        limit: undefined,
        fromDate: yearStartDate,
        toDate: yearEndDate,
      }),
    { enabled: !!yearStartDate && !!yearEndDate && !isOffline }
  )

  const substituteLeavesTaken = useQuery(
    ['substitute', yearStartDate, yearEndDate, subId],
    () =>
      getLeavesOfUser({
        id: authUser?._id,
        status: '',
        date: undefined,
        page: undefined,
        limit: undefined,
        fromDate: yearStartDate,
        toDate: yearEndDate,
        sort: '',
        type: subId,
      }),
    { enabled: !!yearStartDate && !!yearEndDate && !!subId && !isOffline }
  )

  const { data: quarters, isSuccess } = useQuery(['allquarters'], () => getQuarters(), {
    enabled: !isOffline,
  })
  const quartersList = quarters?.data?.data?.[0]?.quarters
  const fiscalYearEndDate = quartersList?.[quartersList.length - 1]?.toDate

  const nextYearStartDate = `${MuiFormatDate(
    moment(fiscalYearEndDate).add(1, 'days').format()
  )}T00:00:00Z`
  const nextYearEndDate = `${MuiFormatDate(
    moment(nextYearStartDate).add(1, 'years').format()
  )}T00:00:00Z`

  const { data: userNextYearLeaves, refetch: nextYearRefetch } = useQuery(
    ['userLeaves', nextYearStartDate, nextYearEndDate],
    () =>
      getLeavesOfUser({
        id: authUser?._id,
        status: '',
        date: undefined,
        page: undefined,
        limit: undefined,
        fromDate: nextYearStartDate,
        toDate: nextYearEndDate,
        sort: '',
        type: '',
      }),
    {
      refetchOnWindowFocus: true,
      enabled: !!quarters && !isOffline,
    }
  )

  const nextYearSpecialLeaves = userNextYearLeaves?.data?.data?.filter(
    (leave: any) => leave?.leaveStatus === 'approved' && leave?.leaveType?.isSpecial
  )

  const numberOfCasualLeavesInNextFiscalYear = userNextYearLeaves?.data?.data
    ?.filter(
      (leave: any) =>
        leave.leaveType.name === 'Casual Leave' &&
        (leave.leaveStatus === 'pending' || leave.leaveStatus === 'approved')
    )
    .reduce((acc, cur) => acc + cur.leaveDates.length, 0)

  const leaveDaysQuery = useQuery(
    ['takenAndRemainingLeaveDays'],
    () => getTakenAndRemainingLeaveDaysOfUser(authUser?._id),
    { enabled: !isOffline }
  )

  const emailMutation = useMutation((payload) => sendEmailforLeave(payload))

  const sendEmailNotification = (res: any) => {
    const leaveType = leaveTypeQuery?.data?.find(
      (type: any) => type.id === res?.data?.data?.leaveType
    )?.value
    const halfLeave = res?.data?.data?.halfDay ? removeDash(res?.data?.data?.halfDay) : 'Full Day'
    emailMutation.mutate({
      leaveStatus: res?.data?.data?.leaveStatus,
      leaveDates: res?.data?.data?.leaveDates,
      user:
        res?.data?.data?.leaveStatus === LEAVE_STATUS_TYPES[1].id
          ? { name: authUser?.name, email: authUser?.email }
          : res?.data?.data?.user,
      leaveReason: res?.data?.data?.reason,
      leaveType: `${leaveType} ${halfLeave}`,
    })
  }

  const leaveMutation: any = useMutation((leave) => createLeave(leave), {
    onSuccess: async (response) => {
      if (response.status) {
        await queryClient.invalidateQueries(['userLeaves'])
        queryClient.invalidateQueries(['leaves'])
        queryClient.invalidateQueries(['substitute'])
        queryClient.invalidateQueries(['takenAndRemainingLeaveDays'])
        handleResponse(response, [
          () => clearValues(),
          () => {
            sendEmailNotification(response)
          },
          () => toast.show('Leave submitted successfully', { type: 'success' }),
          () => {
            socket.emit('CUD')
          },
          () => {
            socket.emit('dashboard-pending')
          },
          () => {
            if (isSpecialLeave.current) {
              socket.emit('apply-leave', {
                showTo: [authUser?._id],
                remarks: 'Your Leave has been approved.',
                module: 'Leave',
                extraInfo: JSON.stringify({
                  status: 'approved',
                }),
              })
            }
          },
          () => {
            const showTo = [
              RoleAccess.Admin,
              RoleAccess.ProjectManager,
              RoleAccess.TeamLead,
              RoleAccess.HumanResource,
            ]

            if (['hr'].includes(authUser?.role.key)) showTo.splice(3)

            socket.emit('apply-leave', {
              showTo,
              remarks: `${authUser?.name} has applied for leave. Please review.`,
              module: 'Leave',
              extraInfo: JSON.stringify({
                userId: authUser?._id,
                status: isSpecialLeave?.current ? 'approved' : 'pending',
              }),
            })
          },
          () => navigation.navigate(LeaveRoutes.Leaves),
        ])
      } else {
        setSubmitting(false)
        commonToast({
          toast: toast,
          message: response?.message || `Leave submission failed!`,
          type: 'warning',
        })
      }
    },
    onError: (error) => {
      setSubmitting(false)
      commonToast({ toast: toast, message: `Leave submission failed!`, type: 'warning' })
    },
  })

  const { data: Holidays } = useQuery(['DashBoardHolidays'], () =>
    getAllHolidays({ sort: '-createdAt', limit: '1' }, { enabled: !isOffline })
  )

  const disabledDates = Holidays?.data?.data?.[0]?.holidays?.reduce((prev: any, curr: any) => {
    prev[curr?.date?.split('T')?.[0]] = {
      allowLeave: curr?.allowLeaveApply,
      disableType: `Holiday`,
      holidayName: curr?.title,
      endingDay: true,
      selected: true,
      selectedColor: colors.headerBackground,
      selectedTextColor: calendarWeedkendColor,
    }
    return prev
  }, {})

  const leaveUpdateMutation = useMutation((leave: any) => updateLeave(leave), {
    onSuccess: async (response) => {
      if (response.status) {
        const finalData = response?.data?.data
        const leaveTypes = leaveTypeQuery?.data?.find(
          (data: any) => data.id === response?.data?.data?.data?.leaveType
        )
        const leaveDates = leaveTypes?.isSpecial
          ? [finalData?.leaveDates?.[0], finalData?.leaveDates?.at(-1)]
              ?.map((date) => changeDate(date))
              ?.join(' - ')
          : finalData?.leaveDates.map((d: any) => changeDate(d))
        queryClient.invalidateQueries(['leaves'])
        queryClient.invalidateQueries(['leavesCalendar'])
        await queryClient.invalidateQueries(['userLeaves'])
        queryClient.invalidateQueries(['takenAndRemainingLeaveDays'])
        handleResponse(response, [
          () => toast.show(`Leave Update Successful!`, { type: 'success' }),
          () => clearValues(),
          () => {
            socket.emit('CUD')
          },
          () =>
            socket.emit('approve-leave', {
              showTo: [response?.data?.data?.user?._id],
              remarks: `Your leave has been updated.`,
              module: 'Leave',
              extraInfo: JSON.stringify({
                status: 'pending',
              }),
            }),
          () => navigation.navigate(LeaveRoutes.Leaves),
        ])
      } else {
        setSubmitting(false)
        commonToast({
          toast: toast,
          message: response?.message || `Leave Update Failed!`,
          type: 'warning',
        })
      }
    },
    onError: (error) => {
      setSubmitting(false)
      commonToast({
        toast: toast,
        message: `Leave Update Failed!`,
        type: 'warning',
      })
    },
  })

  const leavesSummary = useQuery(
    ['leavesSummary'],
    () => {
      //getting the quarterId
      const currentQuarter = quarters?.data?.data[0]?.quarters.find(
        (d) =>
          new Date(d?.fromDate) <= new Date().setUTCHours(0, 0, 0, 0) &&
          new Date().setUTCHours(23, 59, 59, 999) <= new Date(d?.toDate)
      )
      return getUserLeavesSummary({
        userId: authUser?._id,
        quarterId: currentQuarter?._id,
        fiscalYear: quarters?.data?.data[0]?.fiscalYear,
      })
    },
    { enabled: isSuccess && !isOffline }
  )

  const casualLeaveRemainingDays = leavesSummary?.data?.data?.[0]?.remainingCasualLeaves
  // const leaveDaysQuery = useQuery(['takenAndRemainingLeaveDays', loggedInUser,authUser?._id], () =>
  //   getTakenAndRemainingLeaveDaysOfUser(authUser?._id)
  // )

  const YearlyLeaveExceptCasualandSick = leaveDaysQuery?.data?.data?.data
    ?.filter((item: any) => !['Sick Leave', 'Casual Leave'].includes(item?._id))
    ?.map((d: any) => [d?._id, d?.leavesTaken])

  useFocusEffect(
    useCallback(() => {
      if (paramsData) {
        const calendarDates = paramsData?.leaveDates?.map((date: string) => date?.split('T')?.[0])
        let requiredDates: any = {}
        calendarDates.forEach((date: string) => {
          requiredDates[date] = {
            selected: true,
            endingDay: true,
            color: 'blue',
            textColor: colors.text,
          }
        })
        onChange('leaveType', paramsData?.leaveType?._id)
        onChange('leaveReason', paramsData?.reapplyreason || paramsData?.reason)
        onChange('leaveInterval', paramsData?.halfDay || 'full-day')
        onChange('leaveDate', requiredDates)
        onChange('leaveDocument', paramsData?.leaveDocument)
      }
    }, [route?.params?.item])
  )

  const handleLeaveApply = async () => {
    if (isOffline) {
      return commonToast({ toast: toast, message: NO_INTERNET, type: 'warning' })
    }
    await onSubmit()
    if (
      Object.values(values || {})?.some((d: any) => !d?.value && !d?.isDocument) ||
      values?.leaveReason?.value.length < 10
    ) {
      return
    }

    const leaveType = leaveTypeQuery?.data?.find(
      (type: any) => type?.id === values?.leaveType?.value
    )
    const isSubstitute = leaveTypeQuery?.data?.find((data: any) => data?.label === 'Substitute')
    //substitute leave condition
    if (isSubstitute?.id === values?.leaveType?.value) {
      let substituteLeaveTaken = 0

      const hasSubstitute = substituteLeavesTaken?.data?.data?.data.filter(
        (sub: any) => sub?.leaveStatus === 'approved' || sub?.leaveStatus === 'pending'
      )

      hasSubstitute.forEach((e) => {
        if (e.halfDay) {
          substituteLeaveTaken += 0.5
        } else {
          substituteLeaveTaken += e.leaveDates.length
        }
      })

      const substituteLeaveApply =
        values.leaveInterval.value !== 'full-day'
          ? substituteLeaveTaken + 0.5
          : substituteLeaveTaken + arraySelectedDates?.length

      if (substituteLeaveTaken >= isSubstitute?.leaveDays) {
        setSubmitting(false)
        return commonToast({
          toast: toast,
          message: 'Substitute Leave has already been applied.',
          type: 'warning',
        })
      }

      if (substituteLeaveApply > isSubstitute?.leaveDays) {
        setSubmitting(false)
        return commonToast({
          toast: toast,
          message: `Substitute leave cannot exceed more than ${
            isSubstitute?.leaveDays
          } day as your remaining leave is ${isSubstitute?.leaveDays - substituteLeaveTaken}.`,
          type: 'warning',
        })
      }
    }
    let LeaveDaysUTC = []

    // calculation for maternity, paternity, pto leaves
    //special cases
    if (leaveType?.isSpecial) {
      const specialLeavesApproved = YearlyLeaveExceptCasualandSick?.map((item) => item?.[0])
      //if special leave is applied before the end of the current fiscal year
      if (moment(fiscalYearEndDate) > moment(arraySelectedDates[0] ?? '')) {
        if (specialLeavesApproved?.includes(leaveType?.name)) {
          setSubmitting(false)
          return commonToast({
            toast: toast,
            message: `Sorry,You have already taken ${leaveType?.name} leave in this fiscal year.`,
            type: 'warning',
          })
        }
      } else {
        // checking if the special leave already exists in the next fiscal year
        const leaveAppliedInNextYear = nextYearSpecialLeaves?.find(
          (leave: any) => leave?.leaveType?.name === leaveType?.name
        )
        //calculating the number of days the leave is allocated in the next fiscal year
        const numberOfAppliedDaysInNextYear = leaveAppliedInNextYear?.leaveDates?.filter(
          (date: any) => moment(date) > moment(fiscalYearEndDate)
        )?.length
        if (
          leaveAppliedInNextYear &&
          numberOfAppliedDaysInNextYear >= leaveAppliedInNextYear?.leaveDates?.length
        ) {
          setSubmitting(false)
          return commonToast({
            toast: toast,
            message: `Sorry,You have already taken ${leaveType?.name} leave in this fiscal year.`,
            type: 'warning',
          })
        }
      }

      LeaveDaysUTC = getRangeofDates(new Date(arraySelectedDates[0]), leaveType?.leaveDays)
    }
    // calculation for sick, casual leaves
    else {
      const casualLeaveDays = arraySelectedDates
      LeaveDaysUTC = casualLeaveDays
        ?.map((leave) => `${MuiFormatDate(new Date(leave))}T00:00:00Z`)
        .sort((a, b) => a.localeCompare(b))
    }

    //code for exceeded casual leaves
    if (leaveType?.label === 'Casual') {
      let leavesInThisFiscalYear = arraySelectedDates?.filter((date) =>
        moment(fiscalYearEndDate).isAfter(date)
      )
      let currentCasualLeaveDaysApplied =
        leavesInThisFiscalYear?.length > 1
          ? arraySelectedDates?.length
          : values?.halfDay === 'full-day'
          ? 1
          : 0.5
      let filteredProbationalLeaves = userSubstituteLeave?.data?.data?.data?.filter(
          (leave: any) => leave?.leaveType?.name === 'Casual Leave'
        ),
        leavesAppliedBeforeStatusChangeDate = []
      //from redux
      if (
        authUser?.statusChangeDate &&
        new Date(authUser?.statusChangeDate) > new Date(yearStartDate)
      ) {
        //if probation has been completed, the leaves taken during probation are not counted
        filteredProbationalLeaves = filteredProbationalLeaves?.filter(
          (leave: any) => new Date(leave?.leaveDates?.[0]) > new Date(authUser?.statusChangeDate)
        )
        leavesAppliedBeforeStatusChangeDate = arraySelectedDates.filter(
          (leaveDate: any) => leaveDate < new Date(authUser?.statusChangeDate)
        )
      }
      let previouslyAppliedCasualLeaves = filteredProbationalLeaves
        ?.filter((leave: any) => leave?.leaveStatus === 'pending')
        .map((item: any) => {
          if (item?.halfDay === '') {
            return { ...item, count: item?.leaveDates?.length }
          } else return { ...item, count: 0.5 }
        })

      const casualLeavesCount = previouslyAppliedCasualLeaves?.reduce(
        (acc, cur) => acc + cur.count,
        0
      )

      let tempArr: any = []

      LeaveDaysUTC?.forEach((day) => tempArr.push(moment(fiscalYearEndDate) > moment(day)))
      let fiscalYearRestriction = false
      const inThisFiscalYear = tempArr.filter((item: any) => item === true)
      const inNextFiscalYear = tempArr.filter((item: any) => item === false)

      if (inNextFiscalYear.length + numberOfCasualLeavesInNextFiscalYear > defaultCasualLeaveDays) {
        fiscalYearRestriction = true
      }
      if (authUser?.status !== 'Probation') {
        // if the user is under probation no restrictions
        const isLeavesAppliedBeforeStatusChangeDate = leavesAppliedBeforeStatusChangeDate.length > 0
        //if all the leaves are in this fiscal year
        if (
          inNextFiscalYear.length === 0 &&
          casualLeaveRemainingDays < casualLeavesCount + currentCasualLeaveDaysApplied &&
          !isLeavesAppliedBeforeStatusChangeDate &&
          !paramsData
        ) {
          setSubmitting(false)
          return commonToast({
            toast: toast,
            message: 'casual leave exceeded',
            type: 'warning',
          })
        }
        if (
          inNextFiscalYear.length === 0 &&
          casualLeaveRemainingDays <
            casualLeavesCount + currentCasualLeaveDaysApplied - paramsData?.leaveDates?.length &&
          !isLeavesAppliedBeforeStatusChangeDate &&
          paramsData
        ) {
          setSubmitting(false)
          return commonToast({
            toast: toast,
            message: 'casual leave exceeded',
            type: 'warning',
          })
        }

        //if leaves include both fiscal years
        if (
          inNextFiscalYear.length > 0 &&
          casualLeaveRemainingDays < inThisFiscalYear.length &&
          !isLeavesAppliedBeforeStatusChangeDate
        ) {
          setSubmitting(false)
          return commonToast({
            toast: toast,
            message: 'casual leave exceeded',
            type: 'warning',
          })
        }

        //if all leaves are in next fiscal year
        if (fiscalYearRestriction) {
          setSubmitting(false)
          return commonToast({
            toast: toast,
            message: 'casual leave exceeded',
            type: 'warning',
          })
        }
      }
    }
    const specialLeave = leaveTypeQuery?.data?.find(
      (d: any) => d?._id === values?.leaveType?.value
    )?.isSpecial
    isSpecialLeave.current = specialLeave
    delete values.leaveDatesCasual

    if (isDocumentDeleted) {
      try {
        const docRef = ref(storage, values?.leaveDocument?.value)
        await deleteObject(docRef)
      } catch {
        console.log('error')
      }
    }

    if (paramsData) {
      if (values?.leaveDocument?.value?._data?.blobId) {
        const storageRef = ref(storage, `leaves/${values?.leaveDocument?.value?._data?.name}`)
        const uploadTask = uploadBytesResumable(storageRef, values?.leaveDocument?.value)
        uploadTask.on(
          'state_changed',
          (snapshot) => {},
          (error) => {
            console.log(error.message)
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              leaveUpdateMutation.mutate({
                id: paramsData?._id,
                data: {
                  reason: values?.leaveReason?.value,
                  leaveType: values.leaveType.value,
                  leaveDates: LeaveDaysUTC,
                  leaveDocument: downloadURL,
                  halfDay:
                    values?.leaveInterval?.value === 'full-day' ||
                    values?.leaveInterval?.value === 'Full Day'
                      ? ''
                      : values?.leaveInterval?.value,
                },
              })
            })
          }
        )
      } else {
        leaveUpdateMutation.mutate({
          id: paramsData?._id,
          data: {
            reason: values?.leaveReason?.value,
            leaveType: values.leaveType.value,
            leaveDates: LeaveDaysUTC,
            leaveDocument: isDocumentDeleted ? '' : values?.leaveDocument?.value,
            halfDay:
              values?.leaveInterval?.value === 'full-day' ||
              values?.leaveInterval?.value === 'Full Day'
                ? ''
                : values?.leaveInterval?.value,
          },
        })
      }
    } else {
      if (values.leaveDocument?.value?._data?.blobId) {
        const storageRef = ref(storage, `leaves/${values?.leaveDocument?.value?._data?.name}`)
        const uploadTask = uploadBytesResumable(storageRef, values?.leaveDocument?.value)
        uploadTask.on(
          'state_changed',
          (snapshot) => {},
          (error) => {
            console.log(error.message)
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              leaveMutation.mutate({
                reason: values.leaveReason.value,
                leaveType: values.leaveType.value,
                leaveDates: LeaveDaysUTC,
                halfDay:
                  values?.leaveInterval?.value === 'full-day' ||
                  values?.leaveInterval?.value === 'Full Day'
                    ? ''
                    : values?.leaveInterval?.value,
                leaveStatus:
                  specialLeave || ['admin'].includes(authUser?.role?.key) ? 'approved' : 'pending',
                leaveDocument: downloadURL,
              })
            })
          }
        )
      } else {
        leaveMutation.mutate({
          reason: values.leaveReason.value,
          leaveType: values.leaveType.value,
          leaveDates: LeaveDaysUTC,
          halfDay:
            values?.leaveInterval?.value === 'full-day' ||
            values?.leaveInterval?.value === 'Full Day'
              ? ''
              : values?.leaveInterval?.value,
          leaveStatus:
            specialLeave || ['admin'].includes(authUser?.role?.key) ? 'approved' : 'pending',
        })
      }
    }
  }

  const genderSpecificLeaveType = leaveTypeQuery?.data?.filter((d: any) => {
    const showToProbation = authUser?.status === 'Probation' ? d?.Probation : true
    return d?.gender?.includes(authUser?.gender) && showToProbation
  })

  // handle calendar dates
  const handleLeaveDate = (value: any) => {
    const newDates = value()
    const keyWord = Object.keys(newDates || {})?.[0]

    const leaveSpecial = leaveTypeQuery?.data?.find((d: any) => d?.id === values?.leaveType?.value)
    if (leaveSpecial?.isSpecial) {
      const value = Object.values(newDates || {})?.[0]
      const rangeDates = getRangeofDates(new Date(keyWord), leaveSpecial?.leaveDays, false)
      const requiredRangeDates: any = {}

      rangeDates.forEach((date: string) => {
        requiredRangeDates[date] = value
      })

      onChange('leaveDate', requiredRangeDates)
      return
    }

    //function for updating leave
    const updateLeaveInterval = (dates: string[]) => {
      let interval = values?.leaveInterval?.value
      if (dates.length > 1) {
        interval = 'full-day'
      } else if (dates.length === 1) {
        const isHalfDay = getHalfDayLeave(dates, userSubstituteLeave?.data?.data?.data)

        if (isHalfDay === 'first-half') {
          interval = 'second-half'
        } else if (isHalfDay === 'second-half') {
          interval = 'first-half'
        }
      }
      onChange('leaveInterval', interval)
    }

    //to deselect the dates in calendar
    if (arraySelectedDates.includes(keyWord)) {
      const filteredDate = arraySelectedDates
        .filter((d) => d != keyWord)
        ?.reduce((prev, curr) => {
          return { ...prev, [curr]: values.leaveDate.value[keyWord] }
        }, {})
      const arrFilteredDates = Object.keys(filteredDate || {})
      updateLeaveInterval(arrFilteredDates)
      return onChange('leaveDate', filteredDate)
    } else {
      const allDates = { ...values.leaveDate.value, ...newDates }
      const arrAllDates = Object.keys(allDates || {})
      updateLeaveInterval(arrAllDates)
      onChange('leaveDate', allDates)
    }
  }

  //for disabling leave interval in dropdown

  const isLeaveTypeSpecial = leaveTypeQuery?.data?.find(
    (d: any) => d?.id === values?.leaveType?.value
  )?.isSpecial

  const isHalfDayLeave = getHalfDayLeave(
    arraySelectedDates,
    userSubstituteLeave?.data?.data?.data,
    paramsData
  )

  const LEAVE_INTERVAL_DURATION =
    LEAVE_INTERVAL &&
    LEAVE_INTERVAL?.map((d) => {
      const isFullDayLeave = d.value === 'full-day'
      const isDisabled =
        (arraySelectedDates.length > 1 && !isFullDayLeave) ||
        (isHalfDayLeave === 'first-half' && d.value === 'first-half') ||
        (isHalfDayLeave === 'second-half' && d.value === 'second-half') ||
        (!isFullDayLeave && isLeaveTypeSpecial) ||
        (isFullDayLeave && isHalfDayLeave)

      return { ...d, disabled: !!isDisabled }
    })

  const handleLeaveType = (value: any) => {
    const isPreviousSpecial = leaveTypeQuery?.data?.find(
      (d: any) => d?.id === values?.leaveType?.value
    )?.isSpecial
    const isSpecial = leaveTypeQuery?.data?.find((d: any) => d?.id === value())?.isSpecial

    if (isSpecial || (isPreviousSpecial && !isSpecial)) {
      isSpecial && onChange('leaveInterval', 'full-day')
      onChange('leaveDate', '')
    }
    onChange('leaveType', value())
  }

  const calendarDisabledDates = getLeaveDisabledDays(
    userSubstituteLeave?.data?.data?.data,
    paramsData
  )
  let tempDisabledDates = { ...calendarDisabledDates }

  if (isLeaveTypeSpecial && tempDisabledDates) {
    for (const dates of Object.keys(tempDisabledDates || {})) {
      if (Object.keys(values?.leaveDate?.value || {}).includes(dates)) {
        tempDisabledDates[dates] = {
          disableType: 'Leave',
          selected: true,
          endingDay: true,
          color: 'blue',
          textColor: colors.text,
        }
      }
    }
  }

  const handleDocumentUpload = async () => {
    if (!MediaLibraryStatus?.granted) {
      const permissionResult = await requestMediaLibrary()
      const isPremissionDenied = permissionResult.granted === false

      if (isPremissionDenied && !permissionResult.canAskAgain) {
        commonToast({
          toast,
          message: 'Allow permission in settings to access documents',
          type: 'warning',
        })
        return
      }
      if (isPremissionDenied) return
    }
    let res = await DocumentPicker.getDocumentAsync({ type: ['image/jpeg', 'application/pdf'] })
    if (res?.assets != null) {
      const result = await uriToBlob(res?.assets?.[0]?.uri)
      onChange('leaveDocument', result)
    }
  }

  const removeDocument = () => {
    if (paramsData) {
      setIsDocumentDeleted(true)
    }
    onChange('leaveDocument', {})
  }

  useRefreshOnFocus([
    quarterRefetch,
    userSubstituteLeave?.refetch,
    substituteLeavesTaken?.refetch,
    nextYearRefetch,
  ])

  if (isOffline && !genderSpecificLeaveType && typeOpen === LEAVE_TYPE_INTERVAL.leaveType) {
    commonToast({ toast: toast, message: NO_INTERNET, type: 'warning' })
  }

  return (
    <View style={styles.container}>
      <KeyboardAvoidingComponent>
        <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled>
          <Dropdown
            value={values.leaveType.value}
            items={genderSpecificLeaveType}
            placeholder="Select Leave type"
            setValue={handleLeaveType}
            zIndex={1000}
            label="* Leave Type"
            open={typeOpen === LEAVE_TYPE_INTERVAL.leaveType}
            setOpen={(data: boolean) => setTypeOpen(data ? LEAVE_TYPE_INTERVAL.leaveType : '')}
            dropdownStyles={
              authUser?.status === 'Probation'
                ? { height: 40 * genderSpecificLeaveType?.length || 80 }
                : {}
            }
            isMarginOutside
            error={errors.leaveType}
            disabled={isSubmitting}
          />
          <View
            style={{
              marginTop:
                typeOpen === 'leaveType'
                  ? authUser?.status === 'Probation'
                    ? -40 * genderSpecificLeaveType?.length + 12 || -88
                    : -148
                  : 12,
              zIndex: 10000,
            }}
          >
            <Dropdown
              value={values.leaveInterval.value}
              items={LEAVE_INTERVAL_DURATION}
              placeholder="Select Leave Interval"
              setValue={(value: any) => onChange('leaveInterval', value())}
              zIndex={1000}
              label="* Leave Interval"
              open={typeOpen === LEAVE_TYPE_INTERVAL.leaveInterval}
              setOpen={(data: boolean) =>
                setTypeOpen(data ? LEAVE_TYPE_INTERVAL.leaveInterval : '')
              }
              isMarginOutside
              dropdownStyles={{ height: 120 }}
              error={errors.leaveInterval}
              disabled={isSubmitting}
            />
          </View>
          <View
            style={{
              marginTop: typeOpen === LEAVE_TYPE_INTERVAL.leaveInterval ? -120 : 0,
              marginBottom: 20,
            }}
          >
            <MyText
              style={{ ...styles.labels, color: colors.subHeaderFont }}
              fontStyle={FONT_CONST.rubikMedium}
              hasCustomColor
            >
              * Leave Reason
            </MyText>
            <TextInputEl
              placeholder="Enter Leave Reason"
              viewStyles={{
                height: 120,
                alignItems: 'flex-start',
                backgroundColor: colors.lighterBackground,
                marginBottom: 0,
              }}
              onChangeText={(value: any) => onChange('leaveReason', value)}
              value={values.leaveReason.value}
              multiline={true}
              error={errors.leaveReason}
              styles={{ height: '100%' }}
              readOnly={isSubmitting}
            />

            <DocumentUpload
              handleDocumentUpload={handleDocumentUpload}
              files={values?.leaveDocument?.value}
              onRemove={removeDocument}
              isSubmitting={isSubmitting}
            />

            <MyText
              style={{
                fontSize: 14,
                letterSpacing: 0.2,
                marginTop: 18,
                color: colors.subHeaderFont,
              }}
              fontStyle={FONT_CONST.rubikMedium}
              hasCustomColor
            >
              Leave Dates
            </MyText>

            <LeaveCalendar
              setDateSelected={handleLeaveDate}
              dateSelected={values.leaveDate.value}
              disabledDates={{ ...disabledDates, ...tempDisabledDates }}
            />

            {errors.leaveDate && (
              <MyText style={{ marginTop: 10, color: calendarWeedkendColor }} hasCustomColor>
                *Leave Dates is Required
              </MyText>
            )}
            <MyText style={{ marginTop: 10, color: calendarWeedkendColor }} hasCustomColor>
              *Disabled dates are holidays
            </MyText>
            <View style={styles.buttons}>
              <ButtonEl
                title="RESET"
                onPress={() => clearValues()}
                disabled={isSubmitting}
                btnWidth="48.5%"
                btnTextColor="white"
                styles={{ backgroundColor: '#ff4d4f' }}
              />
              <ButtonEl
                title="APPLY"
                onPress={handleLeaveApply}
                disabled={isSubmitting}
                btnWidth={'48.5%'}
                btnTextColor="white"
                icon={isSubmitting ? <ActivityIndicator size="small" color="white" /> : undefined}
                iconToLeft
                hasIcon
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingComponent>
    </View>
  )
}

export default AddLeave

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 12,
    // marginVertical: 19,
    flex: 1,
    marginTop: Platform.OS === 'ios' ? -25 : 15,
    marginBottom: 20,
  },

  textArea: {
    height: 200,
  },
  labels: {
    fontSize: 14,
    marginBottom: 6,
    marginTop: 18,
    letterSpacing: 0.2,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 25,
    // marginBottom: 25,
  },
})
