import { View, Text } from 'react-native'
import React from 'react'
import { FlatList } from 'native-base'
import MuiIcons from "@expo/vector-icons/MaterialIcons";
import { background } from 'native-base/lib/typescript/theme/styled-system';

const RouteDetail = () => {
  return (
    <View style={{width: '100%', flexDirection: 'row', justifyContent: 'center', marginTop: 25, marginHorizontal: 60}}>
      <FlatList
      data={[1,1,1]}
      renderItem={({item}) => {
        return (
          <View style={{paddingHorizontal: 10}}>
            <View 
            style={{
              paddingLeft: 20,
              borderLeftWidth: 1,
              borderColor: '#0056CF',
            }}
            >
            
              <MuiIcons
              name={'panorama-fish-eye'}
              color={'#0056CF'}
              size={24}
              style={{
                position: 'absolute',
                top: 0,
                left: -13,
                zIndex: 2,
                elevation: 2,
                backgroundColor: '#fff'
              }}
              />
      
              
              
              <Text
              style={{
                color: '#0056CF',
                fontSize: 16,
                lineHeight: 25
              }}
              >
                Đi đến trạm: {'\n'}
                Bến xe An sương {'\n'}
                Đi đến trạm: {'\n'}
                Bến xe An sương {'\n'}
              </Text>
            </View>
          </View>
          
        ) 
      }}
      />
    </View>
  )
}

export default RouteDetail