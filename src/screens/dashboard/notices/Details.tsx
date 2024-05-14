import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CommonDetails from 'components/modules/CommonDetails'
import { useRoute } from '@react-navigation/native'

interface NoticeProps {
  title: string
  startDate: string
  endDate: string
  category: string
  startTime: string
  endTime: string
  details: string
}

const NoticeDetails = () => {
  const route = useRoute<any>()
  const { title, startDate, endDate, category, startTime, endTime, details, imageURL } =
    route.params
  const noticeDetailsKeys = [
    { name: 'title', title: 'Title' },
    { name: 'category', title: 'Category' },
    { name: 'startDate', title: 'Start Date', type: 'date' },
    { name: 'endDate', title: 'End Date', type: 'date' },
    { name: 'startTime', title: 'Start Time' },
    { name: 'endTime', title: 'End Time' },
    { name: 'details', title: 'Details' },
  ]
  const noticeDetailsValues = {
    title,
    startDate,
    endDate,
    category,
    startTime,
    endTime,
    details,
    imageURL,
  }
  return (
    <View>
      <CommonDetails
        detailTitle={'Notice Details'}
        titles={noticeDetailsKeys}
        fields={noticeDetailsValues}
        isURL
      />
    </View>
  )
}

export default NoticeDetails

const styles = StyleSheet.create({})
