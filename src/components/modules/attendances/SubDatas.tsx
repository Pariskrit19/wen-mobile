import MyText from 'components/elements/MyText'
import React from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { useTheme } from '@react-navigation/native'
import Icon from 'components/elements/Icon'
import { milliSecondIntoHours } from 'helpers/utils'
import moment from 'moment'

type Props = {
  Date?: string
  punchTimeDifference?: number
  punchInTime?: string
  punchOutTime?: string
  id: string
  isLeave?: boolean
  multi?: boolean
}

type Itemprops = Props & {
  subData?: [Props]
}

const SubDatas = ({ item, handleDetailMulti }: { item: Itemprops; handleDetailMulti: any }) => {
  const { colors } = useTheme()
  return (
    <View style={{ flexDirection: 'row', marginBottom: 15 }}>
      <View style={{ width: '21%' }}>
        <MyText></MyText>
      </View>
      <View
        style={{
          width: '100%',
          backgroundColor: colors.attendanceSubDatas,
        }}
      >
        {item?.subData?.map((d: Props) => (
          <Pressable
            onPress={() => handleDetailMulti(d)}
            style={{
              flexDirection: 'row',
              paddingVertical: 6,
            }}
            key={d?._id}
          >
            <MyText
              style={{ ...styles.normalDatas, color: colors.descriptionFont }}
              hasCustomColor
              fontStyle="rubikMedium"
            >
              {d.punchInTime}
            </MyText>
            <MyText
              style={{ ...styles.normalDatas, color: colors.descriptionFont }}
              hasCustomColor
              fontStyle="rubikMedium"
            >
              {d.punchOutTime ?? '--:--'}
            </MyText>
            <View style={styles.officeHourContainer}>
              <MyText
                style={{
                  ...styles.normalDatas,
                  flex: 0.92,
                  color: colors.totalWorkingHours,
                }}
                hasCustomColor
                fontStyle="rubikMedium"
              >
                {d?.punchTimeDifference || '--'}
              </MyText>
              <Pressable onPress={() => handleDetailMulti(d)} style={styles.pressableStyle}>
                <Icon
                  name="KeyboardRightArrow"
                  width={8}
                  isFill
                  fill={colors.iconColor}
                  containerStyles={{ paddingLeft: 7, paddingRight: 8 }}
                />
              </Pressable>
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  )
}

export default SubDatas

const styles = StyleSheet.create({
  normalAttendanceContainer: {
    alignSelf: 'center',
    width: '100%',
    flexDirection: 'row',
  },
  normalAttendances: {
    width: '21%',
    alignSelf: 'center',
  },
  elevate: {
    elevation: 5,
    shadowColor: 'black',
    shadowOpacity: 1,
    shadowRadius: 2,
    backgroundColor: 'white',
    width: '60%',
    alignSelf: 'center',
    paddingLeft: 5,
    borderRadius: 5,
  },
  normalDatas: {
    width: '25%',
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 12,
    fontWeight: '400',
  },
  dateDate: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
  },
  officeHourContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '29%',
  },
  pressableStyle: {
    alignSelf: 'center',
    justifyContent: 'center',
  },
})
