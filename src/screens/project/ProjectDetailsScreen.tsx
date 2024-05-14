import React from 'react'
import { Linking, Pressable, ScrollView, StyleSheet, View, useWindowDimensions } from 'react-native'
import MyText from 'components/elements/MyText'
import { NavigationProp, useTheme } from '@react-navigation/native'
import DetailsElement from 'components/elements/DetailsElement'
import SwitchSelect from 'components/elements/SwitchSelect'
import { Colors } from 'constants/colors'
import { changeDate, convertToNameArray } from 'helpers/utils'

interface DetailProps {
  route: any
  navigation: NavigationProp<any, any>
}

const ProjectDetailsScreen = ({ route, navigation }: DetailProps) => {
  const { width } = useWindowDimensions()
  const textWidth = width - 60 - width * 0.4 //linkWidth after subtraction margin, padding and label width
  const { colors } = useTheme()
  const data = route.params.item

  return (
    <ScrollView>
      <MyText style={styles.heading}>Project Details</MyText>
      <View
        style={{
          ...styles.main,
          backgroundColor: colors.headerBackground,
          borderColor: colors.calendarHeaderBorder,
        }}
      >
        <DetailsElement title="Project Name" value={data?.name} />
        <View style={styles.container}>
          <MyText style={{ ...styles.title, color: colors.subHeaderFont }}>Priority</MyText>
          <SwitchSelect priority={data?.priority} />
        </View>
        <DetailsElement title="Path" value={data?.path} numOfLines />
        <DetailsElement
          title="Estimated Hours"
          value={data?.estimateHistory?.at(-1)?.estimatedHours}
        />
        <DetailsElement title="Start Date" value={changeDate(data?.startDate)} />
        <DetailsElement
          title="End Date"
          value={data?.endDate ? changeDate(data?.endDate) : 'N/A'}
        />
        <DetailsElement
          title="Type"
          value={
            data?.projectTypes?.length > 1
              ? convertToNameArray(data?.projectTypes)?.join(', ')
              : data?.projectTypes[0]?.name ?? 'N/A'
          }
        />
        <DetailsElement title="Status" value={data?.projectStatus?.name} />
        <DetailsElement
          title="Tags"
          value={
            data?.projectTags?.length > 1
              ? convertToNameArray(data?.projectTags)?.join(', ')
              : data?.projectTags[0]?.name ?? 'N/A'
          }
        />
        <DetailsElement title="Client" value={data?.client?.name} />
        <DetailsElement
          title="Developers"
          value={
            data?.developers?.length > 1
              ? convertToNameArray(data?.developers)?.join(', ')
              : data?.developers[0]?.name ?? 'N/A'
          }
        />
        <DetailsElement
          title="Designers"
          value={
            data?.designers?.length > 1
              ? convertToNameArray(data?.designers)?.join(', ')
              : data?.designers[0]?.name ?? 'N/A'
          }
        />
        <DetailsElement
          title="QA"
          value={
            data?.qa?.length > 1
              ? convertToNameArray(data?.qa)?.join(', ')
              : data?.qa[0]?.name ?? 'N/A'
          }
        />
        <DetailsElement
          title="DevOps"
          value={
            data?.devOps?.length > 1
              ? convertToNameArray(data?.devOps)?.join(', ')
              : data?.devOps[0]?.name ?? 'N/A'
          }
        />
        <View style={{ ...styles.container }}>
          <MyText style={{ ...styles.title, color: colors.subHeaderFont }}>Staging URL</MyText>
          <MyText
            style={{
              ...styles.field,
              marginLeft: 15,
              color: colors.descriptionFont,
            }}
            hasCustomColor
          >
            {data?.stagingUrls?.length > 0
              ? data?.stagingUrls?.map((d: string) => (
                  <Pressable
                    onPress={() => Linking.openURL(d)}
                    key={d}
                    style={{ flexDirection: 'row' }}
                  >
                    <View style={{ marginRight: 2, flexWrap: 'wrap', flex: 1 }}>
                      <MyText
                        style={{
                          ...styles.linkStyles,
                          width: textWidth,
                        }}
                      >
                        {d}{' '}
                      </MyText>
                    </View>
                  </Pressable>
                ))
              : 'Nothing right now'}
          </MyText>
        </View>
        <View style={styles.container}>
          <MyText style={{ ...styles.title, color: colors.subHeaderFont }}>Live URL</MyText>
          <MyText
            style={{
              ...styles.field,
              marginLeft: 15,
              color: colors.descriptionFont,
            }}
            hasCustomColor
          >
            {data?.liveUrl ? (
              <Pressable onPress={() => Linking.openURL(data?.liveUrl)}>
                <View style={{ marginRight: 2, flexWrap: 'wrap' }}>
                  <MyText style={{ ...styles.linkStyles, flexWrap: 'wrap', width: textWidth }}>
                    {data?.liveUrl}
                  </MyText>
                </View>
              </Pressable>
            ) : (
              'Nothing right now'
            )}
          </MyText>
        </View>
        <DetailsElement title="Notes" value={data?.notes || '_ _'} />
        <View style={styles.container}>
          <MyText style={{ ...styles.title, color: colors.subHeaderFont }}>Maintenance</MyText>
          <SwitchSelect priority={data?.maintenance?.[0]?.enabled} />
        </View>
      </View>
    </ScrollView>
  )
}

export default ProjectDetailsScreen

const styles = StyleSheet.create({
  main: {
    borderColor: 'black',
    paddingTop: 15,
    margin: 12,
    borderRadius: 5,
    borderWidth: 1,
  },
  heading: {
    marginTop: 20,
    marginLeft: 15,
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 10,
    marginBottom: 15,
    marginLeft: 20,
    marginRight: 26,
  },
  title: {
    width: '40%',
    fontSize: 14,
    fontWeight: 'bold',
  },
  field: {
    paddingRight: 2,
    marginLeft: 15,
    width: '60%',
    fontSize: 14,
    color: '#424243',
  },
  linkStyles: {
    color: Colors.primaryLink,
    textDecorationLine: 'underline',
  },
})
