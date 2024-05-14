import * as React from 'react'
import { Pressable, StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import MyText from 'components/elements/MyText'
import DatePickerNative from 'components/elements/DatePickerNative'
import TextInputEl from 'components/elements/form/TextInput'
import CheckboxEl from 'components/elements/form/Checkbox'
import ButtonEl from 'components/elements/Button'
import Dropdown from 'components/elements/Dropdown'
import { MuiFormatDate } from 'utils'
import { ScrollView } from 'react-native-gesture-handler'
import { useNavigation, useRoute, useTheme } from '@react-navigation/native'
import Icon from 'components/elements/Icon'
import SearchModal from 'components/elements/SearchModal'
import useForm from 'hooks/useForm'
import { addProjectLogTime, addUserTimeLog, getLogTypes, updateTimeLog } from 'services/projectLogs'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { commonToast, dropdownFormat, handleResponse } from 'helpers/utils'
import { FONT_CONST, NO_INTERNET, RoleAccess } from 'helpers/constants'
import { useToast } from 'react-native-toast-notifications'
import { useAppSelector } from 'redux/hook'
import { calendarWeedkendColor } from 'styles/colors'
import { getAllProjects } from 'services/projects'
import { LogtimeRoutes } from 'constants/routes'
import { socket } from '../../../App'
import { StackActions } from '@react-navigation/native'
import { Env } from '../../env'
import moment from 'moment'

interface IWrapper {
  children: React.ReactNode
  label: string
  required?: boolean
  style?: StyleProp<ViewStyle>
}

export const Wrapper = ({ children, label, required = true, style }: IWrapper) => {
  const { colors } = useTheme()
  return (
    <View style={style}>
      <View style={{ display: 'flex', flexDirection: 'row' }}>
        <MyText
          style={{ fontSize: 14, lineHeight: 16.59, color: colors.headerFont }}
          fontStyle={FONT_CONST.rubikMedium}
          hasCustomColor={true}
        >
          {label}
        </MyText>
        {required && (
          <MyText hasCustomColor style={{ color: 'red' }}>
            *
          </MyText>
        )}
      </View>

      {children}
    </View>
  )
}

const AddLogScreen = () => {
  const route = useRoute()
  const toast = useToast()
  const navigation = useNavigation()
  const queryClient = useQueryClient()
  const authUser = useAppSelector((state) => state?.auth?.authUser)
  const isOffline = useAppSelector((state) => state?.common?.isOffline)

  const [open, setOpen] = React.useState(false)
  const [isZeroMinuteHour, setIsZeroMinuteHour] = React.useState(false)

  const [searchmodalopen, setSearchModalOpen] = React.useState<boolean>(false)

  const {
    showProject,
    projectId,
    logsProject,
    isEdit,
    project,
    logDate,
    hours,
    minutes,
    logType,
    remarks,
    user,
    isOt,
    logId,
  } = route.params

  const { colors } = useTheme()

  React.useEffect(() => {
    if (showProject) {
      onChange('projectName', projectId)
    }
  }, [projectId, showProject])

  const initialState = {
    logDate: { isRequired: false, value: new Date() },
    logHours: { isRequired: false, value: '', isVital: true },
    logMinutes: { isRequired: false, value: '', isVital: true },
    logType: { isRequired: true, value: '' },
    projectName: { isRequired: showProject, value: '' },
    remarks: { isRequired: false, value: '', isVital: true },
    overtime: { isRequired: false, value: false },
  }

  const { onSubmit, onChange, onBlur, values, errors, clearValues, isSubmitting, setSubmitting } =
    useForm(initialState, undefined, async () => {
      //get project name with value
      const actualProjectName = [
        ...(projectsQuery?.data?.data?.data || []),
        { _id: Env.OTHER_PROJECT_ID, name: 'Other' },
      ]?.find((d: any) => d?._id === values?.projectName?.value)?.name

      if (!parseInt(values?.logHours?.value) && !parseInt(values?.logMinutes?.value)) {
        setSubmitting(false)
        setIsZeroMinuteHour(true)
        return
      }
      const logProjectName = showProject ? actualProjectName : undefined

      // projectNameRef.current = newLogtime?.projectName
      let formattedNewLogtime = showProject
        ? {
            user: authUser?._id,
            projectName: logProjectName,
            project: values?.projectName?.value,
            remarks: values?.remarks?.value,
            logDate: MuiFormatDate(values?.logDate?.value) + 'T00:00:00Z',
            logType: values?.logType?.value,
            hours: +values?.logHours?.value,
            minutes: +values?.logMinutes?.value,
            isOt: values?.overtime?.value,
            otStatus: values?.overtime?.value ? 'P' : undefined,
          }
        : {
            remarks: values?.remarks?.value,
            logDate: MuiFormatDate(values?.logDate?.value) + 'T00:00:00Z',
            logType: values?.logType?.value,
            hours: +values?.logHours?.value,
            minutes: +values?.logMinutes?.value,
            isOt: values?.overtime?.value,
            otStatus: values?.overtime?.value ? 'P' : undefined,
          }
      //edit case
      if (!isEdit) {
        if (!showProject) {
          addProjectLogTimeMutation.mutate({
            id: projectId,
            details: formattedNewLogtime,
          })
        } else addLogTimeMutation.mutate(formattedNewLogtime)
      } else {
        UpdateLogTimeMutation.mutate({
          id: logId,
          details: {
            ...formattedNewLogtime,
            user: authUser?._id,
            _id: logId,
          },
        })
      }
    })

  React.useEffect(() => {
    if (isEdit) {
      onChange('overtime', isOt)
      onChange('logDate', new Date(logDate))
      onChange('logHours', `${hours}`)
      onChange('logMinutes', `${minutes}`)
      onChange('logType', logType?._id)
      onChange('remarks', remarks)
      showProject && onChange('projectName', project?._id || '62b41cab9beb69a03b4ffd2d')
    }
  }, [isEdit])

  const { data: logTypes } = useQuery(['logTypes'], () => getLogTypes(), {
    select: (data: any) => dropdownFormat(data?.data?.data),
    enabled: !isOffline,
  })

  const projectsQuery = useQuery(['projects'], () => getAllProjects({}), { enabled: !isOffline })

  const actualProjectName = [
    ...(projectsQuery?.data?.data?.data || []),
    { _id: Env.OTHER_PROJECT_ID, name: 'Other' },
  ].find((d: any) => d?._id === values?.projectName?.value)?.name

  const finalProjectName =
    actualProjectName?.length > 35 ? `${actualProjectName?.substring(0, 35)}...` : actualProjectName

  const addProjectLogTimeMutation: any = useMutation((details) => addProjectLogTime(details), {
    onSuccess: (response) => {
      if (response?.status) {
        if (response?.data?.data?.isOt && response?.data?.data?.otStatus === 'P') {
          socket.emit('ot-log', {
            showTo: [RoleAccess.Admin],
            remarks: `${authUser?.name} has added OT logtime for project ${actualProjectName}. Please review.`,
            module: 'Logtime',
            extraInfo: JSON.stringify({
              userId: authUser?._id,
              project: [{ _id: response?.data?.data?.data?.project, name: actualProjectName }],
            }),
          })
        }
        handleResponse(response, [
          () => queryClient.invalidateQueries(['timeLogs']),
          () => queryClient.invalidateQueries(['singleProject']),
          () => queryClient.invalidateQueries(['projectWeeklyTime']),
          () => toast.show('Added time log successfully', { type: 'success' }),
          () => clearValues(),
          () => navigation.goBack(),
        ])
      } else {
        setSubmitting(false)
        commonToast({
          toast: toast,
          message: response?.message || 'Could not add time log!',
          type: 'danger',
        })
      }
    },

    onError: () => {
      setSubmitting(false)
      commonToast({
        toast: toast,
        message: 'Could not add time log!',
        type: 'danger',
      })
    },
  })

  const addLogTimeMutation: any = useMutation((details) => addUserTimeLog(details), {
    onSuccess: (response: any) => {
      if (response?.status) {
        if (response?.data?.data?.isOt && response?.data?.data?.otStatus === 'P') {
          socket.emit('ot-log', {
            showTo: [RoleAccess.Admin],
            remarks: `${authUser?.name} has added OT logtime for project ${actualProjectName}. Please review.`,
            extraInfo: JSON.stringify({
              userId: authUser?._id,
              project: [
                {
                  _id: response?.data?.data?.project,
                  name: actualProjectName,
                },
              ],
            }),
            module: 'Logtime',
          })
        }
        handleResponse(response, [
          () => queryClient.invalidateQueries(['UsertimeLogs']),
          () => queryClient.invalidateQueries(['userTodayTimeSpent']),
          () => queryClient.invalidateQueries(['userweeklyTimeSpent']),
          () => toast.show('Added time log successfully', { type: 'success' }),
          () => clearValues(),
          () => navigation.navigate(LogtimeRoutes.Logtimes),
        ])
      } else {
        setSubmitting(false)
        commonToast({
          toast: toast,
          message: response?.message || 'Could not add time log!',
          type: 'danger',
        })
      }
    },
    onError: () => {
      setSubmitting(false)
      commonToast({
        toast: toast,
        message: 'Could not add time log!',
        type: 'danger',
      })
    },
  })

  const UpdateLogTimeMutation: any = useMutation((details) => updateTimeLog(details), {
    onSuccess: (response: any) => {
      if (response?.status) {
        if (response?.data?.data?.isOt && response?.data?.data?.otStatus === 'P') {
          socket.emit('ot-log', {
            showTo: [RoleAccess.Admin],
            remarks: `${authUser?.name} has added OT logtime for project ${actualProjectName}. Please review.`,
            module: 'Logtime',
            extraInfo: JSON.stringify({
              userId: authUser?._id,
              project: [
                {
                  _id: response?.data?.data?.data?.project?._id,
                  name: actualProjectName,
                },
              ],
            }),
          })
        }
        handleResponse(response, [
          () => queryClient.invalidateQueries(['UsertimeLogs']),
          () => queryClient.invalidateQueries(['userTodayTimeSpent']),
          () => queryClient.invalidateQueries(['userweeklyTimeSpent']),
          () => toast.show('Updated time log successfully', { type: 'success' }),
          () => clearValues(),
          () => navigation.dispatch(StackActions.pop(2)),
        ])
      } else {
        setSubmitting(false)
        commonToast({
          toast: toast,
          message: response?.message || 'Could not update time log!',
          type: 'danger',
        })
      }
    },
    onError: () => {
      setSubmitting(false)
      commonToast({
        toast: toast,
        message: 'Could not update time log!',
        type: 'danger',
      })
    },
  })

  const handleSubmit = () => {
    if (isOffline) {
      return commonToast({ toast: toast, message: NO_INTERNET, type: 'warning' })
    } else {
      onSubmit()
    }
  }

  const minDate =
    new Date().getDay() === 1 ? moment().subtract(3, 'days') : moment().subtract(1, 'days')

  if (isOffline && !logTypes && open) {
    commonToast({ toast: toast, message: NO_INTERNET, type: 'warning' })
  }

  return (
    <ScrollView
      keyboardShouldPersistTaps={'handled'}
      showsVerticalScrollIndicator={false}
      automaticallyAdjustKeyboardInsets={true}
    >
      <SearchModal
        open={searchmodalopen}
        closeModal={() => setSearchModalOpen(false)}
        onChange={onChange}
      />

      <View style={styles.container}>
        <Wrapper label={'Date'}>
          <DatePickerNative
            mode={'date'}
            error={errors.logDate}
            value={values?.logDate?.value}
            onChange={(value: any) => {
              onChange('logDate', value)
            }}
            placeholder="Choose Date"
            style={{ marginTop: 6 }}
            maxDate={new Date()}
            minDate={new Date(minDate)}
            readOnly={isSubmitting}
          />
        </Wrapper>

        <Wrapper label={'Hours'} required={false}>
          <TextInputEl
            placeholder={'Log Hours'}
            inputMode="numeric"
            viewStyles={{ backgroundColor: colors.lighterBackground, marginBottom: 0 }}
            value={values.logHours.value}
            onChangeText={(value: string) => {
              onChange('logHours', value)
            }}
            error={errors.logHours}
            readOnly={isSubmitting}
          />
        </Wrapper>

        <Wrapper label={'Minutes'} required={false}>
          <TextInputEl
            inputMode="numeric"
            placeholder={'Log Minutes'}
            viewStyles={{ backgroundColor: colors.lighterBackground, marginBottom: 0 }}
            onChangeText={(value: string) => onChange('logMinutes', value)}
            value={values.logMinutes.value}
            error={errors.logMinutes}
            readOnly={isSubmitting}
          />
        </Wrapper>

        <Wrapper label={'Log Type'} style={{ zIndex: 2000 }}>
          <Dropdown
            value={values.logType.value}
            items={logTypes}
            placeholder="Select Log Type"
            setValue={(value: any) => {
              onChange('logType', value())
            }}
            zIndex={1000}
            isMarginOutside
            open={open}
            setOpen={setOpen}
            error={errors.logType}
            disabled={isSubmitting}
            mainStyles={{ paddingRight: 25 }}
            showErrorMessage={false}
          />
        </Wrapper>

        {showProject && (
          <Wrapper label={'Project Name'} style={{ marginTop: open ? -160 : 0 }}>
            <Pressable onPress={() => setSearchModalOpen(!isSubmitting)}>
              <View pointerEvents="none">
                <TextInputEl
                  placeholder="Select Projects"
                  readOnly={true}
                  modelOpen={true}
                  viewStyles={{ backgroundColor: colors.lighterBackground, marginBottom: 0 }}
                  onChangeText={(value: string) => onChange('projectName', value)}
                  value={finalProjectName}
                  error={errors.projectName}
                  iconToRight={true}
                  rightIcon={
                    <Icon
                      name={'KeyboardDownArrow'}
                      isStroke={true}
                      stroke={colors.iconColor}
                      height={20}
                      width={20}
                    />
                  }
                  showErrorMessage={false}
                />
              </View>
            </Pressable>
          </Wrapper>
        )}

        <Wrapper label={'Remarks'} style={{ marginTop: !showProject && open ? -160 : 0 }}>
          <TextInputEl
            placeholder={'Add Remarks'}
            multiline={true}
            value={values?.remarks?.value}
            viewStyles={{
              height: 90,
              alignItems: 'flex-start',
              backgroundColor: colors.lighterBackground,
              marginBottom: 0,
            }}
            styles={{ height: '100%' }}
            onChangeText={(value: string) => onChange('remarks', value)}
            error={errors.remarks}
            readOnly={isSubmitting}
            showErrorMessage={false}
          />
        </Wrapper>

        <CheckboxEl
          label={'Overtime'}
          checked={values?.overtime?.value}
          onPress={() => onChange('overtime', !values?.overtime?.value)}
          styles={{ marginTop: 8 }}
          disabled={isSubmitting}
        />
        {isZeroMinuteHour && (
          <MyText
            hasCustomColor
            style={{ color: calendarWeedkendColor }}
            fontStyle={FONT_CONST.rubikRegular}
          >
            Hours and minutes cannot be 0 simultaneously
          </MyText>
        )}
      </View>

      <View style={{ ...styles.btnContainer, zIndex: -1 }}>
        <ButtonEl
          backgroundColor={'#424243'}
          styles={styles.btnStyle}
          title={'RESET'}
          disabled={isSubmitting}
          onPress={clearValues}
          btnTextColor={'#FFFFFF'}
        />
        <ButtonEl
          styles={styles.btnStyle}
          title={'SUBMIT'}
          onPress={handleSubmit}
          disabled={isSubmitting}
          btnTextColor={'#FFFFFF'}
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: 8,
    padding: 12,
    flex: 1,
  },
  btnContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 10,
    marginTop: 10,
    marginRight: 10,
    marginBottom: 40,
    columnGap: 15,
  },
  btnStyle: {
    flex: 1,
  },
})

export default AddLogScreen
