import { QueryClient, useInfiniteQuery } from '@tanstack/react-query'
import { useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native'

export const usePagination = (
  queryKey: string[],
  queryFunction: any,
  transformQueryData?: any,
  isOffline?: boolean
) => {
  const queryClient = new QueryClient()

  const response = useInfiniteQuery(
    queryKey,
    async ({ pageParam = 1 }) => {
      const res = await queryFunction(pageParam)
      return { res, pageNumber: pageParam + 1 }
    },
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.res.data?.data?.length < 10) return undefined
        return lastPage.pageNumber
      },
      select: transformQueryData,
      enabled: !isOffline,
    }
  )

  useFocusEffect(
    useCallback(() => {
      return () => {
        queryClient.setQueryData([queryKey[0]], {
          pageParams: [undefined],
          pages: [{ pageNumber: 2, res: { ...response?.data?.pages?.[0]?.res } }],
        })
      }
    }, [])
  )

  return response
}
