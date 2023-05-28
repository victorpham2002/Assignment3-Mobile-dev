import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList } from 'react-native'
import React from 'react'
import MuiIcons from "@expo/vector-icons/MaterialIcons";
import { useNavigation } from '@react-navigation/native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { RootScreens } from '..';

const RouteSearch = (props: any) => {
  const navigation = useNavigation();
  const {

  } = props;
  return (
    <View style={styles.container}> 
      <View style={{flexDirection: 'row', padding: 10, alignItems: 'center', marginBottom: 10}}>
        <TouchableOpacity>
          <MuiIcons
          name={'arrow-back'}
          color={'#1570EF'}
          size={24}
          onPress={() => navigation.goBack()}
          />
        </TouchableOpacity>
        
        {/* <TextInput
        // value={fromInput}
        // onChangeText={text => setFromInput(text)}
        placeholderTextColor="#C6C6C6"
        placeholder="Nhập vị trí của bạn"
        style={{flex: 1, backgroundColor: '#fff', fontSize: 16, paddingVertical: 3, paddingLeft: 10, marginLeft: 10, borderRadius: 10}}
        /> */}
        <GooglePlacesAutocomplete
        placeholder='Nhập vị trí của bạn'
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true

          navigation.navigate({
            name: RootScreens.ROUTE_SEARCH_RESULT,
            params: { fromDetails: details },
            merge: true,
          } as never);
        }}
        query={{
          key: 'AIzaSyAa1uEwsBYBCcsYC6ufJIV4EaJ8wH_cxPg',
          language: 'vi',
        }}
        styles={{}}
        />
        
        
      </View>
      
      <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, width: '100%'}}>
          <TouchableOpacity style={{backgroundColor: '#fff', borderRadius: 50, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 5}}> 
            <MuiIcons
            name={'house'}
            color={'#1570EF'}
            size={24}
            />

            <Text 
            style={{
              fontSize: 16,
              color: '#1570EF',
              paddingLeft: 5
            }}
            >Nhà riêng</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{backgroundColor: '#fff', borderRadius: 50, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 5}}> 
            <MuiIcons
            name={'business'}
            color={'#1570EF'}
            size={24}
            />

            <Text 
            style={{
              fontSize: 16,
              color: '#1570EF',
              paddingLeft: 5
            }}
            >Công ty</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{backgroundColor: '#fff', borderRadius: 50, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 5}}> 
            <MuiIcons
            name={'school'}
            color={'#1570EF'}
            size={24}
            />

            <Text 
            style={{
              fontSize: 16,
              color: '#1570EF',
              paddingLeft: 5
            }}
            >Trường học</Text>
          </TouchableOpacity>
          
      </View> 
      
      

      <View style={{width: '100%'}}>
        <View style={{backgroundColor: '#FFF', borderRadius: 10, width: '100%', marginTop: 15, paddingVertical: 10}}>
          <TouchableOpacity style={{flexDirection: 'row', borderBottomWidth: 0.2, paddingHorizontal: 10, paddingBottom: 10, borderBottomColor: '#1570EF', alignItems: 'center'}}>
            <MuiIcons
            name={'my-location'}
            color={'#1570EF'}
            size={24}
            />
            <Text
            style={{
              color: '#1570EF',
              fontSize: 20,
              paddingLeft: 10
            }}
            >
              Vị trí của bạn
            </Text>
          </TouchableOpacity>    

          <TouchableOpacity style={{flexDirection: 'row', paddingHorizontal: 10, alignItems: 'center', paddingTop: 10, borderTopWidth: 0.2, borderTopColor: '#1570EF'}}>
            <MuiIcons
            name={'pin-drop'}
            color={'#1570EF'}
            size={24}
            />
            <Text
            style={{
              color: '#1570EF',
              fontSize: 20,
              paddingLeft: 10
            }}
            >
              Chọn trên bản đồ
            </Text>
          </TouchableOpacity>  
        </View>   

        <View style={{backgroundColor: '#fff', borderRadius: 10, width: '100%', marginTop: 20}}>
          <View style={{backgroundColor: '#1570EF', borderTopLeftRadius: 10, borderTopRightRadius: 10, paddingVertical: 10, paddingHorizontal: 10}}>
            <Text
            style={{
              color: '#fff',
              fontSize: 16,
            }}
            >Lịch sử</Text>            
          </View>

          <FlatList
          data={[
            {
              content: 'Ký túc xá khu A - Đại học quốc gia thành phố Hồ Chí Minh'
            },
            {
              content: 'Bách Khoa'
            },
            {
              content: 'Trường Đại học Khoa học Tự Nhiên'
            },

            
          ]}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
              style={{
                flexDirection: 'row',
                width: '100%',
                padding: 10,
                alignItems: 'center',
                borderTopWidth: 0.2,
                borderColor: '#1570EF',
                borderBottomWidth: 0.2,
              }}
              >
                <MuiIcons
                name={'location-pin'}
                color={'#1570EF'}
                size={24}
                />
                
                <Text
                style={{
                  color: '#1570EF',
                  fontSize: 16,
                  marginLeft: 10,
                }}
                >
                  {`${item.content}`}
                </Text>
              </TouchableOpacity>
            )
          }}
          />

          <View style={{borderBottomLeftRadius: 10, borderBottomRightRadius: 10, justifyContent: 'flex-end', flexDirection: 'row', paddingVertical: 10, paddingHorizontal: 10}}>
              <Text
              style={{
                color: '#1570EF',
                fontSize: 16,
                
              }}
              >
                Xem tất cả lịch sử
              </Text>
          </View>
        </View>

      </View>
      
    </View>
  )
}

export default RouteSearch;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#CDE2FF',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingTop: 15
    }
})