import { RootScreens } from "..";
import { MyButton } from "@/Components/CustomButton";
import { FloatingInput } from "@/Components/FloatingInput";
import { LoginService } from "@/Components/LoginService";
import { LocalizationKey, i18n } from "@/Localization";
import { Colors, FontSize } from "@/Theme/Variables";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  Alert,
  Modal,
  Pressable,
  Platform,
} from "react-native";
import { FormControl, HStack, Heading, Spinner } from "native-base";
import CustomAlert from "@/Components/CusomAlert/CustomAlert";
import { storeAsyncStorage } from "@/Helper";

export interface IRegisterProps {
  isLoading: boolean;
  error: string;
  setError: any;
  password: string;
  setPassword: any;
  userName: string;
  confirmPassword: string;
  setConfirmPassword: any;
  setUserName: any;
  isRegisterSuccess: boolean;
  onNavigate: (string: RootScreens) => void;
  onLoginButtonPress: (username: string, password: string) => void;
}

export interface ILoginProps {}

export const Register = (props: IRegisterProps) => {
  const {
    isLoading,
    error,
    setError,
    onNavigate,
    onLoginButtonPress,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    userName,
    setUserName,
    isRegisterSuccess,
  } = props;

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
            onChangeText={setUserName}
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
            disabled={isLoading || !userName || !password}
            title={
              isLoading ? (
                <HStack space={2} justifyContent="center">
                  <Spinner accessibilityLabel="Loading" color={"#fff"} />
                  <Heading color="#fff" fontSize="md">
                    {i18n.t(LocalizationKey.SIGNUP)}
                  </Heading>
                </HStack>
              ) : (
                i18n.t(LocalizationKey.SIGNUP)
              )
            }
            buttonColor={Colors.PRIMARY}
            buttonStyle={styles.button}
            onPress={onLoginButtonPress}
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
          <Text style={styles.bottomText}>
            {i18n.t(LocalizationKey.HAS_AN_ACCOUNT)} ?
          </Text>
          <Text
            style={styles.bottomText}
            onPress={() => props.onNavigate(RootScreens.LOGIN)}
          >
            {i18n.translate(LocalizationKey.SIGNIN)}
          </Text>
        </View>
      </View>

      <CustomAlert
        displayMode="warning"
        displayMsg={error}
        visibility={!!error}
        handleDismiss={() => setError("")}
      />
      <CustomAlert
        displayMode="success"
        displayMsg={i18n.translate(LocalizationKey.SUCCESS_REGISTER)}
        visibility={!!isRegisterSuccess}
        handleDismiss={async () => {
          await storeAsyncStorage("username", userName);
          onNavigate(RootScreens.LOGIN);
        }}
        buttonTitle="Đăng nhập thôi!"
      />
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
    display: "flex",
    justifyContent: "space-between",
    minHeight: "50%",
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
