import React, { SetStateAction } from 'react'
import { Button, Image, View, StyleSheet, Pressable } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { FontAwesome } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'
import MyText from '../MyText'
import { useTheme } from '@react-navigation/native'

interface ElimagePicker {
  handleClick: any
  image: string | null
  setImage: React.Dispatch<SetStateAction<string | null>>
}

export default function ImagePickerComponent({ handleClick, image, setImage }: ElimagePicker) {
  const { colors } = useTheme()

  return (
    <View
      style={{
        flex: 1,
        marginTop: 10,
        marginBottom: 15,
      }}
    >
      <Pressable
        style={[styles.container, { backgroundColor: colors.filledColor }]}
        onPress={handleClick}
      >
        <FontAwesome name="image" size={44} color="#05A9C5" />
        <MyText
          hasCustomColor={true}
          style={{ color: colors.text, fontWeight: '600', marginTop: 5 }}
        >
          Upload a Picture
        </MyText>
      </Pressable>
      {image && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />

          <Pressable onPress={() => setImage(null)}>
            <AntDesign name="delete" size={24} color="red" />
          </Pressable>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D9D9D9',
    alignItems: 'center',
    justifyContent: 'center',
    height: 120,
    borderStyle: 'dashed',
    borderColor: '#D9D9D9',
    borderWidth: 1,
    borderRadius: 1,
  },
  imageContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 15,
  },
})
