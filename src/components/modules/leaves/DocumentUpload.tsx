import { AntDesign, FontAwesome } from '@expo/vector-icons'
import { useTheme } from '@react-navigation/native'
import ButtonEl from 'components/elements/Button'
import MyText from 'components/elements/MyText'
import { FONT_CONST } from 'helpers/constants'
import React from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import * as WebBrowser from 'expo-web-browser'
type Props = {
  handleDocumentUpload: () => {}
  files?: any
  onRemove: () => void
  isSubmitting: boolean
}

const DocumentUpload = ({ handleDocumentUpload, files, onRemove, isSubmitting }: Props) => {
  const { colors } = useTheme()
  return (
    <>
      <MyText
        style={{ ...styles.labels, color: colors.subHeaderFont }}
        fontStyle={FONT_CONST.rubikMedium}
        hasCustomColor
      >
        Leave Document
      </MyText>
      {(typeof files !== 'string' || !files?.length) && (
        <Pressable
          disabled={isSubmitting}
          style={[
            styles.fileContainer,
            { backgroundColor: colors.dropdownBackground, borderColor: colors.cardBorder },
          ]}
          onPress={handleDocumentUpload}
        >
          <FontAwesome name="image" size={44} color="#05A9C5" />
          <MyText
            hasCustomColor={true}
            style={{ color: colors.text, fontWeight: '600', marginTop: 5 }}
          >
            Upload Document
          </MyText>
        </Pressable>
      )}
      {(files?._data?.blobId || (typeof files === 'string' && files?.length > 0)) && (
        <View style={styles.imageContainer}>
          {typeof files === 'string' ? (
            <ButtonEl
              title="View File"
              btnWidth={'60%'}
              btnHeight={45}
              btnTextColor="white"
              onPress={async () => await WebBrowser.openBrowserAsync(files)}
            />
          ) : (
            <MyText style={{ flex: 9 }}>{files?._data?.name}</MyText>
          )}
          <Pressable onPress={onRemove} style={{ flex: 1 }} disabled={isSubmitting}>
            <AntDesign name="delete" size={24} color="red" />
          </Pressable>
        </View>
      )}
    </>
  )
}

export default DocumentUpload

const styles = StyleSheet.create({
  fileContainer: {
    flex: 1,
    backgroundColor: '#D9D9D9',
    alignItems: 'center',
    justifyContent: 'center',
    height: 120,
    borderRadius: 8,
    borderWidth: 1,
  },
  imageContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    columnGap: 15,
    alignItems: 'center',
    marginTop: 15,
    width: '98%',
  },
  labels: {
    fontSize: 14,
    marginTop: 18,
    letterSpacing: 0.2,
    marginBottom: 14,
  },
})
