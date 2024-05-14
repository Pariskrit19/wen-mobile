import React from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { useAppSelector } from 'redux/hook'

export function useRefreshOnFocus<T>(refetchArrays: any[]) {
  const firstTimeRef = React.useRef(true)
  const isOffline = useAppSelector((state) => state?.common?.isOffline)
  useFocusEffect(
    React.useCallback(() => {
      if (isOffline) return
      if (firstTimeRef.current) {
        firstTimeRef.current = false
        return
      }

      refetchArrays.forEach((refetch) => {
        refetch()
      })
      return () => (firstTimeRef.current = true)
    }, [refetchArrays])
  )
}
