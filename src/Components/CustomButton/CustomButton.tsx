import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

export interface ICustomButtonProps {
  title: string;
  onPress?: any;
  buttonColor?: string;
  titleColor?: string;
  buttonStyle?: object;
  textStyle?: object;
}

const CustomButton = (props: ICustomButtonProps ) => {
  const { title, onPress, buttonColor, titleColor, buttonStyle, textStyle } = {
    ...props,
  };
  return (
    <TouchableOpacity
      style={{
        ...styles.container,
        ...buttonStyle,
        backgroundColor: buttonColor || "#512DA8",
      }}
      onPress={onPress}
    >
      <Text
        style={{ ...styles.title, ...textStyle, color: titleColor || "#fff" }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#512DA8",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
  },
  title: {
    color: "#fff",
    fontSize: 16,
  },
});
