import React, { useCallback, useEffect } from 'react'
import { BottomSheetBackdrop, BottomSheetModal, useBottomSheetModal } from '@gorhom/bottom-sheet'
import { useTheme } from '@react-navigation/native'
import { BackHandler } from 'react-native'
import { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types'

type Props = {
  children: any
  bottomSheetModalRef: any
  snapPoints: any
  onDismiss?: () => void
  contentPanning?: boolean
}

const CommonBottomSheetModal = ({
  snapPoints,
  children,
  bottomSheetModalRef,
  onDismiss,
  contentPanning = true,
}: Props) => {
  const { colors } = useTheme()
  const { dismiss } = useBottomSheetModal()

  const renderBackdrop = useCallback(
    (props: JSX.IntrinsicAttributes & BottomSheetDefaultBackdropProps) => (
      <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} />
    ),
    []
  )

  useEffect(() => {
    const handleBackButton = () => {
      return dismiss()
    }
    bottomSheetModalRef.current?.present()
    BackHandler.addEventListener('hardwareBackPress', handleBackButton)
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton)
    }
  }, [])

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={-1}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      backgroundStyle={{ backgroundColor: colors.card }}
      handleIndicatorStyle={{ backgroundColor: colors.text }}
      onDismiss={onDismiss}
      handleStyle={{ height: 50, justifyContent: 'center' }}
      enableContentPanningGesture={contentPanning}
      enableDismissOnClose={false}
    >
      {children}
    </BottomSheetModal>
  )
}

export default CommonBottomSheetModal
