import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";


export interface IStartedButtonProps {
    title: string;
    onPress?: any;
}

const StartedButton = (props: IStartedButtonProps) => {
    const{ title, onPress } = { ...props,};
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={onPress}
        >
            <Text
                style={styles.title}
            >{title}</Text>
        </TouchableOpacity>
    )

}

export default StartedButton;

const styles = StyleSheet.create({
    container: {
      backgroundColor: "#1570EF",
      width: '100%',
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 8,
      borderRadius: 30,
      marginHorizontal: '65%'
    },
    title: {
      color: "#fff",
      fontSize: 20,
    },
  });
