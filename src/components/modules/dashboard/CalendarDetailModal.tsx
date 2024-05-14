import React, { useMemo } from 'react'
import CommonBottomSheetModal from 'components/elements/CommonBottomSheetModal'
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types'
import CommonEventModal from './calendars/CommonModalContent'
import { BottomSheetScrollView } from '@gorhom/bottom-sheet'

type Props = {
  bottomSheetModalRef: React.RefObject<BottomSheetModalMethods>
}

const CalendarDetailModal = ({ bottomSheetModalRef }: Props) => {
  const snapPoints = useMemo(() => ['70%', '100%'], [])
  return (
    <CommonBottomSheetModal bottomSheetModalRef={bottomSheetModalRef} snapPoints={snapPoints}>
      {({ data }: any) => (
        <BottomSheetScrollView style={{ flex: 1 }}>
          <CommonEventModal data={[data]} swipeEnabled={false} />
        </BottomSheetScrollView>
      )}
    </CommonBottomSheetModal>
  )
}

export default CalendarDetailModal
