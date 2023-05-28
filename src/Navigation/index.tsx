import React, { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import { NativeStackNavigationOptions, NativeStackNavigationProp, createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { StackScreenProps } from '@react-navigation/stack';
import { MainNavigator } from "./Main";
import { WelcomeContainer } from "@/Screens/Welcome";
import { RootScreens } from "@/Screens";
import { HomeContainer } from "@/Screens/Home";
import { LoginContainer } from "@/Screens/Login";
import { RegisterContainer } from "@/Screens/Register";
import { StationListContainer } from "@/Screens/StationList";
import { StationDetailContainer } from "@/Screens/StationDetail";
import RouteSearchResultContainer from "@/Screens/RouteSearchResult/RouteSearchResultContainer";
import RouteDetailContainer from "@/Screens/RouteDetail/RouteDetailContainer";
import RouteSearchContainer from "@/Screens/RouteSearch/RouteSearchContainer";
import { Onboarding } from "@/Screens/Onboarding";
import { NativeStackNavigationConfig, NativeStackScreenProps } from "@react-navigation/native-stack/lib/typescript/src/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppDispatch, useAppSelector } from "@/Hooks/redux";
import { getUserInAsyncStorage } from "@/Helper";

export type RootStackParamList = {
  [RootScreens.WELCOME]: undefined;
  [RootScreens.HOME]: undefined;
  [RootScreens.LOGIN]: undefined;
  [RootScreens.REGISTER]: undefined;
  [RootScreens.STATIONLIST]: undefined;
  [RootScreens.STATIONDETAIL]: { id: string } | undefined;
  [RootScreens.ONBOARDING]: undefined;
  [RootScreens.ROUTE_SEARCH_RESULT]: undefined;
  [RootScreens.ROUTE_SEARCH]: undefined;
  [RootScreens.ROUTE_DETAIL]: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

const defautScreenOptions = {
  headerStyle: {
    backgroundColor: "#1570EF",
  },
  headerTintColor: "#fff",
  headerTitleStyle: {
    fontWeight: "600",
  },
  headerTitleAlign: "center",
};

const publicScreen = [
  { name: RootScreens.LOGIN, component: LoginContainer, options: { headerShown: false },},
  { name: RootScreens.REGISTER, component: RegisterContainer, options: { headerShown: false }  },
  { name: RootScreens.ONBOARDING, component: Onboarding, options: { headerShown: false }},
];

const privateScreen = [
  { name: RootScreens.HOME, component: HomeContainer, options: { headerShown: false}},
  { name: RootScreens.STATIONLIST, component: StationListContainer, options: { title: "Danh sách tuyến xe", ...defautScreenOptions }},
  // { name: RootScreens.STATIONDETAIL, component: StationDetailContainer, options: { title: "Tuyến số"}},
  { name: RootScreens.ROUTE_DETAIL, component: RouteDetailContainer, options: { headerShown: false}},
  // { name: RootScreens.ROUTE_SEARCH, component: RouteSearchContainer, options: { headerShown: false}},
  // { 
  //   name: RootScreens.ROUTE_SEARCH_RESULT, 
  //   component: RouteSearchResultContainer,
  //   options: { title: "Tìm đường", ...defautScreenOptions},
  // },
]
// @refresh reset
const ApplicationNavigator = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false)
  const {user} = useAppSelector(state => ({...state}))
  const dispatch = useAppDispatch()
  
  useEffect(() => {
    getUserInAsyncStorage().then((user_: any) => {
      if (user_ && user_.access_token) {
        setIsLogin(true)
      } else {
        setIsLogin(false)
      }
    })
  }, [user, dispatch])
  console.log(user)
  return (
    <NavigationContainer>
      <StatusBar />
      <RootStack.Navigator>
        { isLogin ? 
          privateScreen.map((item, index) => {
            return (<RootStack.Screen
              key = {index}
              name = {item.name}
              component = {item.component as ({ navigation, route }: NativeStackScreenProps<RootStackParamList, keyof RootStackParamList>) => JSX.Element}
              options = {item.options as NativeStackNavigationOptions}            
            />)
          })
          :
          publicScreen.map((item, index) => {
            return ( <RootStack.Screen
              key={index}
              name={item.name}
              component={item.component}
              options={item.options}            
            />)
          })
        }

       
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export { ApplicationNavigator };
