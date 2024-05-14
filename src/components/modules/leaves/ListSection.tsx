import React from 'react'
import { View, SectionList, StyleSheet, Pressable, RefreshControl } from 'react-native'
import { useNavigation, useTheme } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'
import { LeaveRoutes } from 'constants/routes'
import MyText from 'components/elements/MyText'
import Icon from 'components/elements/Icon'
import { defaultPinkColor } from 'styles/colors'
import { DaysConstant, FONT_CONST, FULL_MONTH_NAME } from 'helpers/constants'
import moment from 'moment'

const ListSection = ({
  list,
  refreshing,
  onRefresh,
  EmptyComponent,
}: {
  list: any
  refreshing?: boolean
  onRefresh?: any
  EmptyComponent?: React.ReactElement
}) => {
  const navigation = useNavigation<any>()
  const { colors } = useTheme()

  const handleRender = ({ item }: { item: any }) => {
    const statusColor =
      item?.leaveStatus === 'approved'
        ? '#4CB652'
        : item?.leaveStatus === 'pending'
        ? '#FD7E14'
        : defaultPinkColor
    const backgroundStatusColor =
      item?.leaveStatus === 'approved'
        ? '#e4f4e5'
        : item?.leaveStatus === 'pending'
        ? '#FFECDC'
        : '#fee5ea'

    const dateFormatLeaveList = (date: any, isMultiple?: boolean) => {
      const leaveDateFormat = date?.split('T')?.[0]
      const month = FULL_MONTH_NAME[parseInt(leaveDateFormat.split('-')[1]) - 1].substring(0, 3)
      const dayName = DaysConstant[moment(date).day()]
      const testDate = isMultiple
        ? `${parseInt(leaveDateFormat?.split('-')?.[2])}  ${month}`
        : `${dayName}, ${parseInt(leaveDateFormat?.split('-')?.[2])}  ${month}`
      return testDate
    }

    const listDateFormat =
      item?.leaveDates?.length > 1
        ? `${dateFormatLeaveList(item.leaveDates?.[0], true)} - ${dateFormatLeaveList(
            item.leaveDates?.at(-1),
            true
          )}`
        : dateFormatLeaveList(item.leaveDates?.[0])

    return (
      <Pressable
        onPress={() => {
          navigation.navigate(LeaveRoutes.LeaveDetails, { item: item })
        }}
        style={{
          ...styles.container,
          backgroundColor: colors.headerBackground,
        }}
      >
        <View style={styles.dayApplication}>
          <MyText
            style={{ ...styles.halfDay, color: colors.punchInOutTime }}
            hasCustomColor
            fontStyle={FONT_CONST.rubikRegular}
          >
            {item.halfDay ? 'Half' : 'Full'} Day Application
          </MyText>
          <View style={{ ...styles.leaveStatusContainer, backgroundColor: backgroundStatusColor }}>
            <Feather name="clock" size={10} color={statusColor} style={{ marginTop: -1 }} />
            <MyText
              style={{ ...styles.leaveStatus, color: statusColor, textTransform: 'capitalize' }}
              hasCustomColor
              fontStyle={FONT_CONST.rubikRegular}
            >
              {item.leaveStatus}
            </MyText>
          </View>
        </View>
        <View style={styles.bottomFlex}>
          <MyText
            style={{ ...styles.leaveDate, color: colors.headerFont }}
            fontStyle={FONT_CONST.extraBold}
            hasCustomColor
          >
            {listDateFormat}
          </MyText>
          <View style={{ ...styles.arrowContainer, backgroundColor: colors.leaveArrowContainer }}>
            <Icon
              name="KeyboardRightArrow"
              width={14}
              height={12}
              containerStyles={styles.arrowIcon}
              isFill
              fill={colors.iconColor}
            />
          </View>
          <MyText
            style={{
              color: `${item?.type === 'Sick' ? '#4363C6' : defaultPinkColor}`,
              fontSize: 12,
              fontWeight: '400',
              lineHeight: 13,
            }}
            hasCustomColor
            fontStyle={FONT_CONST.rubikRegular}
          >
            {item.leaveType?.name}
          </MyText>
        </View>
      </Pressable>
    )
  }

  const handleSectionHeader = ({ section }: { section: any }) => (
    <View style={styles.sectionHeader}>
      <Icon name="smallCalendar" width={18} height={18} isFill fill={'#05a9c5'} />
      <MyText style={styles.title} fontStyle={FONT_CONST.rubikRegular} hasCustomColor>
        {section.title}
      </MyText>
    </View>
  )

  return (
    <View>
      <SectionList
        sections={list}
        keyExtractor={(item, index) => item?._id + index}
        renderItem={handleRender}
        renderSectionHeader={handleSectionHeader}
        showsVerticalScrollIndicator={false}
        stickySectionHeadersEnabled={false}
        refreshControl={<RefreshControl onRefresh={onRefresh} refreshing={refreshing} />}
        ListEmptyComponent={EmptyComponent}
        ListFooterComponent={() => <View style={{ marginBottom: 80 }}></View>}
      />
    </View>
  )
}

export default ListSection

const styles = StyleSheet.create({
  container: {
    height: 103,
    // marginTop: 2,
    borderRadius: 5,
    shadowColor: ' rgba(0, 0, 0, 0.7)',
    shadowOpacity: 0.15,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 5,
    marginHorizontal: 15,
    elevation: 4,
    position: 'relative',
    marginBottom: 25,
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.5,
  },
  dayApplication: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    marginTop: 17,
    height: 22,
    alignItems: 'center',
  },
  halfDay: {
    fontSize: 14,
    lineHeight: 15,
  },
  leaveStatusContainer: {
    // width: 80,
    height: 22,
    borderRadius: 5,
    paddingHorizontal: 9,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  leaveStatus: {
    marginLeft: 3,
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 14,
  },
  leaveDate: {
    fontSize: 18,
    marginTop: 4,
    marginBottom: 8,
    lineHeight: 24.55,
  },
  bottomFlex: {
    flexDirection: 'column',

    marginHorizontal: 15,
    marginBottom: 17,
  },

  arrowContainer: {
    backgroundColor: 'rgba(66, 66, 67, 0.1)',
    height: 26,
    width: 26,
    justifyContent: 'center',
    position: 'absolute',
    top: '45%',
    right: 0,
    borderRadius: 2,
  },
  arrowIcon: {
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 14,
    color: '#05a9c5',
    marginLeft: 4,
    fontStyle: 'italic',
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 26,
    marginBottom: 8,
  },

  pendingStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
})
