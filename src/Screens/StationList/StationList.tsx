import { i18n, LocalizationKey } from "@/Localization";
import React, { useState } from "react";
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

export interface ItemData {
    id: string;
    title: string;
    description: string;
    time: string;
    price: string;    
    onNavigate: any
}

export interface ILoginProps {
  isLoading: boolean;
  onNavigate: (string: RootScreens) => void;
}

export interface NavProps {
  onNavigate: (string: RootScreens) => void;
}

let DATA: ItemData[] = [
    {
      id: '1',
      title: 'Tuyến số 08',
      description: 'Bến xe Miền Tây - Bến xe Ngã Tư Ga',
      time: '04:00 - 19:30',
      price: '7000',
      onNavigate: undefined,
    },
    {
      id: '2',
      title: 'Tuyến số 32',
      description: 'Bến xe Miền Tây - Bến xe Ngã Tư Ga',
      time: '04:00 - 19:30',
      price: '7000',
      onNavigate: undefined,
    },
    {
      id: '3',
      title: 'Tuyến số 33',
      description: 'Bến xe Miền Tây - Bến xe Ngã Tư Ga',
      time: '04:00 - 19:30',
      price: '7000',
      onNavigate: undefined,
    },
    {
      id: '4',
      title: 'Tuyến số 34',
      description: 'Bến xe Miền Tây - Bến xe Ngã Tư Ga',
      time: '04:00 - 19:30',
      price: '7000',
      onNavigate: undefined,
    },
    {
      id: '5',
      title: 'Tuyến số 35',
      description: 'Bến xe Miền Tây - Bến xe Ngã Tư Ga',
      time: '04:00 - 19:30',
      price: '7000',
      onNavigate: undefined,
    },
    {
      id: '6',
      title: 'Tuyến số 32',
      description: 'Bến xe Miền Tây - Bến xe Ngã Tư Ga',
      time: '04:00 - 19:30',
      price: '7000',
      onNavigate: undefined,
    },
    {
      id: '7',
      title: 'Tuyến số 33',
      description: 'Bến xe Miền Tây - Bến xe Ngã Tư Ga',
      time: '04:00 - 19:30',
      price: '7000',
      onNavigate: undefined,
    },
    {
      id: '8',
      title: 'Tuyến số 34',
      description: 'Bến xe Miền Tây - Bến xe Ngã Tư Ga',
      time: '04:00 - 19:30',
      price: '7000',
      onNavigate: undefined,
    },
  ];

  const RenderItem = ({item}: {item: ItemData}) => (
    <TouchableOpacity 
      onPress={() => {
        item.onNavigate(RootScreens.STATIONDETAIL);
      }}
      style={styles.item}>
      
      <Text style={styles.itemTitle}>{item.title}</Text>
      <Text style={styles.itemDescription}>{item.description}</Text>
      <View style={styles.subBusInfoContainer}>
        <View style={styles.subBusInfo}>
          <Image
            source={require('../../../assets/iconClock.png')}
            style={styles.iconClock}
          />
          <Text style={styles.itemDescription}>{item.time}</Text>
        </View>
        <View style={styles.subBusInfo}>
          <Image
            source={require('../../../assets/iconMoney.png')}
            style={styles.iconMoney}
          />
          <Text style={styles.itemDescription}>{item.price} VND</Text>
        </View>
      </View>
  
    </TouchableOpacity>
  );

  export const StationList = (props: ILoginProps) => {
    const { isLoading, onNavigate } = props;
    const [stationName, onChangeStationName] = useState("");

    for (let i = 0; i < DATA.length; i++) {
      DATA[i]['onNavigate'] = onNavigate;
    }

    return (
      <View style={styles.container}>
        <View style={styles.searchBarContainner}>
          <View style={styles.inputTextContainer}>
            <TextInput
              value={stationName}
              onChangeText={onChangeStationName}
              placeholderTextColor="#C6C6C6"
              placeholder="Tìm kiếm bến xe buýt"
              style={{
                ...styles.inputText,
                ...Platform.select({
                  ios: { ...styles.iosShadow },
                  android: { ...styles.androidShadow },
                }),
              }}
            />
            <MuiIcons
              style={styles.searchIcon}
              name="search"
              color="#C6C6C6"
              size={24}
            />
          </View>
        </View>

        <SafeAreaView style={styles.searchResultContainner}>
          <FlatList
            data={DATA}
            renderItem={RenderItem}
          />
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
    searchBarContainner: {
      flex: 1,
      width: '100%',
      height: 10,
      backgroundColor: '#1570EF',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      borderBottomLeftRadius: 16,
      borderBottomRightRadius: 16,
      position: "relative",
      zIndex: 2
    },
    searchResultContainner: {
      flex: 10,
      backgroundColor: '#ffffff',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    },
    searchBar: {
      fontSize: 14,
      height: 40,
      width: 300,
      margin: 25,
      padding: 10,
      backgroundColor: '#FFFFFF',
      color: '#000000',
      borderWidth: 1,
      borderRadius: 10,
      borderColor: '#979797',
    },
    inputText: {
      backgroundColor: "#fff",
      fontSize: 14,
      textAlignVertical: "center",
      paddingHorizontal: 40,
      paddingVertical: 8,
      height: 40,
      borderRadius: 8,
      width: 300,
    },
    inputTextContainer: {
      position: "relative",
      zIndex: 2
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
    },
    itemDescription: {
      color: '#0056CF',
    },
    subBusInfoContainer: {
      flexDirection: 'row',
    },
    subBusInfo: {
      flexDirection: 'row',
      width: '50%',
    },
    iconClock: {
      height: 18,
      width: 18,
    },
    iconMoney: {
      height: 18,
      width: 30,
      marginHorizontal: 5,
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