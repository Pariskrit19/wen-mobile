import MyText from 'components/elements/MyText'
import * as React from 'react'
import { View } from 'react-native'

interface IHomeProps {}

const Home: React.FunctionComponent<IHomeProps> = (props) => {
  return (
    <View>
      <MyText>This is homepage</MyText>
    </View>
  )
}

export default Home
