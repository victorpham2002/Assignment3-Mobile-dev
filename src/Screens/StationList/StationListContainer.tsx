import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StationList } from "./StationList";
import React from "react";
import { RootStackParamList } from "@/Navigation";
import { RootScreens } from "..";


type LoginScreenNavigatorProps = NativeStackScreenProps<
  RootStackParamList
>;

export const StationListContainer = ({ navigation }: LoginScreenNavigatorProps) => {
  const onNavigate = (screen: RootScreens.STATIONDETAIL, id: number) => {
    navigation.navigate(screen, {id: id});
  };

  return <StationList isLoading={false} onNavigate={onNavigate} />;
};
