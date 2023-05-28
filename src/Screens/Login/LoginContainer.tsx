import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Login } from "./Login";
import { RootStackParamList } from "@/Navigation";
import { RootScreens } from "..";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/Hooks/redux";
import { useLoginMutation } from "@/Services";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUserDB } from "@/Store/reducers/user";
import { RootState } from "@/Store";
import { storeAsyncStorage } from "@/Helper";
import { LocalizationKey, i18n } from "@/Localization";

type LoginScreenNavigatorProps = NativeStackScreenProps<RootStackParamList>;

const LoginContainer = ({ navigation }: LoginScreenNavigatorProps) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state: RootState) => ({ ...state }));
  const [inputError, setInputError] = useState<string>("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const [fetchOne, { data, isLoading, error }] = useLoginMutation();

  const onNavigate = (screen: RootScreens) => {
    navigation.navigate(screen);
  };

  const isValidUserName = (username: string): boolean => {
    let regex = /^[A-Za-z0-9]+$/;
    return username.length >= 7 && regex.test(username);
  };

  const handleLogin = async (username: string, password: string) => {
    if (!username) {
      setInputError(i18n.translate(LocalizationKey.USERNAME_REQUIRED));
    } else if (!password) {
      setInputError(i18n.translate(LocalizationKey.PASSWORD_REQUIRED));
    } else {
      fetchOne({ username, password });
    }
  };

  const getUsernameAS = async () => {
    return await AsyncStorage.getItem('username')
  }

  useEffect(() => {
    if (error) {
      console.log(error);
      setInputError(i18n.translate(LocalizationKey.INVALID_LOGIN_INFO));
    } else if (data) {
      if (data.access_token) {
        storeAsyncStorage("user", {
          access_token: data.access_token,
          username: userName,
          type: "db",
        });
        dispatch(getUserDB({ token: data.access_token, username: userName }));
      }
    }
  }, [error, data]);

  useEffect(() => {
    getUsernameAS().then(username => {
      if(username) {
        setUserName(JSON.parse(username))
      }
    })
  }, [])
  return (
    <Login
      isLoading={isLoading || user.loading}
      error={inputError}
      setError={setInputError}
      password={password}
      setPassword={setPassword}
      userName={userName}
      setUserName={setUserName}
      onNavigate={onNavigate}
      onLoginButtonPress={() => handleLogin(userName, password)}
    />
  );
};

export default LoginContainer;
