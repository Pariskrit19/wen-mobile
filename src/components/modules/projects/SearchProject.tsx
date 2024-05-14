import TextInputEl from 'components/elements/form/TextInput'
import React from 'react'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { Pressable, StyleSheet, View } from 'react-native'
import Icon from 'components/elements/Icon'
import { useTheme } from '@react-navigation/native'

type Props = {
  value: string | undefined
  handleRemoveSearch: () => void
  handleSearch: (text: string) => void
}

const SearchProject = ({ value, handleRemoveSearch, handleSearch }: Props) => {
  const { colors } = useTheme()
  return (
    <View style={styles.row}>
      <TextInputEl
        value={value}
        placeholder="Search a Project..."
        onChangeText={handleSearch}
        viewStyles={{ ...styles.viewStyles }}
        iconToRight={true}
        styles={{ fontSize: 15 }}
        placeholderTextColor={colors.descriptionFont}
        rightIcon={
          <Pressable
            onPress={() => {
              value && handleRemoveSearch()
            }}
          >
            <Icon
              name={value ? 'close' : 'search'}
              isFill={!!value}
              fill={colors.semiIconColor}
              width={20}
              height={20}
              color="black"
              isStroke
              stroke={colors.semiIconColor}
            />
          </Pressable>
        }
      />
    </View>
  )
}

export default SearchProject

const styles = StyleSheet.create({
  row: {
    // paddingHorizontal: 12,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginHorizontal: 3,
  },
  viewStyles: {
    borderRadius: 5,
    width: '100%',
    height: 48,
    paddingLeft: 20,
  },
})
