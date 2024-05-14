import CommonDetails from 'components/modules/CommonDetails'
import React from 'react'
import { StyleSheet, View } from 'react-native'

const AttendanceDetail = ({ route, navigation }: { route: any; navigation: any }) => {
  const { fields, titles } = route.params

  return (
    <View style={styles.container}>
      <CommonDetails fields={fields} titles={titles} detailTitle="Attendance Details" />
    </View>
  )
}

export default AttendanceDetail

const styles = StyleSheet.create({
  container: {
    flex: 1,

    // shadowColor: '#000000',
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.1,
    // elevation: 16,
  },
  heading: {
    marginTop: 20,
    marginLeft: 15,
    fontSize: 20,
    color: 'black',

    fontWeight: 600,
  },
  details: {
    borderColor: 'black',
    padding: 20,
    margin: 15,
    borderRadius: 5,
    elevation: 2,
  },
  title: {
    width: 150,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
  },
  reason: {
    fontSize: 15,
    color: 'black',
  },
})
