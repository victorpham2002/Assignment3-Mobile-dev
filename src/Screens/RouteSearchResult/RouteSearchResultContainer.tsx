import { View, Text } from 'react-native'
import React from 'react'
import RouteSearchResult from './RouteSearchResult'

const RouteSearchResultContainer = ({navigation}: any) => {
  const useFindRoute = (from: string, to: string) => {
    console.log(from, to);
  }

  return <RouteSearchResult useFindRoute={useFindRoute}/>
}

export default RouteSearchResultContainer