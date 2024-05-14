import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MyText from 'components/elements/MyText'
import { useNavigation, useRoute } from '@react-navigation/native'
import CommonDetails from 'components/modules/CommonDetails'
import { changeDate } from 'helpers/utils'
import ButtonEl from 'components/elements/Button'
import { LogtimeRoutes, ProjectLogRoutes } from 'constants/routes'
import moment from 'moment'
import { useAppSelector } from 'redux/hook'

const LogDetails = () => {
  const authUser = useAppSelector((state) => state?.auth?.authUser)
  const route = useRoute()
  const navigation = useNavigation()
  const {
    item: {
      project,
      logDate,
      hours,
      minutes,
      logType,
      remarks,
      user,
      isOt,
      _id,
      showProject,
      otStatus,
    },
  } = route.params

  const handleLogEdit = () => {
    navigation.navigate(showProject ? LogtimeRoutes.AddLog : ProjectLogRoutes.AddLog, {
      project,
      logDate,
      hours,
      minutes,
      logType,
      remarks,
      user,
      isOt,
      logId: _id,
      showProject,
      isEdit: true,
    })
  }

  const logDetailsKeys = [
    { name: 'name', title: 'Project' },
    { name: 'date', title: 'Date' },
    { name: 'hours', title: 'Hours' },
    { name: 'minutes', title: 'Minutes' },
    { name: 'logType', title: 'Log Type' },
    ...(!showProject ? [{ name: 'addedBy', title: 'Added By' }] : []),
    { name: 'overtime', title: 'Overtime' },
    { name: 'remarks', title: 'Remarks' },
  ]
  const logDetailValues = {
    name: project?.name || 'Other',
    date: changeDate(logDate),
    hours,
    minutes,
    logType: logType?.name,
    remarks,
    addedBy: user?.name,
    overtime: isOt ? 'Yes' : 'No',
  }

  return (
    <View>
      <CommonDetails fields={logDetailValues} titles={logDetailsKeys} />
      {/* enable edit for 2 days of logged in date */}
      {moment(logDate) >= moment().subtract(1, 'days').startOf('day') &&
        otStatus !== 'A' &&
        otStatus !== 'R' &&
        ((!showProject && user?._id === authUser?._id) || showProject) && (
          <View
            style={{
              marginTop: 20,
              marginHorizontal: 12,
            }}
          >
            <ButtonEl title={'EDIT'} onPress={handleLogEdit} btnWidth="100%" btnTextColor="white" />
          </View>
        )}
    </View>
  )
}

export default LogDetails

const styles = StyleSheet.create({})
