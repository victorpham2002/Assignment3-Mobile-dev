import { Colors, FontSize, MetricsSizes } from "@/Theme/Variables";
import { useEffect, useRef, useState } from "react";
import { Easing, TouchableWithoutFeedback } from "react-native";
import { Animated, StyleSheet, TextInput } from "react-native";
import {TextInput as PTextInput} from 'react-native-paper'
import { View } from "react-native";
import { useTogglePasswordShow } from "@/Hooks";
import MuiIcons from "@expo/vector-icons/MaterialIcons";


export interface IFloatingInputProps {
  label: string;
  value: any;
  type?: string ;
  inputStyles?: any,
  style?: any,
  onChangeText?: (a: any) => void;
  disabled?: boolean,
  right?: any,
  keyboardType?: any
}

function FloatingInput(props: IFloatingInputProps) {
  const {passwordShow, rightIcon, handlePasswordShow} = useTogglePasswordShow();
  return (
    <TouchableWithoutFeedback>
      <View style={{...styles.container, ...props.style}}>
        <View>
          <PTextInput
            // disabled = {props.disabled}
            keyboardType={props.keyboardType}
            style={{...props.inputStyles}}
            secureTextEntry = {props.type === 'password' && passwordShow}
            mode="outlined"
            activeOutlineColor={Colors.PRIMARY}
            outlineColor={!!props.value ? Colors.PRIMARY : Colors.SECONDARY}
            {...props}
            right = {props.right || (props.type === 'password' && <PTextInput.Icon onPress={handlePasswordShow} icon = {rightIcon}/>)}
            value={props.value}
            onChangeText={props.onChangeText}
            underlineColorAndroid="transparent"
          />
        </View>
        
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 8,
    position: "relative",
    height: 60
  },
});

export default FloatingInput;
