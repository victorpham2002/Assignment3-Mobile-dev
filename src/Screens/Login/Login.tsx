import { MyButton } from "@/Components/CustomButton";
import { FloatingInput } from "@/Components/FloatingInput";
import { LoginService } from "@/Components/LoginService";
import { LocalizationKey, i18n } from "@/Localization";
import { Colors, FontSize } from "@/Theme/Variables";
import { useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { RootScreens } from "..";
import { FormControl } from "native-base";

export interface ILoginProps {
  isLoading: boolean;
  onNavigate: (string: RootScreens) => void;
}

export const Login = (props: ILoginProps) => {
  const { isLoading, onNavigate } = props;
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.loginImage}
          source={require("../../../assets/login_img.png")}
        />
        <Text style={styles.title}>{i18n.t(LocalizationKey.SIGNIN)}</Text>
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
  
          <MyButton
            title={i18n.t(LocalizationKey.SIGNIN)}
            buttonColor={Colors.PRIMARY}
            buttonStyle={styles.button}
            onPress={() => {
             onNavigate(RootScreens.HOME)
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
          <Text style={{...styles.bottomText, color: Colors.TEXT}}>{i18n.t(LocalizationKey.NOT_HAS_AN_ACCOUNT)} ?</Text>
          <Text style={{...styles.bottomText, color: Colors.PRIMARY}} onPress={() => onNavigate(RootScreens.REGISTER)}>{i18n.t(LocalizationKey.SIGNUP)}</Text>
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
    height: "30%",
    padding: 16,
  },

  title: {
    textAlign: "center",
    marginVertical: 4,
    width: "100%",
    fontSize: FontSize.MEDIAN,
    fontWeight: "500",
  },

  loginImage: {
    width: "100%",
    flex: 1,
    resizeMode: "contain",
    backgroundColor: Colors.SECONDARY,
    paddingHorizontal: 8,
  },

  content: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-between',
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
