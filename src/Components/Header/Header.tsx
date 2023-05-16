import { Colors, FontSize } from "@/Theme/Variables";
import React, { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export interface IHeaderProps {
  title: string;
  LeftIcon?: any;
  RightIcon?: any ;
}
function Header(props: IHeaderProps) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.icon}>{props.LeftIcon}</View>
      <Text style = {styles.text}>{props.title}</Text>
      <View style={styles.icon}>{props.RightIcon}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.PRIMARY,
    width: "100%",
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomStartRadius: 16,
    borderBottomEndRadius: 16,
  },

  text: {
    color: Colors.WHITE,
    fontSize: FontSize.SMALL
  },

  icon: {
    display: 'flex', 
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
  },

});

export default Header;
