import React, { useEffect, useMemo, useState } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import Dropdown from 'components/elements/Dropdown'
import ButtonEl from 'components/elements/Button'
import { useTheme } from '@react-navigation/native'
import { useQueries } from '@tanstack/react-query'
import {
  getProjectClients,
  getProjectStatus,
  getProjectTags,
  getProjectTypes,
} from 'services/projects'
import { getAllUsers, getUserPositionTypes } from 'services/users'
import { commonToast, dropdownFormat } from 'helpers/utils'
import { NO_INTERNET, PROJECT_FILTER } from 'helpers/constants'
import { MyThemeType } from 'ts/types'
import CommonBottomSheetModal from 'components/elements/CommonBottomSheetModal'
import { useAppSelector } from 'redux/hook'
import { useToast } from 'react-native-toast-notifications'
import { BottomSheetScrollView } from '@gorhom/bottom-sheet'

export const POSITION_TYPES = {
  developer: 'developer',
  designer: 'designer',
  devops: 'devops',
  qa: 'qa',
  management: 'management',
}
type Props = {
  show: boolean
  handleModalShow: React.Dispatch<React.SetStateAction<boolean>>
  projectData: any
  setProjectData: React.Dispatch<React.SetStateAction<any>>
  bottomSheetRef: any
}
const ProjectModal = ({
  show,
  handleModalShow,
  projectData,
  setProjectData,
  bottomSheetRef,
}: Props) => {
  const isOffline = useAppSelector((state) => state?.common?.isOffline)
  const { colors } = useTheme() as MyThemeType
  const toast = useToast()
  const [positionTypeData, setPositionTypeData] = useState<any>({})
  const [tempProjectStatus, setTempProjectStatus] = useState(projectData.projectStatus?.value)
  const [tempProjectTags, setTempProjectTags] = useState(projectData.projectTags?.value)
  const [tempProjectType, setTempProjectType] = useState(projectData.projectType?.value)
  const [tempProjectClient, setTempprojectClient] = useState(projectData.projectClient?.value)
  const [tempDeveloper, setTempDeveloper] = useState(projectData.developer?.value)
  const [tempDesigner, setTempDesigner] = useState(projectData.designer?.value)
  const [tempQa, setTempQa] = useState(projectData.qa?.value)
  const [fetchData, setFetchData] = useState(false)
  const [open, setOpen] = useState<string>('')

  useEffect(() => {
    setTempProjectStatus(projectData.projectStatus?.value)
    setTempProjectTags(projectData.projectTags?.value)
    setTempProjectType(projectData.projectType?.value)
    setTempprojectClient(projectData.projectClient?.value)
    setTempDeveloper(projectData.developer?.value)
    setTempDesigner(projectData.designer?.value)
    setTempQa(projectData.qa?.value)
    if (!fetchData && show && !isOffline) setFetchData(true)
  }, [show])

  const [
    typesQuery,
    statusQuery,
    clientQuery,
    tagsQuery,
    positionTypeQuery,
    designerQuery,
    developerQuery,
    QAquery,
  ] = useQueries({
    queries: [
      {
        queryKey: ['projectTypes'],
        queryFn: getProjectTypes,
        select: (data: any) => dropdownFormat(data?.data?.data, true),
      },
      {
        queryKey: ['projectStatus'],
        queryFn: getProjectStatus,
        select: (data: any) => dropdownFormat(data?.data?.data),
        enabled: fetchData,
      },
      {
        queryKey: ['projectClients'],
        queryFn: getProjectClients,
        select: (data: any) => dropdownFormat(data?.data?.data),
        enabled: fetchData,
      },
      {
        queryKey: ['tags'],
        queryFn: getProjectTags,
        select: (data: any) => dropdownFormat(data?.data?.data),
        enabled: fetchData,
      },
      {
        queryKey: ['userPositionTypes'],
        queryFn: getUserPositionTypes,
        select: (data: any) => dropdownFormat(data?.data?.data),
        enabled: fetchData,
      },
      {
        queryKey: ['designers', positionTypeData],
        queryFn: () => getAllUsers({ positionType: positionTypeData?.designer, sort: 'name' }),
        select: (data: any) => dropdownFormat(data?.data?.data),
        enabled: fetchData,
      },
      {
        queryKey: ['developers', positionTypeData],
        queryFn: () => getAllUsers({ positionType: positionTypeData?.developer, sort: 'name' }),
        select: (data: any) => dropdownFormat(data?.data?.data),
        enabled: fetchData,
      },
      {
        queryKey: ['QA', positionTypeData],
        queryFn: () => getAllUsers({ positionType: positionTypeData?.qa, sort: 'name' }),
        select: (data: any) => dropdownFormat(data?.data?.data),
        enabled: fetchData,
      },
    ],
  })

  React.useEffect(() => {
    if (positionTypeQuery?.data?.length) {
      setPositionTypeData({
        developer: positionTypeQuery?.data?.find(
          (type: any) => type?.label?.toLowerCase() === POSITION_TYPES?.developer
        )?.value,
        designer: positionTypeQuery?.data?.find(
          (type: any) => type?.label?.toLowerCase() === POSITION_TYPES?.designer
        )?.value,
        qa: positionTypeQuery?.data?.find(
          (type: any) => type?.label?.toLowerCase() === POSITION_TYPES?.qa
        )?.value,
      })
    }
  }, [positionTypeQuery?.data])

  const getLabelProjectFilter = (id: string, arr?: any[]) => {
    return arr?.find((d) => d?.value === id)
  }

  const handleApplyFilter = () => {
    setProjectData((prev: any) => ({
      ...prev,
      projectStatus: getLabelProjectFilter(tempProjectStatus, statusQuery?.data),
      projectTags: getLabelProjectFilter(tempProjectTags, tagsQuery?.data),
      projectType: getLabelProjectFilter(tempProjectType, typesQuery?.data),
      projectClient: getLabelProjectFilter(tempProjectClient, clientQuery?.data),
      developer: getLabelProjectFilter(tempDeveloper, developerQuery?.data),
      designer: getLabelProjectFilter(tempDesigner, designerQuery?.data),
      qa: getLabelProjectFilter(tempQa, QAquery?.data),
    }))
    bottomSheetRef.current?.close()
  }
  const handleReset = () => {
    setTempProjectStatus(undefined)
    setTempProjectTags(undefined)
    setTempProjectType(undefined)
    setTempprojectClient(undefined)
    setTempDeveloper(undefined)
    setTempDesigner(undefined)
    setTempQa(undefined)
  }

  const snapPoints = useMemo(() => ['83%', '100%'], [])

  if (
    isOffline &&
    ((open === PROJECT_FILTER.projectStatus && !statusQuery?.data) ||
      (open === PROJECT_FILTER.projectTypes && !typesQuery?.data) ||
      (open === PROJECT_FILTER.projectTags && !tagsQuery?.data) ||
      (open === PROJECT_FILTER.projectClients && !clientQuery?.data) ||
      (open === PROJECT_FILTER.projectQa && !QAquery?.data) ||
      (open === PROJECT_FILTER.projectDeveloper && !developerQuery?.data) ||
      (open === PROJECT_FILTER.projectDesigner && !designerQuery?.data))
  ) {
    commonToast({ toast: toast, message: NO_INTERNET, type: 'warning' })
  }

  return (
    <CommonBottomSheetModal
      snapPoints={snapPoints}
      bottomSheetModalRef={bottomSheetRef}
      onDismiss={() => handleModalShow(false)}
      contentPanning={!open}
    >
      <BottomSheetScrollView style={{ flex: 1 }}>
        <View style={[styles.safeArea, { backgroundColor: colors.headerBackground }]}>
          <View style={{ flex: 1 }} onStartShouldSetResponder={() => true}>
            <View style={styles.container}>
              <Dropdown
                label="Project Type"
                open={open === PROJECT_FILTER.projectTypes}
                setOpen={(data: boolean) => setOpen(data ? PROJECT_FILTER.projectTypes : '')}
                items={typesQuery?.data}
                placeholder="Select Project Type"
                isProject
                setValue={(value: any) => {
                  setTempProjectType(value)
                }}
                zIndex={3500}
                value={tempProjectType}
                styles={{ ...styles.dropdownStyles, width: '100%' }}
                scroll
                index={7}
              />

              <Dropdown
                label="Project Status"
                open={open === PROJECT_FILTER.projectStatus}
                setOpen={(data: boolean) => setOpen(data ? PROJECT_FILTER.projectStatus : '')}
                items={statusQuery?.data}
                placeholder="Select Project Status"
                setValue={setTempProjectStatus}
                zIndex={3000}
                zIndexInverse={100}
                value={tempProjectStatus}
                styles={styles.dropdownStyles}
                scroll
                adjustScrollMargin
                index={6}
                isProject
              />
              <Dropdown
                label="Project Tag"
                open={open === PROJECT_FILTER.projectTags}
                setOpen={(data: boolean) => setOpen(data ? PROJECT_FILTER.projectTags : '')}
                items={tagsQuery?.data}
                placeholder="Select Project Tag"
                setValue={setTempProjectTags}
                zIndex={3000}
                zIndexInverse={100}
                value={tempProjectTags}
                styles={styles.dropdownStyles}
                scroll
                index={5}
                adjustScrollMargin
                isProject
              />
              <Dropdown
                label="Client"
                open={open === PROJECT_FILTER.projectClients}
                setOpen={(data: boolean) => setOpen(data ? PROJECT_FILTER.projectClients : '')}
                items={clientQuery?.data}
                placeholder="Select Client"
                setValue={setTempprojectClient}
                zIndex={3000}
                zIndexInverse={390000}
                value={tempProjectClient}
                styles={styles.dropdownStyles}
                adjustScrollMargin
                scroll
                index={4}
                isProject
              />
              <Dropdown
                label="QA"
                open={open === PROJECT_FILTER.projectQa}
                setOpen={(data: boolean) => setOpen(data ? PROJECT_FILTER.projectQa : '')}
                items={QAquery?.data}
                placeholder="Select QA"
                setValue={setTempQa}
                zIndex={3000}
                zIndexInverse={390000}
                value={tempQa}
                styles={styles.dropdownStyles}
                adjustScrollMargin
                scroll
                index={3}
                isProject
              />
              <Dropdown
                label="Developer"
                open={open === PROJECT_FILTER.projectDeveloper}
                setOpen={(data: boolean) => setOpen(data ? PROJECT_FILTER.projectDeveloper : '')}
                items={developerQuery?.data}
                placeholder="Select Developer"
                setValue={setTempDeveloper}
                zIndex={3000}
                zIndexInverse={400000}
                value={tempDeveloper}
                styles={styles.dropdownStyles}
                adjustScrollMargin
                scroll
                index={2}
                isProject
              />
              <Dropdown
                label="Designer"
                open={open === PROJECT_FILTER.projectDesigner}
                setOpen={(data: boolean) => setOpen(data ? PROJECT_FILTER.projectDesigner : '')}
                items={designerQuery?.data}
                placeholder="Select Designer"
                setValue={setTempDesigner}
                zIndex={3000}
                zIndexInverse={400000}
                value={tempDesigner}
                styles={styles.dropdownStyles}
                adjustScrollMargin
                scroll
                index={1}
                isProject
              />
              <View style={styles.buttonStyles}>
                <ButtonEl
                  title="RESET"
                  onPress={handleReset}
                  btnWidth="48%"
                  btnTextColor="white"
                  styles={{ backgroundColor: colors.resetButton }}
                />
                <ButtonEl
                  title="APPLY FILTER"
                  onPress={handleApplyFilter}
                  btnWidth={'48%'}
                  btnTextColor="white"
                />
              </View>
            </View>
          </View>
        </View>
      </BottomSheetScrollView>
    </CommonBottomSheetModal>
  )
}
export default ProjectModal
const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    flexDirection: 'row',
    flexWrap: 'wrap',
    // columnGap: 12,
    justifyContent: 'space-between',
    marginHorizontal: 12,
    width: '94.4%',
  },
  top: {
    borderWidth: 3,
    borderColor: 'black',
    width: 40,
    alignSelf: 'center',
    borderRadius: 20,
    marginVertical: 20,
  },

  safeArea: {
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: 'hidden',
    width: '100%',
  },
  dropdownStyles: {
    marginBottom: 25,
    width: '48%',
  },
  buttonStyles: {
    flexDirection: 'row',
    width: '100%',
    flexWrap: 'wrap',
    marginTop: -150,
    zIndex: 1000000,
    justifyContent: 'space-between',
  },
  modalStyles: {
    margin: 0,
    justifyContent: 'flex-end',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
})
