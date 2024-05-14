import CommonDetails from 'components/modules/CommonDetails'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useAppSelector } from 'redux/hook'

type Props = {}
const userInfoKeys = [
  { name: 'name', title: 'Full Name' },
  { name: 'position', title: 'Position Type' },
  { name: 'username', title: 'Username' },
  { name: 'dob', title: 'Date of Birth' },
  { name: 'gender', title: 'Gender' },
  { name: 'primaryPhone', title: 'Primary Phone' },
  { name: 'secondaryPhone', title: 'Secondary Phone' },
  { name: 'joinDate', title: 'Joined Date' },
]

const MyInformation = (props: Props) => {
  const authUser = useAppSelector((state) => state?.auth?.authUser)

  const userInfoValues = {
    name: authUser?.name,
    position: authUser?.position?.name,
    username: authUser?.username,
    dob: authUser?.dob?.split('T')?.[0],
    gender: authUser?.gender,
    primaryPhone: authUser?.primaryPhone,
    secondaryPhone: authUser?.secondaryPhone,
    joinDate: authUser?.joinDate?.split('T')?.[0],
  }

  return (
    <View style={styles.container}>
      <CommonDetails fields={userInfoValues} titles={userInfoKeys} />
    </View>
  )
}

export default MyInformation

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
