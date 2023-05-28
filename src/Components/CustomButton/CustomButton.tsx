import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

export interface ICustomButtonProps {
  title: any;
  onPress?: any;
  buttonColor?: string;
  titleColor?: string;
  buttonStyle?: object;
  textStyle?: object;
  disabled?: boolean
}

const CustomButton = (props: ICustomButtonProps ) => {
  const { title, onPress, buttonColor, titleColor, buttonStyle, textStyle, disabled } = {
    ...props,
  };
  return (
    <TouchableOpacity
      disabled={disabled}
      style={{
        ...styles.container,  
        ...buttonStyle,
        opacity: disabled ? 0.6 : 1,
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
