import React from 'react'
import OfflineScreen from './OfflineScreen'
import { useAppSelector } from 'redux/hook'
import { ScrollView } from 'react-native'

type Props = {
  children: React.ReactNode
}

const OfflineWrapper = ({ children }: Props) => {
  const isOffline = useAppSelector((state) => state?.common?.isOffline)

  return (
    <>
      {isOffline && <OfflineScreen />}
      {children}
    </>
  )
}

export default OfflineWrapper
