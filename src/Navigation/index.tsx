import React from "react";
import { StatusBar } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
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
import { Onboarding }from "@/Screens/Onboarding"

export type RootStackParamList = {
  [RootScreens.WELCOME]: undefined;
  [RootScreens.HOME]: undefined;
  [RootScreens.LOGIN]: undefined;
  [RootScreens.REGISTER]: undefined;
  [RootScreens.STATIONLIST]: undefined;
  [RootScreens.STATIONDETAIL]: {id: number} | undefined;
  [RootScreens.ONBOARDING]: undefined;
  [RootScreens.ROUTE_SEARCH_RESULT]: undefined;
  [RootScreens.ROUTE_SEARCH]: undefined;
  [RootScreens.ROUTE_DETAIL]: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

// @refresh reset
const ApplicationNavigator = () => {
  return (
    <NavigationContainer>
      <StatusBar />
      <RootStack.Navigator 
        initialRouteName={RootScreens.LOGIN}
        screenOptions={{
          headerStyle: {
            backgroundColor: '#1570EF',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: '600',
          },
          headerTitleAlign: 'center',
        }}
      >
        <RootStack.Screen
          name={RootScreens.ONBOARDING}
          component={Onboarding}
        />
        <RootStack.Screen
          name={RootScreens.STATIONLIST}
          component={StationListContainer}
          options={{
            title: 'Danh sách tuyến xe',
          }}
        />
        <RootStack.Screen
          name={RootScreens.STATIONDETAIL}
          component={StationDetailContainer}
          initialParams={{id: 54}}
          options={{
            title: 'Tuyến số',
          }}
        />
        <RootStack.Screen
          name={RootScreens.LOGIN}
          component={LoginContainer}
          options={{
            headerShown: false,
          }}
        />
        <RootStack.Screen
          name={RootScreens.HOME}
          component={HomeContainer}
          options={{
            headerShown: false,
          }}
        />
        <RootStack.Screen
          name={RootScreens.REGISTER}
          component={RegisterContainer}
          options={{
            headerShown: false,
          }}
        />
        <RootStack.Screen
          name={RootScreens.WELCOME}
          component={WelcomeContainer}
          options={{
            headerShown: false,
          }}
        />
        <RootStack.Screen
          name={RootScreens.ROUTE_SEARCH_RESULT}
          component={RouteSearchResultContainer}
          options={{
            title: 'Tìm đường',
          }}
        />
        <RootStack.Screen
          name={RootScreens.ROUTE_SEARCH}
          component={RouteSearchContainer}
          options={{
            headerShown: false,
          }}
        />
        <RootStack.Screen
          name={RootScreens.ROUTE_DETAIL}
          component={RouteDetailContainer}
          options={{
            title: 'Tìm đường',
          }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export { ApplicationNavigator };
