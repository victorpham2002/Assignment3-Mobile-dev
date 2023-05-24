import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StationDetail } from "./StationDetail";
import { RootStackParamList } from "@/Navigation";
import React, { useState, useEffect } from "react";
import { useLazyGetUserQuery } from "@/Services";
import { useRoute } from '@react-navigation/native';
import { RootScreens } from "..";

type LoginScreenNavigatorProps = NativeStackScreenProps<
  RootStackParamList, RootScreens.STATIONDETAIL
>;

export const StationDetailContainer = ({ navigation , route }: LoginScreenNavigatorProps) => {
  let id = '0';
  if (route.params) {
      id =  route.params.id;
      console.log(id);
  }
  
  const setOptions = (route: string) => {
    navigation.setOptions({ title: `Tuyến xe ${route}`});
  };

  return <StationDetail route={id} setOptions={setOptions}/>;
};
