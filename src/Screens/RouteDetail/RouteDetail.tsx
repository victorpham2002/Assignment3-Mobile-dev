import { View, Text } from 'react-native'
import React from 'react'
import { FlatList } from 'native-base'
import MuiIcons from "@expo/vector-icons/MaterialIcons";
import { background } from 'native-base/lib/typescript/theme/styled-system';
import { SafeAreaView } from 'react-native-safe-area-context';

const RouteDetail = (props: any) => {
  const {
    routing,
  } = props;
  return (
    <SafeAreaView style={{width: '80%', flexDirection: 'column', justifyContent: 'center', marginTop: 25, marginHorizontal: 60, backgroundColor: '#fff'}}>
      <FlatList
      data={routing}
      renderItem={(item: any) => {
        const step = item.item;

        return (
          <View style={{paddingHorizontal: 10}}>
            <View 
            style={{
              paddingLeft: 20,
              borderLeftWidth: 1,
              borderColor: '#0056CF',
              paddingBottom: 20
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
                backgroundColor: '#fff',
                padding: 0
              }}
              />
      
              
              <View style={{flexGrow: 1, flexDirection: 'row'}}>
                <Text
                style={{
                  color: '#0056CF',
                  fontSize: 16,
                  flex: 1, 
                  width: 1
                }}
                >
                  {step.html_instructions}
                </Text>
              </View>
              
            </View>
          </View>
          
        ) 
      }}
      />
    </SafeAreaView>
  )
}

export default RouteDetail