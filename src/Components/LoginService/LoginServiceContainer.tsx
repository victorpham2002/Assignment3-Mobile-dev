import LoginService from "./LoginService";
import * as Google from 'expo-auth-session/providers/google';
import * as Facebook from 'expo-auth-session/providers/facebook';
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppDispatch } from "@/Hooks/redux";
import { getFacebookUser, getGoogleUser } from "@/Store/reducers/user";

const LoginServiceContainer = () => {
  const [token,setToken] = useState<string | undefined | null>(null)
  const dispatch = useAppDispatch()
  const [G_request, G_response, G_promptAsync] = Google.useAuthRequest({
    expoClientId: '87708822761-1e8i4j24cijvl9ps01betl58i3oaouof.apps.googleusercontent.com',
    iosClientId: '87708822761-0cve8rtfi87umfv85do50e8802kbmai7.apps.googleusercontent.com',
    androidClientId: '87708822761-k19an4j7t9toi34509bspgdhbmbr3qlp.apps.googleusercontent.com',
  });

  const [F_request, F_response, F_promptAsync] = Facebook.useAuthRequest({
    clientId: "587952573481521",
  })

  const storeAccessToken = async (token: string, type: string) => {
    if (token) {
      await AsyncStorage.setItem("user", JSON.stringify({access_token: token, type, username: ""}))
      setToken(token)
      type === "google" ? dispatch(getGoogleUser(token)) : dispatch(getFacebookUser(token))
    }
  }

  useEffect(() => {
    if (G_response?.type === 'success') {
      const { authentication } = G_response;
      if (authentication?.accessToken) {
        storeAccessToken(authentication.accessToken, "google")
      }
    }
  }, [G_response]);

  useEffect(() => {
    if (F_response && F_response.type === "success" && F_response.authentication) {
      storeAccessToken(F_response.authentication.accessToken, "facebook" )
    }
  }, [F_response]);

  return (
      <LoginService onLoginWithSocial={(type: string) => !token && (type === "google" ? G_promptAsync() : F_promptAsync()) }/>
  );
};

export default LoginServiceContainer ;
