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
  ActivityIndicator,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Colors } from "@/Theme/Variables";
import MuiIcons from "@expo/vector-icons/MaterialIcons";
import { TextInput } from "react-native";
import MapView from 'react-native-maps';
import { RootScreens } from "..";
import { Config } from "@/Config";
import { Item } from "react-native-paper/lib/typescript/src/components/Drawer/Drawer";
import MapView, { LatLng, Marker, Polyline } from 'react-native-maps';

export interface ILoginProps {
  id: number;
  setOptions: (route: string) => void;
}
const API_ENDPOINT = "https://assignment3-mobiledev-nhom1-busappapi.onrender.com/routes/";

type RouteId = {
  id: number;
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

type RouteStop = {
  StopId: number;
  Code: string;
  Name: string;
  StopType: string;
  Zone: string;
  Ward: string;
  AddressNo: string;
  Street: string;
  SupportDisability: string;
  Status: string;
  Lng: number;
  Lat: number;
  Search: string;
  Routes: string;
};

type RouteTime = {
  RouteId: number;
  TripId: number;
  TimeTableId: number;
  StartTime: string;
  EndTime: string;
};

type RouteCoordinate = {
  Lng: number;
  Lat: number;
}

  const StationGoRoute = ({item}: {item: RouteStop}) => (
    <View style={styles.routeContainer}>
      { item ? (
        <Image
        source={require('../../../assets/Uncheck.png')}
        style={styles.CheckImg}
      />
      ) : (
        <View>
        </View>
      )}
      <Text style={styles.normalText}>{item.Name}</Text>
    </View>
  );

  const hours = new Date().getHours();
  const minutes = new Date().getMinutes();

  const StationTimeRoute = ({item}: {item: RouteTime}) => (
    <View style={styles.routeContainer}>
      { parseInt(item.StartTime.split(":")[0], 10) < hours ? (
        <Image
          source={require('../../../assets/Check.png')}
          style={styles.CheckImg}
        />
      ) : parseInt(item.StartTime.split(":")[0], 10) == hours && parseInt(item.StartTime.split(":")[1], 10) < minutes ? (
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
      <Text style={styles.normalText}>{item.StartTime}</Text>
    </View>
  );

  const RouteStartStopsUI = (id : RouteId) => {
    const RouteId = id.id;

    const [startStopsData, setStartStopsData] = useState<RouteStop[]>([]);
    const startStopsURL = API_ENDPOINT + RouteId.toString() + '/stops/start';

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false); 

    useEffect(() => {
      setIsLoading(true);

      fetch(`${startStopsURL}`)
        .then(response => response.json())
        .then(results => {  
          setStartStopsData(results);
          setIsLoading(false);
        })
        .catch(err => {
          setIsLoading(false);
          setError(err);
        });
    }, []);

    if (isLoading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#5500dc" />
        </View>
      );
    }

    if (error) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 18}}>
            Vui lòng kiểm tra kết nối mạng.
          </Text>
        </View>
      );
    }

    return (
      <FlatList 
        data={startStopsData}
        renderItem={StationGoRoute}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />  
    );
  };

  const RouteEndStopsUI = (id : RouteId) => {
    const RouteId = id.id;

    const [endStopsData, setEndStopsData] = useState<RouteStop[]>([]);
    const endStopsURL = API_ENDPOINT + RouteId.toString() + '/stops/end';

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false); 

    useEffect(() => {
      setIsLoading(true);

      fetch(`${endStopsURL}`)
        .then(response => response.json())
        .then(results => {  
          setEndStopsData(results);
          setIsLoading(false);
        })
        .catch(err => {
          setIsLoading(false);
          setError(err);
        });
    }, []);

    if (isLoading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#5500dc" />
        </View>
      );
    }

    if (error) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 18}}>
            Vui lòng kiểm tra kết nối mạng.
          </Text>
        </View>
      );
    }

    return (
      <FlatList 
        data={endStopsData}
        renderItem={StationGoRoute}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />  
    );
  };

  const RouteStartTimetableUI = (id : RouteId) => {
    const RouteId = id.id;

    const [startTimetableData, setStartTimetableData] = useState<RouteTime[]>([]);
    const startTimetablesURL = API_ENDPOINT + RouteId.toString() + '/timetable/start';

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false); 

    useEffect(() => {
      setIsLoading(true);

      fetch(`${startTimetablesURL}`)
        .then(response => response.json())
        .then(results => {  
          setStartTimetableData(results);
          setIsLoading(false);
        })
        .catch(err => {
          setIsLoading(false);
          setError(err);
        });
    }, []);

    if (isLoading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#5500dc" />
        </View>
      );
    }

    if (error) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 18}}>
            Vui lòng kiểm tra kết nối mạng.
          </Text>
        </View>
      );
    }

    return (
      <FlatList
        data={startTimetableData}
        renderItem={StationTimeRoute}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      /> 
    );
  };

  const RouteEndTimetableUI = (id : RouteId) => {
    const RouteId = id.id;

    const [endTimetableData, setEndTimetableData] = useState<RouteTime[]>([]);
    const endTimetablesURL = API_ENDPOINT + RouteId.toString() + '/timetable/end';

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false); 

    useEffect(() => {
      setIsLoading(true);

      fetch(`${endTimetablesURL}`)
        .then(response => response.json())
        .then(results => {  
          setEndTimetableData(results);
          setIsLoading(false);
        })
        .catch(err => {
          setIsLoading(false);
          setError(err);
        });
    }, []);

    if (isLoading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#5500dc" />
        </View>
      );
    }

    if (error) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 18}}>
            Vui lòng kiểm tra kết nối mạng.
          </Text>
        </View>
      );
    }

    return (
      <FlatList
        data={endTimetableData}
        renderItem={StationTimeRoute}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      /> 
    );
  };

  const RouteDetailUI = (id : RouteId) => {
    const RouteId = id.id;

    const [data, setData] = useState<RouteDetail>();
    const URL = API_ENDPOINT + RouteId.toString();

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false); 

    useEffect(() => {
      setIsLoading(true);

      fetch(`${URL}`)
        .then(response => response.json())
        .then(results => {
          if (results.Tickets === "") {
            results.Tickets = []
          }
  
          setData(results);
          setIsLoading(false);
        })
        .catch(err => {
          setIsLoading(false);
          setError(err);
        });

    }, []);

    if (isLoading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#5500dc" />
        </View>
      );
    }

    if (error) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 18}}>
            Vui lòng kiểm tra kết nối mạng.
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.singleRouteContainer}>
        <Text style={styles.boldText}>Tuyến số
          <Text style={styles.normalText}>
            : {data?.RouteNo} 
          </Text>
        </Text>
        <Text style={styles.boldText}>Tên chuyến
          <Text style={styles.normalText}>
            : {data?.RouteName} 
          </Text>
        </Text>
        {data?.OperationTime ? (
        <Text style={styles.boldText}>Thời gian hoạt động
          <Text style={styles.normalText}>
            : {data?.OperationTime} 
          </Text>
        </Text>
        ) : (
        <Text style={styles.boldText}>Thời gian hoạt động
          <Text style={styles.normalText}>
            : Không có thông tin 
          </Text>
        </Text>
        )}
        {data?.Tickets.map(item => (
          <Text style={styles.normalText} key={item}>
            {item ? item : 'No'}
          </Text>
        ))}
        {data?.TimeOfTrip ? (
        <Text style={styles.boldText}>Giãn cách tuyến
          <Text style={styles.normalText}>
            : {data?.TimeOfTrip} 
          </Text>
        </Text>
        ) : (
        <Text style={styles.boldText}>Giãn cách tuyến
          <Text style={styles.normalText}>
            : Không có thông tin 
          </Text>
        </Text>
        )}
        {data?.TotalTrip ? (
        <Text style={styles.boldText}>Số chuyến
          <Text style={styles.normalText}>
            : {data?.TotalTrip} 
          </Text>
        </Text>
        ) : (
        <Text style={styles.boldText}>Số chuyến
          <Text style={styles.normalText}>
            : Không có thông tin 
          </Text>
        </Text>
        )}
      </View>    
    );
  };

  export const StationDetail = (props: ILoginProps) => {
    const { id , setOptions } = props;

    const [RouteId, setRouteId] = useState<number>(id);

    const [routeStatus, setRouteStatus] = useState('Go');
    const [navBarStatus, setnavBarStatus] = useState('Time');

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const changeRouteStatus = () => {
      routeStatus === 'Go' ? setRouteStatus('Return') : setRouteStatus('Go');
    }
    
    const changeNavBarStatus = (navBarNewState: string) => {
      setnavBarStatus(navBarNewState);
    }

    const [data, setData] = useState<RouteDetail>();
// <<<<<<< vuong
//     const URL = API_ENDPOINT + route;
//     const getRoute = async () => {
//       try {
//         const response = await fetch(`${Config.BACKEND_URL}/routes/${route}`);
//         const json = await response.json();
//         if (json.Tickets === "") {
//           json.Tickets = []
//         }

//         setData(json);
//         setOptions(route);
//       } catch (error) {
//         console.error(error);
//       } 
//     };
// =======
//     const URL = API_ENDPOINT + id.toString();
// >>>>>>> master

    const [startStopsData, setStartStopsData] = useState<RouteStop[]>([]);
    const startStopsURL = URL + '/stops/start';

    let startStopCoordinate: LatLng[] = [];
    startStopsData.map(element => startStopCoordinate.push({"latitude": element.Lat, "longitude": element.Lng}));

    const [endStopsData, setEndStopsData] = useState<RouteStop[]>([]);
    const endStopsURL = URL + '/stops/end';

    let endStopCoordinate: LatLng[] = [];
    endStopsData.map(element => endStopCoordinate.push({"latitude": element.Lat, "longitude": element.Lng}));
  

    const [routeCoordinate, setrouteCoordinate] = useState<RouteCoordinate>({"Lat": 10.866498, "Lng":  106.802377});
    const routeCoordinteURL = URL + '/coordinate/start';

    
    useEffect(() => {
      setIsLoading(true);

      fetch(`${URL}`)
        .then(response => response.json())
        .then(results => {
          if (results.Tickets === "") {
            results.Tickets = []
          }
  
          setData(results);
          setOptions(results.RouteNo as string);
          setIsLoading(false);
        })
        .catch(err => {
          setIsLoading(false);
          setError(err);
        });

      fetch(`${startStopsURL}`)
        .then(response => response.json())
        .then(results => {  
          setStartStopsData(results);
        })
        .catch(err => {
          setIsLoading(false);
          setError(err);
        });

      fetch(`${endStopsURL}`)
        .then(response => response.json())
        .then(results => {  
          setEndStopsData(results);
        })
        .catch(err => {
          setIsLoading(false);
          setError(err);
        });

      fetch(`${routeCoordinteURL}`)
        .then(response => response.json())
        .then(results => {  
          setrouteCoordinate(results);
        })
        .catch(err => {
          setIsLoading(false);
          setError(err);
        });

    }, []);

    if (isLoading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#5500dc" />
        </View>
      );
    }

    if (error) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 18}}>
            Vui lòng kiểm tra kết nối mạng.
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <View style={styles.MapContainer}>
        <MapView
          style={styles.Img}
          initialRegion={{
            latitude: 10.866498,
            longitude:  106.802377,
            latitudeDelta: 0.0942,
            longitudeDelta: 0.042,
          }}
          region={{
            latitude: routeCoordinate.Lat,
            longitude:  routeCoordinate.Lng,
            latitudeDelta: 0.0942,
            longitudeDelta: 0.042,
          }}          
          zoomEnabled={true}
          zoomControlEnabled={true}
        >
          { routeStatus === 'Go' ? startStopsData.map(element => (
            <Marker
              key={element.StopId}
              coordinate={{latitude: element.Lat, longitude: element.Lng}}
              title={element.Name}
              description={element.AddressNo}
            />
          )) : endStopsData.map(element => (
            <Marker
              key={element.StopId}
              coordinate={{latitude: element.Lat, longitude: element.Lng}}
              title={element.Name}
              description={element.AddressNo}
            />
          ))}

          { routeStatus === 'Go' ? (
            <Polyline
              coordinates={startStopCoordinate}            
              strokeColor="#1570EF" 
              strokeColors={[
                '#1570EF',
                '#000000',
              ]}
              strokeWidth={3}
            />
          ) : (
            <Polyline
              coordinates={endStopCoordinate}            
              strokeColor="#1570EF" 
              strokeColors={[
                '#1570EF',
                '#000000',
              ]}
              strokeWidth={3}
            />
          )}
        </MapView>
        </View>

        <View style={styles.BasicInfoContainer}>
            <Text style={styles.normalTextBlock}>{data?.RouteName}</Text>         
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

        <SafeAreaView style={styles.DetailInfoContainer}>
          { navBarStatus === 'Route' ?  routeStatus === 'Go' ? (
            <RouteStartStopsUI id={RouteId} />
          ) : (
            <RouteEndStopsUI id={RouteId} />     
          ) : navBarStatus === 'Time' ? routeStatus === 'Go' ? (
            <RouteStartTimetableUI id={RouteId} />
          ) : (
            <RouteEndTimetableUI id={RouteId} />
          ) : (
            <RouteDetailUI id={RouteId} />
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
        width: '95%',
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
        width: '95%',
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
      normalTextBlock: {
        color: '#0056CF',
        width: '65%',
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
