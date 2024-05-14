import * as React from 'react'
import { Animated, StyleSheet, Text, View } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
// import { HelperText } from 'react-native-paper'
import {
  backgroundColor,
  borderColor,
  errorColor,
  primaryColor,
  secondaryColor,
  textColor,
} from 'styles/colors'
import { dropdownItems } from 'ts/types'
import { isEmpty } from 'utils'
import MyText from './MyText'
import { MaterialIcons } from '@expo/vector-icons'
import Icon from './Icon'
import { useTheme } from '@react-navigation/native'
import { FONT_CONST } from 'helpers/constants'

// import InputEl from './InputEl'
// import MyText from '../MyText'

interface IDropdownProps {
  value: any
  items?: Array<dropdownItems>
  setValue?: Function
  setItems?: Function
  error?: string
  styles?: Object
  mainStyles?: Object
  mutiple?: boolean
  prefixIcon?: React.ReactElement | null
  placeholder?: string
  searchable?: boolean
  zIndex?: number
  isRequired?: boolean
  zIndexInverse?: number
  name?: string
  isLoading?: boolean
  listMode?: 'SCROLLVIEW' | 'FLATLIST' | 'MODAL'
  scroll?: boolean
  adjustScrollMargin?: boolean
  index?: number
  onOpen?: Function
  onClose?: Function
  closeIcon?: JSX.Element
  openIcon?: JSX.Element
  handleOutsideMargin?: () => void
  label?: string
  isMarginOutside?: boolean
  styleLabel?: Object
  isProject?: boolean
  open: boolean
  setOpen?: Function
  dropdownStyles?: Object
  disabled?: boolean
  showErrorMessage?: boolean
}

const defaultProps = {
  items: [],
  setValue: () => {},
  setItems: () => {},
  error: '',
  styles: {},
  mainStyles: {},
  multiple: false,
  prefixIcon: null,
  placeholder: '',
  searchable: false,
  zIndex: 100,
  isRequired: false,
  zIndexInverse: 100,
  name: '',
  isLoading: false,
  listMode: 'SCROLLVIEW' as 'SCROLLVIEW' | 'FLATLIST' | 'MODAL',
  scroll: false,
  adjustScrollMargin: false,
  index: 1,
  onOpen: () => {},
  onClose: () => {},
  handleOutsideMargin: () => {},
  isMarginOutside: false,
  styleLabel: {},
  isProject: false,
  open: false,
  setOpen: () => {},
  dropdownStyles: {},
  disabled: false,
  showErrorMessage: true,
}
const Dropdown: React.FunctionComponent<IDropdownProps> = (props) => {
  const {
    value,
    items,
    setItems,
    setValue,
    error,
    styles,
    mutiple,
    prefixIcon,
    placeholder,
    searchable,
    zIndex,
    isRequired,
    zIndexInverse,
    isLoading,
    name,
    listMode,
    scroll,
    adjustScrollMargin,
    index,
    onOpen,
    onClose,
    closeIcon,
    openIcon,
    label,
    isProject,
    open,
    setOpen,
    handleOutsideMargin,
    isMarginOutside,
    styleLabel,
    mainStyles,
    dropdownStyles,
    disabled,
    showErrorMessage,
  } = props

  // const [open, setOpen] = React.useState(open)
  const [isFocused, setIsFocused] = React.useState(false)
  const labelTranslateY = React.useRef(new Animated.Value(0)).current
  const labelTranslateX = React.useRef(new Animated.Value(0)).current
  const { colors } = useTheme()

  const onOpenList = () => {
    Animated.timing(labelTranslateY, {
      toValue: -25,
      duration: 100,
      useNativeDriver: true,
    }).start()
    Animated.timing(labelTranslateX, {
      toValue: 10,
      duration: 100,
      useNativeDriver: true,
    }).start()
    setIsFocused((prev) => !prev)
    onOpen && onOpen()
  }
  const onCloseList = () => {
    if (isEmpty(value)) {
      Animated.timing(labelTranslateY, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }).start()
      Animated.timing(labelTranslateX, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }).start()
    }
    setIsFocused((prev) => !prev)
    onClose && onClose()
  }
  return (
    <>
      <View
        style={{
          ...styles,
          zIndex: open
            ? ((zIndex ?? 1) * (index ?? 1) ?? 1) * 10000
            : adjustScrollMargin
            ? 100 * (zIndex ?? 1)
            : zIndex,
          marginTop: adjustScrollMargin ? -150 : 6,
          position: 'relative',
        }}
      >
        {label && (
          <MyText
            style={{ ...cssStyles.label, color: colors.subHeaderFont }}
            hasCustomColor
            fontStyle={FONT_CONST.rubikMedium}
          >
            {label}
          </MyText>
        )}
        <DropDownPicker
          open={open}
          value={value}
          items={items ?? []}
          loading={isLoading}
          setOpen={(data) => {
            // setOpen((prev) => !prev)
            setOpen && setOpen(data)
            handleOutsideMargin && handleOutsideMargin()
          }}
          setValue={setValue}
          style={{
            borderColor: Boolean(error) ? errorColor : colors.cardBorder,
            borderRadius: 8,
            borderWidth: isProject ? 0 : 1,
            borderStyle: 'solid',
            zIndex: open ? (zIndex ?? 1) * 100 : zIndex,
            paddingHorizontal: 10,
            backgroundColor:
              Boolean(error) && !isFocused
                ? 'rgba(240, 128, 128,0.2)'
                : isProject
                ? colors.dropdownboxColor
                : colors.dropdownBackground,

            ...mainStyles,
          }}
          multiple={mutiple}
          placeholder={placeholder}
          placeholderStyle={{
            color: colors.placeholderTextColor,
            fontSize: 13,
          }}
          searchable={searchable}
          listMode={listMode}
          onOpen={onOpenList}
          onClose={onCloseList}
          disableBorderRadius={false}
          disabled={disabled}
          maxHeight={200}
          mode="BADGE"
          ArrowDownIconComponent={() =>
            closeIcon || (
              <Icon name="KeyboardDownArrow" width={24} isStroke stroke={colors.iconColor} />
            )
          }
          ArrowUpIconComponent={() =>
            openIcon || (
              <Icon
                name="KeyboardDownArrow"
                width={24}
                isStroke
                stroke={colors.iconColor}
                containerStyles={{
                  transform: 'rotate(180deg)',
                }}
              />
            )
          }
          zIndex={zIndex}
          zIndexInverse={zIndexInverse}
          dropDownDirection="BOTTOM"
          dropDownContainerStyle={
            isMarginOutside
              ? {
                  position: 'relative',
                  top: 0,
                  backgroundColor: colors.lighterBackground,
                  borderColor: colors.text,
                  height: 160,
                  ...dropdownStyles,
                }
              : {
                  // zIndex: (zIndex ?? 0) * 10000,
                  backgroundColor: colors.lighterBackground,
                  borderColor: colors.text,
                  height: 160,
                  ...dropdownStyles,
                }
          }
          listItemLabelStyle={{
            color: colors.text,
          }}
          listMessageTextStyle={{ color: colors.text }}
          containerStyle={scroll ? { height: 200, width: '100%' } : {}}
          labelStyle={{
            color: colors.text,
            ...styleLabel,
          }}
          disabledItemLabelStyle={{
            opacity: 0.5,
          }}
          tickIconStyle={{ tintColor: colors.headerFont }}
        />
      </View>
      {error && showErrorMessage && (
        <MyText style={cssStyles.errorText} hasCustomColor>
          {!open && error}
        </MyText>
      )}

      {/* <HelperText type="error" visible={Boolean(error)}>
        {error}
      </HelperText> */}
    </>
  )
}
Dropdown.defaultProps = defaultProps

const cssStyles = StyleSheet.create({
  required: {
    color: 'red',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 10,
    lineHeight: 20,
  },
  errorText: {
    color: secondaryColor,
    marginBottom: 4,
  },
})

export default Dropdown
