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
  Modal,
  Pressable,
  Platform,
} from "react-native";
import { RootScreens } from "..";
import { FormControl, HStack, Heading, Spinner } from "native-base";

export interface ILoginProps {
  isLoading: boolean;
  error: string;
  setError: any;
  password: string;
  setPassword: any;
  userName: string;
  setUserName: any;
  onNavigate: (string: RootScreens) => void;
  onLoginButtonPress: (username: string, password: string) => void;
}

export const Login = (props: ILoginProps) => {
  const {
    isLoading,
    error,
    setError,
    onNavigate,
    onLoginButtonPress,
    password,
    setPassword,
    userName,
    setUserName,
  } = props;

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
            onChangeText={setUserName}
          />
          <FloatingInput
            label={i18n.t(LocalizationKey.PASSWORD)}
            value={password}
            type="password"
            onChangeText={setPassword}
          />

          <MyButton
            disabled={isLoading || !userName || !password}
            title={
              isLoading ? (
                <HStack space={2} justifyContent="center">
                  <Spinner accessibilityLabel="Loading" color={"#fff"} />
                  <Heading color="#fff" fontSize="md">
                    {i18n.t(LocalizationKey.SIGNIN)}
                  </Heading>
                </HStack>
              ) : (
                i18n.t(LocalizationKey.SIGNIN)
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
          <Text style={{ ...styles.bottomText, color: Colors.TEXT }}>
            {i18n.t(LocalizationKey.NOT_HAS_AN_ACCOUNT)} ?
          </Text>
          <Text
            style={{ ...styles.bottomText, color: Colors.PRIMARY }}
            onPress={() => onNavigate(RootScreens.REGISTER)}
          >
            {i18n.t(LocalizationKey.SIGNUP)}
          </Text>
        </View>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={!!error}
        onRequestClose={() => {
          setError("");
        }}
      >
        <View style={styles.centerModal}>
          <View
            style={{
              ...styles.modalView,
              ...Platform.select({
                ios: { ...styles.iosShadow },
                android: { ...styles.androidShadow },
              }),
            }}
          >
            <Text>{error}</Text>
            <Pressable style={styles.modalButton} onPress={() => setError("")}>
              <Text style={{ color: "#fff", textAlign: "center" }}>
                Đã hiểu
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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
    display: "flex",
    justifyContent: "space-between",
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

  centerModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },

  modalView: {
    backgroundColor: Colors.WHITE,
    width: "80%",
    display: "flex",
    alignItems: "center",
    borderRadius: 16,
    padding: 16,
  },

  iosShadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 40 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
  },

  androidShadow: {
    elevation: 16,
  },

  modalButton: {
    backgroundColor: Colors.ERROR,
    borderRadius: 16,
    display: "flex",
    marginTop: 8,
    padding: 4,
    width: "80%",
    alignItems: "center",
  },
});
