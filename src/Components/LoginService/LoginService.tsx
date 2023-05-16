import { Colors } from "@/Theme/Variables";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import { Image, Text } from "react-native";

function LoginService() {
  return (
    <View style={styles.container}>
        
        <View style = {{...styles.row, marginVertical: 8}}>
            <Text style = {styles.border}></Text>
            <Text style={{marginHorizontal: 16}}>Hoặc</Text>
            <Text style = {styles.border}></Text>
        </View>
        <View style={styles.row}>
            <Image source={require("../../../assets/facebookIcon.png")} />
            <Image source={require("../../../assets/googleIcon.png")} />
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 16,
  },

  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },

  border: {
    width: '30%',
    borderBottomWidth: 2,
    borderStyle: 'solid',
    borderColor: Colors.PRIMARY,
    transform: [{translateY: -10}]
  }
});

export default LoginService;
