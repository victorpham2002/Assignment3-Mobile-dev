import { Home } from "./Home";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {RootState} from '@/Store'
import { RootScreens } from "..";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/Navigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFacebookUser, getGoogleUser, getUserDB } from "@/Store/reducers/user";
import { useAppDispatch, useAppSelector } from "@/Hooks/redux";
import { getUserInAsyncStorage } from "@/Helper";


type IHomeContainerProps = NativeStackScreenProps<RootStackParamList>

export const HomeContainer = ({navigation} :IHomeContainerProps) => {
  // const [userId, setUserId] = useState("9");
  const dispatch = useAppDispatch()
  const {user} = useAppSelector((state: RootState) => ({...state}))
  const onNavigate = (screen: RootScreens) => {
    navigation.navigate(screen);
  };

  useEffect(() => {
    if (!user.username && !user.name && !user.email) {
      getUserInAsyncStorage().then((user: any) => {
        if (user) {
          if (user.type === "google") {
            console.log(user);
            dispatch(getGoogleUser(user.access_token));
          } else if (user.type === "facebook") {
            dispatch(getFacebookUser(user.access_token));
          } else {
            console.log(user);
            dispatch(
              getUserDB({ token: user.access_token, username: user.username })
            );
          }
        } else {
          navigation.navigate(RootScreens.LOGIN);
        }
      });

    }
  }, []);


  

  // const [fetchOne, { data, isSuccess, isLoading, isFetching, error }] =
  //   useLazyGetUserQuery();

  // useEffect(() => {
  //   fetchOne(userId);
  // }, [fetchOne, userId]);



  return <Home data={user} isLoading={user.loading} onNavigate={onNavigate}/>;
};
