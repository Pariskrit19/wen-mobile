import React, { useCallback, useMemo, useRef, useEffect, useState } from 'react'
import { Pressable, ScrollView, StyleSheet, View } from 'react-native'
import DatePickerNative from 'components/elements/DatePickerNative'
import TextInputEl from 'components/elements/form/TextInput'
import * as ImagePicker from 'expo-image-picker'
import { borderColor, textColor } from 'styles/colors'
import ButtonEl from 'components/elements/Button'
import { Wrapper } from 'screens/logTime/AddLogScreen'
import ImagePickerComponent from 'components/elements/imagePicker'
import { MaterialIcons } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage'

import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet'

type extraProps = {
  onClick: any
}

import MyText from 'components/elements/MyText'
import { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types'
import { NavigationProp, useTheme } from '@react-navigation/native'
import { Colors } from 'constants/colors'
import Dropdown from 'components/elements/Dropdown'
import { useAppDispatch, useAppSelector } from 'redux/hook'
import useForm from 'hooks/useForm'
import { useMutation } from '@tanstack/react-query'
import { updateProfile } from 'services/dashboard'
import { storage } from 'firebase'
import moment from 'moment'
import { setUserData } from 'redux/reducer/authSlice'
import { DashboardRoutes } from 'constants/routes'
import { useToast } from 'react-native-toast-notifications'
import { NO_INTERNET } from 'helpers/constants'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { commonToast } from 'helpers/utils'

const ProfileDetail = ({ navigation }: { navigation: NavigationProp<any, any> }) => {
  const [image, setImage] = useState<string | null>(null)
  const dispatch = useAppDispatch()
  const toast = useToast()

  const { colors } = useTheme()
  const authUser = useAppSelector((state) => state?.auth?.authUser)
  const isOffline = useAppSelector((state) => state?.common?.isOffline)
  const [dropdownOpen, setDropDownOpen] = React.useState<string>('')

  const initialState = {
    userName: { isRequired: true, value: authUser?.name },
    userUserName: { isRequired: false, value: authUser?.username },
    userPhoto: { isRequired: false, value: authUser?.photoURL },
    userDOB: { isRequired: false, value: new Date(authUser?.dob) },
    userGender: { isRequired: false, value: authUser?.gender },
    phone: { isRequired: false, value: `${authUser?.primaryPhone}`, isVital: true },
    userSecondaryPhone: {
      isRequired: false,
      value: authUser?.secondaryPhone && `${authUser?.secondaryPhone}`,
      isVital: true,
    },
    userJoinDate: { isRequired: false, value: new Date(authUser?.joinDate) },
    userMaritalStaus: { isRequired: false, value: authUser?.maritalStatus },
  }

  const { onSubmit, onChange, onBlur, values, errors, clearValues, isSubmitting, setSubmitting } =
    useForm(initialState, undefined, async () => {
      let updatedUser = {
        dob: moment.utc(values?.userDOB?.value).endOf('day').format().split('T')[0],
        // joinDate: moment.utc(values?.userJoinDate?.value).format(),
        primaryPhone: +values?.phone?.value,
        secondaryPhone: +values?.userSecondaryPhone?.value || null,
        photoURL: values?.userPhoto?.value || null,
        name: values?.userName?.value,
        gender: values?.userGender?.value,
        maritalStatus: values?.userMaritalStaus?.value,
      }
      //send updated data as payload
      if (values?.userPhoto?.value && authUser?.photoURL !== values?.userPhoto?.value) {
        const fileBlog = await getBlobFroUri(values?.userPhoto?.value)
        const storageRef = ref(storage, `profile/${values?.userPhoto?.value?.split('/').pop()}`)
        const uploadTask = uploadBytesResumable(storageRef, fileBlog)
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            // const pg = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            // setProgress(() => pg);
          },
          (error) => {
            // Handle unsuccessful uploads
            commonToast({
              toast: toast,
              message: 'Failed to upload image!',
              type: 'danger',
            })

            // setIsLoading(false)
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              updatedUser = {
                ...updatedUser,
                photoURL: downloadURL,
              }
              userUpdateMutation.mutate(updatedUser)
            })
          }
        )
      } else {
        userUpdateMutation.mutate(updatedUser)
      }
    })

  const handleSubmit = () => {
    if (isOffline) return commonToast({ toast: toast, message: NO_INTERNET, type: 'warning' })
    else onSubmit()
  }

  const getBlobFroUri = async (uri: string) => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.onload = function () {
        resolve(xhr.response)
      }
      xhr.onerror = function (e) {
        reject(new TypeError('Network request failed'))
      }
      xhr.responseType = 'blob'
      xhr.open('GET', uri, true)
      xhr.send(null)
    })

    return blob
  }
  const [items, setItems] = React.useState([
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
  ])
  const [maritalStatus, setMaritalStatus] = React.useState([
    { label: 'Unmarried', value: 'Unmarried' },
    { label: 'Married', value: 'Married' },
  ])

  const bottomSheetModalRef = useRef<BottomSheetModal>(null)

  // variables
  const snapPoints = useMemo(() => ['25%'], [])

  const userUpdateMutation = useMutation(updateProfile, {
    onSuccess: async (response) => {
      if (response.status) {
        await AsyncStorage.setItem('authUser', JSON.stringify(response?.data?.user || {}))
        dispatch(setUserData(response?.data?.user))
        toast.show('Update profile successfully', { type: 'success' })
        navigation.navigate(DashboardRoutes.MyProfile)
      } else {
        setSubmitting(false)
        commonToast({ toast: toast, message: 'Could not update profile', type: 'danger' })
      }
    },

    onError: (error) => {
      setSubmitting(false)
      commonToast({ toast: toast, message: 'Could not update profile', type: 'danger' })
    },
  })

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present()
  }, [])

  const renderBackdrop = useCallback(
    (props: JSX.IntrinsicAttributes & BottomSheetDefaultBackdropProps) => (
      <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} />
    ),
    []
  )

  //hide tabbar
  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: 'none',
      },
    })
    return () =>
      navigation.getParent()?.setOptions({
        tabBarStyle: {
          height: 80,
          paddingBottom: 20,
        },
      })
  }, [navigation])

  //check media library
  const [MediaLibraryStatus, requestMediaLibrary] = ImagePicker.useMediaLibraryPermissions()

  //check Image Library
  const [CameraStatus, requestCameraAccess] = ImagePicker.useCameraPermissions()

  //image picker from image library
  const pickImage = async () => {
    //check if access is provided
    try {
      if (!MediaLibraryStatus?.granted) {
        const permissionResult = await requestMediaLibrary()
        const isPremissionDenied = permissionResult.granted === false

        if (isPremissionDenied && !permissionResult.canAskAgain) {
          commonToast({
            toast,
            message: 'Allow permission in settings to access photos',
            type: 'warning',
          })
          return
        }

        if (isPremissionDenied) return
      }

      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      })

      if (!result.canceled) {
        // setImage(result.assets[0].uri)
        onChange('userPhoto', result.assets[0].uri)
      }
    } catch (error) {
      console.log(error)
    } finally {
      bottomSheetModalRef.current?.close()
    }
  }

  //camera handling
  const openCamera = async () => {
    // Ask the user for the permission to access the camera
    try {
      if (!CameraStatus?.granted || CameraStatus?.canAskAgain) {
        const permissionResult = await requestCameraAccess()
        const isPremissionDenied = permissionResult.granted === false

        if (isPremissionDenied && !permissionResult.canAskAgain) {
          commonToast({
            toast,
            message: 'Allow permission in settings to access camera',
            type: 'warning',
          })
          return
        }

        if (isPremissionDenied) {
          return
        }
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      })

      if (!result.canceled) {
        onChange('userPhoto', result.assets[0].uri)
        // setImage(result.assets[0].uri)
      }
    } catch (error) {
      console.log(error)
    } finally {
      bottomSheetModalRef.current?.close()
    }
  }

  return (
    <BottomSheetModalProvider>
      <ScrollView
        style={{ backgroundColor: colors.secondBackground }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <Wrapper label={'Full Name:'} required={false}>
            <TextInputEl
              value={values?.userName?.value}
              onChangeText={(value) => onChange('userName', value)}
              placeholder={'Enter Full Name'}
              viewStyles={styles.commonLabelMargin}
              error={errors.userName}
              readOnly={isSubmitting}
            />
          </Wrapper>

          <Wrapper label={'Username'} required={false} style={{ marginTop: 15 }}>
            <TextInputEl
              placeholder={'Enter User Name'}
              value={values?.userUserName?.value}
              viewStyles={styles.commonLabelMargin}
              readOnly
            />
          </Wrapper>

          <Wrapper label={'Profile Photo'} required={false} style={{ marginTop: 15 }}>
            <ImagePickerComponent
              handleClick={handlePresentModalPress}
              image={values?.userPhoto?.value}
              setImage={(value) => {
                onChange('userPhoto', value)
              }}
            />
          </Wrapper>

          <Wrapper label={'Date of Birth'} required={false} style={{ marginTop: 15 }}>
            <DatePickerNative
              value={values?.userDOB?.value}
              onChange={(value) => onChange('userDOB', value)}
              mode={'date'}
              style={{ ...styles.commonLabelMargin, marginTop: 6 }}
              readOnly={isSubmitting}
            />
          </Wrapper>

          <Wrapper label={'Gender'} style={{ zIndex: 2000, marginTop: 15 }} required={false}>
            <Dropdown
              open={dropdownOpen === 'genderStatus'}
              setOpen={(data: any) => {
                if (data) setDropDownOpen('genderStatus')
                else setDropDownOpen('')
              }}
              items={items}
              placeholder="Select Gender"
              setValue={(value) => onChange('userGender', value())}
              value={values?.userGender?.value}
              dropdownStyles={{ height: 100 }}
              disabled={isSubmitting}
              styles={{ ...styles.dropdownStyles, backgroundColor: colors.lighterBackground }}
            />
          </Wrapper>

          <Wrapper label={'Primary Phone'} required={false}>
            <TextInputEl
              placeholder={'Enter Primary Phone'}
              keyboardType={'numeric'}
              value={values?.phone?.value || ''}
              onChangeText={(value) => onChange('phone', value)}
              viewStyles={styles.commonLabelMargin}
              error={errors.phone}
              readOnly={isSubmitting}
            />
          </Wrapper>

          <Wrapper label={'Secondary Phone'} required={false} style={{ marginTop: 15 }}>
            <TextInputEl
              placeholder={'Enter Secondary Phone'}
              keyboardType={'numeric'}
              value={values?.userSecondaryPhone?.value || ''}
              onChangeText={(value) => onChange('userSecondaryPhone', value)}
              viewStyles={styles.commonLabelMargin}
              error={errors.userSecondaryPhone}
              readOnly={isSubmitting}
            />
          </Wrapper>

          <Wrapper label={'Joined Date'} required={false} style={{ marginTop: 15 }}>
            <DatePickerNative
              mode={'date'}
              value={values?.userJoinDate?.value}
              readOnly={true}
              style={{ ...styles.commonLabelMargin, marginTop: 6 }}
            />
          </Wrapper>
          <Wrapper label={'Marital Status'} style={{ marginTop: 15 }} required={false}>
            <Dropdown
              open={dropdownOpen === 'maritalStatus'}
              setOpen={(data: any) => {
                if (data) setDropDownOpen('maritalStatus')
                else setDropDownOpen('')
              }}
              items={maritalStatus}
              placeholder="Select Marital Status"
              setValue={(value) => onChange('userMaritalStaus', value())}
              value={values?.userMaritalStaus?.value}
              styles={{ ...styles.dropdownStyles, backgroundColor: colors.lighterBackground }}
              dropdownStyles={{ height: 100 }}
              disabled={isSubmitting}
            />
          </Wrapper>
        </View>

        <View style={styles.btnContainer}>
          <ButtonEl
            styles={styles.btnStyle}
            title={'UPDATE'}
            onPress={handleSubmit}
            btnTextColor={'#FFFFFF'}
            disabled={isSubmitting}
          />
        </View>
        <View style={{ height: 30 }}></View>

        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
          backdropComponent={renderBackdrop}
          backgroundStyle={{ backgroundColor: colors.card }}
        >
          <View style={[styles.contentContainer]}>
            <Pressable
              onPress={pickImage}
              style={({ pressed }) => [
                styles.iconContainer,
                pressed && {
                  backgroundColor: Colors.pressEffect,
                },
              ]}
            >
              <MaterialIcons name="insert-photo" size={26} color="#05A9C5" />
              <MyText fontStyle="bold" style={{ fontSize: 15 }}>
                Choose a Photo
              </MyText>
            </Pressable>

            <Pressable
              onPress={openCamera}
              style={({ pressed }) => [
                styles.iconContainer,
                pressed && {
                  backgroundColor: Colors.pressEffect,
                },
              ]}
            >
              <Ionicons name="camera" size={26} color="#05A9C5" />
              <MyText fontStyle="bold" style={{ fontSize: 15 }}>
                Take a Photo
              </MyText>
            </Pressable>
          </View>
        </BottomSheetModal>
      </ScrollView>
    </BottomSheetModalProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: 20,
  },
  btnContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 10,
    marginTop: 5,
    marginRight: 10,
    marginBottom: 5,
    zIndex: -1,
  },
  btnStyle: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 10,
  },
  iconContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    columnGap: 15,
    alignItems: 'center',
    paddingLeft: 10,
    borderRadius: 10,
  },
  dropdownStyles: {
    borderColor: borderColor,
    marginTop: 6,
    marginBottom: 15,
  },
  commonLabelMargin: {
    marginTop: 6,
    marginBottom: 0,
  },
})

export default ProfileDetail
