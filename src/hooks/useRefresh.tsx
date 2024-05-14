import React from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useAppSelector } from 'redux/hook'
import { is } from 'immer/dist/internal'

export const useRefresh = ({ keysToRevalidate }: { keysToRevalidate: string[] }) => {
  const queryClient = useQueryClient()
  const [refreshing, setRefreshing] = React.useState(false)
  const isOffline = useAppSelector((state) => state?.common?.isOffline)

  const onRefresh = React.useCallback(() => {
    setRefreshing(true)
    if (!isOffline) {
      if (keysToRevalidate.length === 1)
        queryClient.invalidateQueries({ queryKey: keysToRevalidate })
      else {
        keysToRevalidate.forEach((revalidateKey) => queryClient.invalidateQueries([revalidateKey]))
      }
    }
    if (isOffline) setRefreshing(false)
    else
      setTimeout(() => {
        setRefreshing(false)
      }, 2000)
  }, [])

  return { refreshing, onRefresh }
}
