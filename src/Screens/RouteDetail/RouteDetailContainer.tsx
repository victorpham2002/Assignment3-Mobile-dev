import { View, Text } from 'react-native'
import React from 'react'
import RouteDetail from './RouteDetail'
import { SafeAreaView } from 'react-native-safe-area-context';

const RouteDetailContainer = ({route}: any) => {
  const {
    routing,
  } = route.params;
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <RouteDetail routing={routing}/>

    </SafeAreaView>
  )
}

export default RouteDetailContainer