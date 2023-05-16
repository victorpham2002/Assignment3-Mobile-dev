import { useState } from "react";
import { RootScreens } from "..";

import { MyButton } from "@/Components/CustomButton";
import { FloatingInput } from "@/Components/FloatingInput";
import { LoginService } from "@/Components/LoginService";
import { LocalizationKey, i18n } from "@/Localization";
import { Colors, FontSize } from "@/Theme/Variables";
import { View, Text, Image, StyleSheet, Button, Alert } from "react-native";
import { FormControl } from "native-base";

export interface IRegisterProps {
  isLoading: boolean;
  onNavigate: (string: RootScreens) => void;
}

export const Register = (props: IRegisterProps) => {
  const { isLoading } = props;
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("")
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.registerImg}
          source={require("../../../assets/login_img.png")}
        />
        <Text style={styles.title}>{i18n.t(LocalizationKey.SIGNUP)}</Text>
      </View>
      <View style={styles.content}>
       <FormControl>
          <FloatingInput
            label={i18n.t(LocalizationKey.USERNAME)}
            value={userName}
            onChangeText={setUsername}
          />
          <FloatingInput
            label={i18n.t(LocalizationKey.PASSWORD)}
            value={password}
            type="password"
            onChangeText={setPassword}
          />
  
          <FloatingInput
            label={i18n.t(LocalizationKey.CONFIRM_PASSWORD)}
            value={confirmPassword}
            type="password"
            onChangeText={setConfirmPassword}
          />
  
          <MyButton
            title={i18n.t(LocalizationKey.SIGNUP)}
            buttonColor={Colors.PRIMARY}
            buttonStyle={styles.button}
            onPress={() => {
              Alert.alert(userName, password);
            }}
          />
       </FormControl>
        <View
          style={{
            width: "100%",
            backgroundColor: "#fff",
            paddingVertical: 16,
          }}
        >
          <LoginService />
          <Text style={styles.bottomText}>{i18n.t(LocalizationKey.HAS_AN_ACCOUNT)} ?</Text>
          <Text style={styles.bottomText} onPress={() => props.onNavigate(RootScreens.LOGIN)}>{i18n.translate(LocalizationKey.SIGNIN)}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: Colors.SECONDARY,
    alignItems: "center",
    justifyContent: "flex-start",
  },

  imageContainer: {
    width: "100%",
    flex: 1,
    padding: 16,
  },

  title: {
    textAlign: "center",
    marginHorizontal: 4,
    width: "100%",
    fontSize: FontSize.MEDIAN,
    fontWeight: "500",
  },

  registerImg: {
    width: "100%",
    flex: 1,
    resizeMode: "contain",
    backgroundColor: Colors.SECONDARY,
    paddingHorizontal: 8,
  },

  content: {
    display: 'flex',
    justifyContent: 'space-between',
    minHeight: '50%',
    width: "100%",
    alignItems: "center",
    backgroundColor: "#fff",
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    padding: 32,
  },
  button: {
    width: "100%",
    marginVertical: 8,
    borderRadius: 5,
    backgroundColor: Colors.PRIMARY,
  },
  bottomText: {
    textAlign: "center",
  },
});
