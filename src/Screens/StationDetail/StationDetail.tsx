import { i18n, LocalizationKey } from "@/Localization";
import React, { useEffect , useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { HStack, Spinner, Heading } from "native-base";
import { User } from "@/Services";
import Header from "@/Components/Header/Header";
import { Colors } from "@/Theme/Variables";
import MuiIcons from "@expo/vector-icons/MaterialIcons";
import { TextInput } from "react-native";
import MapView from 'react-native-maps';
import { RootScreens } from "..";

export interface ILoginProps {
  route: number;
  setOptions: (route: number) => void;
}

const StationData = {
    title: 'Tuyến số 08',
    description: {
      number: '32',
      name: 'Bến xe Miền Tây - Bến xe Ngã Tư Ga',
      time: '05:40 - 20:30',
      price: '7000',
      studentPrice: '3000',
      timePerTrip: '6 - 10 min',
      numberOfTrip: '86',
    },
    timeTable: ['1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '22:00'],
    goRoute: ['Bến xe An sương', 'Kí túc xá khu A', 'Trường Đại học Bách Khoa Thành Phố Hồ Chí Minh'],
    returnRoute : ['Bến xe An sương', 'Kí túc xá khu A', 'Kí túc xá khu A'],
  }

type RouteDetail = {
  RouteId: number;
  RouteNo: string;
  RouteName: string;
  Color: string;
  Type: string;
  Distance: number;
  Orgs: string;
  TimeOfTrip: string;
  Headway: string;
  OperationTime: string;
  NumOfSeats: string;
  OutBoundName: string;
  InBoundName: string;
  OutBoundDescription: [string];
  InBoundDescription: [string];
  TotalTrip: string;
  Tickets: [string];
};

  const StationGoRoute = ({item}: {item: string}) => (
    <View style={styles.routeContainer}>
      <Image
        source={require('../../../assets/Uncheck.png')}
        style={styles.CheckImg}
      />
      <Text style={styles.normalText}>{item}</Text>
    </View>
  );

  var time = new Date();

  const StationTimeRoute = ({item}: {item: string}) => (
    <View style={styles.routeContainer}>
      { item.split(":")[0] < '4' ? (
        <Image
          source={require('../../../assets/Check.png')}
          style={styles.CheckImg}
        />
      ) : (
        <Image
          source={require('../../../assets/Uncheck.png')}
          style={styles.CheckImg}
        />
      )}
      <Text style={styles.normalText}>{item}</Text>
    </View>
  );

  const StationTicket = ({item}: {item: string}) => (
    <Text style={styles.normalText}>
      {item}
    </Text>
  );

  export const StationDetail = (props: ILoginProps) => {
    const { route , setOptions } = props;

    const [routeStatus, setRouteStatus] = useState('Go');
    const [navBarStatus, setnavBarStatus] = useState('Time');

    const changeRouteStatus = () => {
        routeStatus === 'Go' ? setRouteStatus('Return') : setRouteStatus('Go');
    }
    
    const changeNavBarStatus = (navBarNewState: string) => {
        setnavBarStatus(navBarNewState);
    }

    const [data, setData] = useState<RouteDetail>();
    const getRoute = async () => {
      try {
        const response = await fetch(`http://192.168.1.5:3000/routes/${route}`);
        const json = await response.json();
        setData(json);
        setOptions(route);
      } catch (error) {
        console.error(error);
      } 
    };

    useEffect(() => {
      getRoute();
    }, []);


    return (
      <View style={styles.container}>
        <View style={styles.MapContainer}>
        <MapView
              style={styles.Img}
              initialRegion={{
                latitude: 10.88063531088379,
                longitude:  106.80765799339738,
                latitudeDelta: 0.0942,
                longitudeDelta: 0.042,
              }}
              zoomEnabled={true}
              zoomControlEnabled={true}

            />
        </View>

        <View style={styles.BasicInfoContainer}>
            <Text style={styles.normalText}>{data?.RouteName}</Text>         
            <TouchableOpacity
                style={styles.button}
                onPress={() => changeRouteStatus()}
                activeOpacity={0.5}>
                {routeStatus === 'Go' ? 
                <Text style={styles.buttonText}>Lượt đi</Text> : 
                <Text style={styles.buttonText}>Lượt về</Text>}
            </TouchableOpacity>
        </View>

        <View style={styles.NavigatorContainer}>
            <TouchableOpacity
            style={navBarStatus === 'Time' ? styles.navigationLeftButtonOn : styles.navigationLeftButton}
            onPress={() => changeNavBarStatus('Time')}
            activeOpacity={0.5}>
            <Text style={styles.navigationText}>Biểu đồ giờ</Text>
            </TouchableOpacity>

            <TouchableOpacity
            style={navBarStatus === 'Route' ? styles.navigationMiddleButtonOn : styles.navigationMiddleButton}
            onPress={() => changeNavBarStatus('Route')}
            activeOpacity={0.5}>
            <Text style={styles.navigationText}>Lộ trình</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
            style={navBarStatus === 'Info' ? styles.navigationRightButtonOn : styles.navigationRightButton}
            onPress={() => changeNavBarStatus('Info')}
            activeOpacity={0.5}>
            <Text style={styles.navigationText}>Thông tin</Text>
            </TouchableOpacity>        
        </View>        

        { navBarStatus === 'Time' ? (
          <View style={styles.NavigatorContainer}>
            <TouchableOpacity
              style={styles.navigationArrow}
              /*onPress={() => changeNavBarStatus('Time')}*/
              activeOpacity={0.5}>
                  <Image
                    source={require('../../../assets/Arrow1.png')}
                    style={styles.ArrowImg}
                  />
            </TouchableOpacity>

            <View style={styles.navigationArrow}>
              <Text style={styles.normalText}>Hôm nay</Text>
            </View>
            
            <TouchableOpacity
              style={styles.navigationArrow}
              /*onPress={() => changeNavBarStatus('Time')}*/
              activeOpacity={0.5}>
                  <Image
                    source={require('../../../assets/Arrow2.png')}
                    style={styles.ArrowImg}
                  />
            </TouchableOpacity>      
          </View>
        ) : (
          <View style={styles.emptySpace}>
              
          </View>
        )}

        <SafeAreaView style={styles.DetailInfoContainer}>
            { navBarStatus === 'Route' ? routeStatus === 'Go' ? (
                <FlatList 
                data={data?.InBoundDescription}
                renderItem={StationGoRoute}
                />     
            ) : (
                <FlatList
                data={data?.OutBoundDescription}
                renderItem={StationGoRoute}
                />               
            ) : navBarStatus === 'Time' ? (
                <FlatList
                data={StationData.timeTable}
                renderItem={StationTimeRoute}
                />               
            ) : (
              <View style={styles.singleRouteContainer}>
              <Text style={styles.boldText}>Tuyến số
                <Text style={styles.normalText}>
                  : {data?.RouteId} 
                </Text>
              </Text>
              <Text style={styles.boldText}>Tên chuyến
                <Text style={styles.normalText}>
                  : {data?.RouteName} 
                </Text>
              </Text>
              <Text style={styles.boldText}>Thời gian hoạt động
                <Text style={styles.normalText}>
                  : {data?.OperationTime} 
                </Text>
              </Text>
              {data?.Tickets.map(item => (
                <Text style={styles.normalText} key={item}>
                  {item}
                </Text>
              ))}
              <Text style={styles.boldText}>Giãn cách tuyến
                <Text style={styles.normalText}>
                  : {data?.TimeOfTrip} 
                </Text>
              </Text>
              <Text style={styles.boldText}>Số chuyến
                <Text style={styles.normalText}>
                  : {data?.TotalTrip} 
                </Text>
              </Text>
            </View>          
            )}
        </SafeAreaView>

    </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      },
      MapContainer: {
        flex: 6,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      },
      BasicInfoContainer: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        width: '100%',
      },
      NavigatorContainer: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
      },
      DetailInfoContainer: {
        flex: 8,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        flexDirection: 'column',
      },
      button: {
        backgroundColor: '#CDE2FF',
        height: 26,
        width: 90,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        marginHorizontal: 10, 
      },
      buttonText: {
        color: '#0056CF',
      },
      navigationLeftButton: {
        backgroundColor: '#1570EF',
        height: 32,
        width: '33.3%',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomLeftRadius: 8,
        borderTopLeftRadius: 8,
      },
      navigationMiddleButton: {
        backgroundColor: '#1570EF',
        height: 32,
        width: '33%',
        alignItems: 'center',
        justifyContent: 'center',
      },
      navigationRightButton: {
        backgroundColor: '#1570EF',
        height: 32,
        width: '33.3%',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomRightRadius: 8,
        borderTopRightRadius: 8,
      },
      navigationLeftButtonOn: {
        backgroundColor: '#1570EF',
        height: 30,
        width: '33.3%',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomLeftRadius: 8,
        borderTopLeftRadius: 8,
      },
      navigationMiddleButtonOn: {
        backgroundColor: '#1570EF',
        height: 30,
        width: '33%',
        alignItems: 'center',
        justifyContent: 'center',
      },
      navigationRightButtonOn: {
        backgroundColor: '#1570EF',
        height: 30,
        width: '33.3%',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomRightRadius: 8,
        borderTopRightRadius: 8,
      },
      navigationText: {
        color: '#ffffff',
      },
      navigationArrow: {
        backgroundColor: '#ffffff',
        height: 30,
        width: '33%',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#0056CF',
      },
      emptySpace: {
        backgroundColor: '#ffffff',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      },
      singleRouteContainer: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        color: '#0056CF',
      },
      routeContainer: {
        flexDirection: 'row',
      },
      CheckImg: {
        width: 24,
        height: 40,
        marginHorizontal: 10,
      },
      ArrowImg: {
        width: 10,
        height: 20,
        marginHorizontal: 10,
      },
      Img: {
        width: 420,
        height: 290,
      },
      normalText: {
        color: '#0056CF',
      },
      boldText: {
        color: '#0056CF',
      },
    content: {
      backgroundColor: Colors.WHITE,
      flex: 1,
      width: "100%",
      paddingHorizontal: 16,
      paddingBottom: 32,
      paddingTop: 16,
      justifyContent: 'space-between'
    },
    optionContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      zIndex: 2
    },
    option: {
      backgroundColor: "#fff",
      width: "45%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 32,
      borderRadius: 8,
    },
  
    searchIcon: {
      position: "absolute",
      top: 8,
      left: 12,
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
  
    map: {
      zIndex: 1,
      ...StyleSheet.absoluteFillObject,
    },
  });
