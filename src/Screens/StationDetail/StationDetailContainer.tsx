import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StationDetail } from "./StationDetail";
import { RootStackParamList } from "@/Navigation";
import React, { useState, useEffect } from "react";
import { useLazyGetUserQuery } from "@/Services";

type LoginScreenNavigatorProps = NativeStackScreenProps<
  RootStackParamList
>;

export const StationDetailContainer = ({ navigation }: LoginScreenNavigatorProps, route : number) => {
  const setOptions = (route: number) => {
    navigation.setOptions({ title: `Tuyến xe ${route}`});
  };

  return <StationDetail route={1} setOptions={setOptions}/>;
};
