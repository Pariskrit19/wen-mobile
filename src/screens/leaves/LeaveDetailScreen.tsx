import React, { useRef, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { NavigationProp } from '@react-navigation/native'
import CommonDetails from 'components/modules/CommonDetails'
import ButtonEl from 'components/elements/Button'
import { LeaveRoutes } from 'constants/routes'
import moment from 'moment'
import { LEAVE_INTERVAL, LEAVE_STATUS_TYPES, RoleAccess } from 'helpers/constants'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { changeLeaveStatus, getLeaveTypes, sendEmailforLeave } from 'services/leaves'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { commonToast, handleResponse, isLeavesBeforeToday, removeDash } from 'helpers/utils'
import useForm from 'hooks/useForm'
import { socket } from '../../../App'
import { useToast } from 'react-native-toast-notifications'
import { useAppSelector } from 'redux/hook'
import LatePunchInModal from 'components/modules/attendances/LatePunchInModal'
import { ScrollView } from 'react-native-gesture-handler'
interface leaveDetailProps {
  navigation: NavigationProp<any, any>
  route: any
}

const LeaveConstTitle = [
  { name: 'leaveType', title: 'Leave Type' },
  { name: 'leaveInteval', title: 'Leave Interval' },
  { name: 'leaveDates', title: 'Leave Date/s' },
  { name: 'leaveStatus', title: 'Leave Status' },
  { name: 'leaveReason', title: 'Leave Reason' },
  { name: 'rejectReason', title: 'Reject Reason' },
  { name: 'reapplyreason', title: 'Reapply Reason' },
  { name: 'cancelReason', title: 'Cancel Reason' },
  { name: 'documentFile', title: 'Leave Document' },
]

const LeaveDetailScreen = ({ route, navigation }: leaveDetailProps) => {
  const queryClient = useQueryClient()
  const toast = useToast()
  const authUser = useAppSelector((state) => state?.auth?.authUser)

  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const {
    leaveDocument,
    leaveDates,
    leaveStatus,
    leaveType,
    halfDay,
    reason,
    _id,
    reapplyreason,
    cancelReason,
    rejectReason,
  } = route.params.item
  const handleLeaveReapplyCancel = async (reason?: string) => {
    try {
      if (leaveStatus === LEAVE_STATUS_TYPES[4]?.id) {
        leavereapplyMutation.mutate({
          id: _id,
          type: 'pending',
          status: '',
          reapplyreason: reason,
        })
      } else {
        leaveCancelMutation.mutate({
          id: _id,
          type: leaveStatus === LEAVE_STATUS_TYPES[1]?.id ? 'user-cancel' : 'cancel',
          reason: reason,
        })
      }
    } catch (err) {
      commonToast({ toast: toast, message: 'Something went wrong!', type: 'danger' })
    }

    bottomSheetModalRef.current?.dismiss()
  }

  const leaveCancelMutation: any = useMutation(
    (payload) => changeLeaveStatus(payload?.id, payload?.type, payload.reason),
    {
      onSuccess: (response) => {
        if (response.status) {
          handleResponse(
            response,

            [
              () => sendEmailNotification(response),
              () => queryClient.invalidateQueries(['userLeaves']),
              () => queryClient.invalidateQueries(['leaves']),
              () => queryClient.invalidateQueries(['substitute']),
              () => queryClient.invalidateQueries(['takenAndRemainingLeaveDays']),
              () => queryClient.invalidateQueries(['leavesSummary']),
              () => {
                socket.emit('CUD')
              },
              () => {
                const showToRoles = ['hr'].includes(authUser?.role?.key)
                  ? [RoleAccess.Admin]
                  : [RoleAccess.Admin, RoleAccess.HumanResource]
                socket.emit('cancel-leave', {
                  showTo: showToRoles,
                  remarks: `${`${authUser?.name} has Cancelled Leave. Please review`}`,
                  module: 'Leave',
                  extraInfo: JSON.stringify({
                    userId: authUser?._id,
                    status: 'user cancelled',
                  }),
                })
              },
              () => navigation.goBack(),
              () =>
                toast.show('Leave cancelled successfully', {
                  type: 'success',
                }),
            ]
          )
        } else {
          commonToast({ toast: toast, message: 'Could not cancel leave', type: 'danger' })
        }
      },
      onError: (error) => {
        commonToast({ toast: toast, message: 'Could not cancel leave', type: 'danger' })
      },
    }
  )

  const emailMutation = useMutation((payload) => sendEmailforLeave(payload))

  const sendEmailNotification = (res: any) => {
    emailMutation.mutate({
      leaveStatus: res?.data?.data?.leaveStatus,
      leaveDates: res?.data?.data?.leaveDates,
      user: res?.data?.data?.user,
      leaveReason: res?.data?.data?.reason,
      leaveType: res?.data?.data?.leaveType?.name,
      userCancelReason: res?.data?.data?.cancelReason,
      reapply: res?.reapply,
      leaveCancelReason: res?.data?.data?.cancelReason,
    })
  }

  const leavereapplyMutation: any = useMutation(
    (payload) => changeLeaveStatus(payload.id, payload.type, '', payload.reapplyreason),
    {
      onSuccess: (response) => {
        if (response.status) {
          handleResponse(response, [
            () => sendEmailNotification({ ...response, reapply: true }),
            () => queryClient.invalidateQueries(['userLeaves']),
            () => queryClient.invalidateQueries(['leaves']),
            () => queryClient.invalidateQueries(['takenAndRemainingLeaveDays']),
            () => {
              socket.emit('CUD')
            },
            () => {
              socket.emit('cancel-leave', {
                showTo: [response?.data?.data?.data?.user?._id],
                remarks: 'Leave reapplied succesfully',
                module: 'Leave',
                extraInfo: JSON.stringify({
                  status: 'pending',
                }),
              })
            },
            () => toast.show('Leave Reapplied successfully', { type: 'success' }),
            () => navigation.goBack(),
          ])
        }
      },
      onError: (error) => {
        toast.show('Could not re-apply leave', { type: 'success' })
      },
    }
  )

  const handleEdit = () => {
    navigation.navigate(LeaveRoutes.AddLeave, { item: route.params.item })
  }

  const handleCancelModal = () => {
    bottomSheetModalRef.current?.snapToIndex(0)
  }

  const detailsDate =
    leaveDates?.length > 1
      ? `${moment(leaveDates[0]).format('YYYY/MM/DD')} - ${moment(leaveDates.at(-1)).format(
          'YYYY/MM/DD'
        )}`
      : moment(leaveDates[0]).format('YYYY/MM/DD')

  const detailsInterval = halfDay
    ? LEAVE_INTERVAL.find((d: Object) => d?.value === halfDay)?.label
    : 'Full Day'

  return (
    <ScrollView>
      <View style={styles.container}>
        <LatePunchInModal
          onSubmit={handleLeaveReapplyCancel}
          buttonText={'Submit'}
          title={
            leaveStatus === LEAVE_STATUS_TYPES[4]?.id
              ? 'Leave Reapply Reason'
              : 'Cancel Leave Reason'
          }
          bottomSheetModalRef={bottomSheetModalRef}
        />
        <CommonDetails
          detailTitle={'Leave Details'}
          titles={LeaveConstTitle}
          fields={{
            leaveType: leaveType?.name,
            leaveInteval: detailsInterval,
            leaveDates: detailsDate,
            leaveStatus: leaveStatus.charAt(0).toUpperCase() + leaveStatus.slice(1),
            leaveReason: reason,
            rejectReason,
            reapplyreason,
            cancelReason,
            documentFile: leaveDocument,
          }}
        />
        {leaveStatus === LEAVE_STATUS_TYPES[2].id && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 40,
              marginHorizontal: 12,
            }}
          >
            <ButtonEl
              title="CANCEL"
              onPress={handleCancelModal}
              btnWidth="48.5%"
              btnTextColor="white"
              styles={{ backgroundColor: '#424243' }}
            />
            <ButtonEl title="EDIT" onPress={handleEdit} btnWidth={'48.5%'} btnTextColor="white" />
          </View>
        )}
        {((leaveStatus === LEAVE_STATUS_TYPES[1]?.id && isLeavesBeforeToday(leaveDates)) ||
          leaveStatus === LEAVE_STATUS_TYPES[4]?.id) && (
          <View
            style={{
              marginTop: 20,
              marginHorizontal: 12,
            }}
          >
            <ButtonEl
              title={leaveStatus === LEAVE_STATUS_TYPES[1]?.id ? 'CANCEL' : 'REAPPLY'}
              onPress={handleCancelModal}
              btnWidth="100%"
              btnTextColor="white"
              styles={{ backgroundColor: '#424243' }}
            />
          </View>
        )}
      </View>
    </ScrollView>
  )
}

export default LeaveDetailScreen

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'flex-start',
  },
})
