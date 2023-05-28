
import { View, Text, StyleSheet, Platform, TextInput, TouchableOpacity, Button } from 'react-native'
import React, {useEffect, useState} from 'react'
import MuiIcons from "@expo/vector-icons/MaterialIcons";
import { FlatList } from 'native-base';
import { SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootScreens } from '..';
import { GooglePlaceDetail, GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';


const GOOGLE_API_KEY = 'AIzaSyAa1uEwsBYBCcsYC6ufJIV4EaJ8wH_cxPg';
type Position = {
  place_id: string | undefined,
}


const RouteSearchResult = (props: any) => {
  const {
    useFindRoute,
  } = props;

  const navigation = useNavigation();
  const [fromDetails, setFromDetails] = useState<any>(null);
  const [toDetails, setToDetails] = useState<any>(null);
  const [fromPositon, setFromPositon] = useState<Position | null>(null);
  const [toPositon, setToPositon] = useState<Position | null>(null);
  const [routes, setRoutes] = useState<any>([]);

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainner}> 
          <View>
            <View style={styles.inputTextContainer}
            
            >
                <Text style={{color: '#1570EF', fontWeight: 'bold'}}>From</Text>
                <MuiIcons
                name="location-on"
                color="#1570EF"
                size={24}
                />

                 <GooglePlacesAutocomplete
                  placeholder='Nhập vị trí của bạn'
                  onPress={(data, details = null) => {
                    // 'details' is provided when fetchDetails = true
                    setFromDetails(details);
                    // setFromPositon({lat: details?.geometry.location.lat, lng: details?.geometry.location.lng})
                    setFromPositon({place_id: details?.place_id})
                  }}
                  query={{
                    key: GOOGLE_API_KEY,
                    language: 'vi',
                  }}
                  styles={{}}
                  />
            </View>

            <View style={styles.inputTextContainer}>
                <Text style={{color: '#1570EF', fontWeight: 'bold'}}>     To</Text>
                <MuiIcons
                name="location-on"
                color="#1570EF"
                size={24}
                />

                <GooglePlacesAutocomplete
                  placeholder='Nhập điểm đến'
                  onPress={(data, details = null) => {
                    // 'details' is provided when fetchDetails = true
                    setToDetails(details);
                    // setToPositon({lat: details?.geometry.location.lat, lng: details?.geometry.location.lng})
                    setToPositon({place_id: details?.place_id})

                  }}
                  query={{
                    key: GOOGLE_API_KEY,
                    language: 'vi',
                  }}
                  styles={{}}
                  />
            </View>

            {/* <TouchableOpacity 
            style={styles.swapIcon}
            activeOpacity={0.7}
            onPress={() => {
              const temp = fromDetails;
              setFromInputText(toDetails);
              setToInputText(temp);
            }}
            >
              <MuiIcons 
              name="swap-vert"
              color="#fff"
              size={24}
              />
            </TouchableOpacity> */}
          </View>
          
          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 20}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <MuiIcons 
              name={'arrow-forward-ios'}
              color={'#CDE2FF'}
              size={15}
              />
              <Text
              style={{color: '#CDE2FF', fontSize: 17}}
              >
                Optional Route: None
              </Text>
            </View>

            <TouchableOpacity
            style={{
              backgroundColor: '#CDE2FF',
              paddingHorizontal: 30,
              paddingVertical: 8,
              borderRadius: 10
            }}
            activeOpacity={0.5}
            onPress={async () => {
              console.log(fromPositon?.place_id, ' _____ ' , toPositon?.place_id);
              const url = `https://maps.googleapis.com/maps/api/directions/json?origin=place_id:${fromPositon?.place_id}&destination=place_id:${toPositon?.place_id}&mode=transit&transit_mode=bus&language=vi&key=${GOOGLE_API_KEY}`;
              const res = await fetch(url)
              const data = await res.json();
              console.log(data);
              setRoutes(data.routes);
            }}
            >
              <Text
              style={{
                color: '#1570EF',
                fontWeight: 'bold',
                fontSize: 15
              }}
              >
                Find
              </Text>
            </TouchableOpacity>
          </View>
    
          
              
      </View>
      <SafeAreaView style={styles.searchResultContainner}>
        <FlatList
        data={routes as any[]}
        renderItem={route => {
          const item = route.item;
          return (
            <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate(...[RootScreens.ROUTE_DETAIL, {routing: item.legs[0].steps}] as never)}
            >
              <Text style={styles.itemTitle}>{
                (item.legs[0].steps as any[]).find((step) => step.travel_mode == "TRANSIT") 
                ? 
                `Bus ${(item.legs[0].steps as any[]).find((step) => step.travel_mode == "TRANSIT").transit_details.line.short_name}`
                :
                `Đi bộ`
              }</Text>
              <Text style={styles.itemDescription}>{
                (item.legs[0].steps as any[]).find((step) => step.travel_mode == "TRANSIT") ? 
                
                (item.legs[0].steps as any[]).find((step) => step.travel_mode == "TRANSIT").transit_details.line.name
                : 
                ""
              }</Text>
              <View style={{flexDirection: 'row'}}>
                <View style={{marginRight: 20}}>
                  <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
                    <MuiIcons
                    name={'directions-walk'}
                    color={'#0056CF'}
                    size={24}
                    />
                    <Text style={{color: '#0056CF', fontSize: 16, marginLeft: 5}}>
                      { 
                        Math.round((item.legs as any[]).reduce((total, leg) => {
                          console.log('in walk')
                          return total + (leg.steps as any[]).reduce((total, step) => {
                            if(step.travel_mode == "WALKING"){
                              return total + step.distance.value;
                            }
                            return 0;
                          }, 0)
                        }, 0)) 
                      }
                      {
                        ` m`
                      }
                    </Text>
                  </View>

                  <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
                    <MuiIcons
                    name={'timer'}
                    color={'#0056CF'}
                    size={24}
                    />
                    <Text style={{color: '#0056CF', fontSize: 16, marginLeft: 5}}>
                      {
                        Math.round((item.legs as any[]).reduce((total, leg) => {
                          return total + leg.duration.value;
                        }, 0) / 60)
                      }
                      {` phút`}
                    </Text>
                  </View>
                </View>

                <View style={{marginRight: 20}}>
                  <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
                    <MuiIcons
                    name={'directions-bus'}
                    color={'#0056CF'}
                    size={24}
                    />
                    <Text style={{color: '#0056CF', fontSize: 16, marginLeft: 5}}>
                      {
                        Math.round((item.legs as any[]).reduce((total, leg) => {
                          return total + leg.distance.value;
                        }, 0) / 1000 * 10) / 10
                        
                      }
                      {` km`} 
                    </Text>
                  </View>

                  <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
                    <MuiIcons
                    name={'money'}
                    color={'#0056CF'}
                    size={24}
                    />
                    <Text style={{color: '#0056CF', fontSize: 16, marginLeft: 5}}>
                      {
                        item.fare ?
                        `${item.fare.value} VND`
                        :
                        `0 VND`
                      
                      }
                    </Text>
                  </View>
                </View>
              </View>

            </TouchableOpacity>
          )
        }}
        />       
      </SafeAreaView>
              
    </View>
  )
}

export default RouteSearchResult;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    flexDirection: 'column',
  },
  searchBarContainner: {
    width: '100%',
    backgroundColor: '#1570EF',
    flexDirection: 'column',
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    position: "relative",
    zIndex: 2
  },
  searchResultContainner: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  inputText: {
    fontSize: 14,
    paddingVertical: 10,
    flex: 1,
    color: '#C6C6C6',
  },
  inputTextContainer: {
    flexDirection: 'row',
    backgroundColor: "#fff",
    borderRadius: 15,
    alignItems: 'center',
    position: "relative",
    paddingHorizontal: 10,
    marginBottom: 5,
    zIndex: 2,
  },
  iosShadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 40 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
  },

  androidShadow: {
    elevation: 4,
  },
  swapIcon: {
    width: 30, 
    height: 30, 
    backgroundColor: '#1570EF', 
    justifyContent: 'center', 
    alignItems: 'center', 
    elevation: 3, 
    zIndex: 3, 
    position: 'absolute', 
    right: 0, 
    top: 22
  },
  item: {
    backgroundColor: '#ffffff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderColor: '#f0f0f0',
    borderWidth: 1,
    borderRadius: 20,
    
  },
  itemTitle: {
    color: '#0056CF',
    fontSize: 16,
    fontWeight: 'bold'
  },
  itemDescription: {
    color: '#0056CF',
    fontSize: 16,
},
})