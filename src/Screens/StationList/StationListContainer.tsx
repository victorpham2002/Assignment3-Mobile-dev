import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StationList } from "./StationList";
import React, { useState, useEffect } from "react";
import { RootStackParamList } from "@/Navigation";
import { RootScreens } from "..";


type LoginScreenNavigatorProps = NativeStackScreenProps<
  RootStackParamList
>;

export const StationListContainer = ({ navigation }: LoginScreenNavigatorProps) => {
  const onNavigate = (screen: RootScreens) => {
    navigation.navigate(screen);
  };

  return <StationList isLoading={false} onNavigate={onNavigate} />;
};
