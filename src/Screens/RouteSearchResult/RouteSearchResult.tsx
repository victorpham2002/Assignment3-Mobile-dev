import { View, Text, StyleSheet, Platform, TextInput, TouchableOpacity, Button } from 'react-native'
import React, {useState} from 'react'
import MuiIcons from "@expo/vector-icons/MaterialIcons";
import { FlatList } from 'native-base';
import { SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootScreens } from '..';

const RouteSearchResult = (props: any) => {
  const {
    useFindRoute,
  } = props;
  const navigation = useNavigation();
  const [fromInput, setFromInput] = useState('');
  const [toInput, setToInput] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainner}> 
          <View>
            <View style={styles.inputTextContainer}>
                <Text style={{color: '#1570EF', fontWeight: 'bold'}}>From</Text>
                <MuiIcons
                name="location-on"
                color="#1570EF"
                size={24}
                />

                <TextInput
                value={fromInput}
                onChangeText={text => setFromInput(text)}
                placeholderTextColor="#1570EF"
                placeholder="[Vị trí của bạn]"
                style={styles.inputText}
                />
            </View>

            <View style={styles.inputTextContainer}>
                <Text style={{color: '#1570EF', fontWeight: 'bold'}}>     To</Text>
                <MuiIcons
                name="location-on"
                color="#1570EF"
                size={24}
                />

                <TextInput
                value={toInput}
                onChangeText={text => setToInput(text)}
                placeholderTextColor="#C6C6C6"
                placeholder="Nhập điểm đến"
                style={styles.inputText}
                />
            </View>

            <TouchableOpacity 
            style={styles.swapIcon}
            activeOpacity={0.7}
            onPress={() => {
              const temp = fromInput;
              setFromInput(toInput);
              setToInput(temp);
            }}
            >
              <MuiIcons 
              name="swap-vert"
              color="#fff"
              size={24}
              />
            </TouchableOpacity>
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
            onPress={() => useFindRoute(fromInput, toInput)}
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
        data={[1,1,1,1,1,1,1,1,1,1,1]}
        renderItem={item => {
          return (
            <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate(RootScreens.ROUTE_DETAIL as never)}
            >
              <Text style={styles.itemTitle}>Bus 33</Text>
              <Text style={styles.itemDescription}>Đón xe tại trạm: Bến xe An Sương</Text>
              <View style={{flexDirection: 'row'}}>
                <View style={{marginRight: 20}}>
                  <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
                    <MuiIcons
                    name={'directions-walk'}
                    color={'#0056CF'}
                    size={24}
                    />
                    <Text style={{color: '#0056CF', fontSize: 16, marginLeft: 5}}>
                      365 mét
                    </Text>
                  </View>

                  <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
                    <MuiIcons
                    name={'timer'}
                    color={'#0056CF'}
                    size={24}
                    />
                    <Text style={{color: '#0056CF', fontSize: 16, marginLeft: 5}}>
                      78 phút
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
                      13.8 km
                    </Text>
                  </View>

                  <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
                    <MuiIcons
                    name={'money'}
                    color={'#0056CF'}
                    size={24}
                    />
                    <Text style={{color: '#0056CF', fontSize: 16, marginLeft: 5}}>
                      23.000 VND
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
    paddingVertical: 3,
    flex: 1,
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