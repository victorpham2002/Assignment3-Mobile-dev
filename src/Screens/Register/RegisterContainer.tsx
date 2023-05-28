import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/Navigation";
import { RootScreens } from "..";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/Hooks/redux";
import { useRegisterMutation } from "@/Services";
import { RootState } from "@/Store";
import { Register } from "./Retgister";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { LocalizationKey, i18n } from "@/Localization";

type LoginScreenNavigatorProps = NativeStackScreenProps<RootStackParamList>;

const RegisterContainer = ({ navigation }: LoginScreenNavigatorProps) => {  
  const {user} = useAppSelector((state: RootState)  => ({...state}))
  const [inputError, setInputError] = useState<string>("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fetchOne, { data, isLoading, error, isSuccess }] = useRegisterMutation();

  const onNavigate = (screen: RootScreens) => {
    navigation.navigate(screen);
  };

  const handleRegister = async (username: string, password: string, confirmPassword: string) => {
    let regex = /^[A-Za-z0-9]+$/;
    username = username.trim()
    password = password.trim()
    confirmPassword = confirmPassword.trim()
    if (!username) {
      setInputError(i18n.translate(LocalizationKey.USERNAME_REQUIRED));
    } else if (!password) {
      setInputError(i18n.translate(LocalizationKey.PASSWORD_REQUIRED));
    } else if (!confirmPassword) {
      setInputError(i18n.translate(LocalizationKey.CONFIRMPASS_REQUIRED));
    } else if (username.length < 3 || username.length >= 20) {
      setInputError(i18n.translate(LocalizationKey.INVALID_USERNAME_LENGTH));
    } else if(!regex.test(username)) {
      setInputError(i18n.translate(LocalizationKey.INVALID_USERNAME));
    }else if (password.length < 6) {
      setInputError(i18n.translate(LocalizationKey.INVALID_PASSWORD));
    } else if (password != confirmPassword) {
      setInputError(i18n.translate(LocalizationKey.PASSWORD_NOT_MATCH));
    } else {
      fetchOne({username, password})
    }
  };

  useEffect(() => {
    if (error) {
      console.log("error: ", error)
      const fetchError = error as FetchBaseQueryError;
      if (typeof fetchError.data === 'object' && fetchError.data !== null && 'message' in fetchError.data) {
        setInputError(fetchError.data.message as string);
      } else {
        setInputError("Faild to register. Please try again")
      }
    } else if (isSuccess) {
      console.log(data)
    }
  }, [error, data, fetchOne])


  return (
    <Register
      isLoading={isLoading || user.loading}
      error={inputError}
      setError={setInputError}
      password = {password}
      setPassword ={setPassword}
      confirmPassword={confirmPassword}
      setConfirmPassword={setConfirmPassword}
      userName = {userName}
      setUserName = {setUserName}
      onNavigate={onNavigate}
      isRegisterSuccess={isSuccess}

      onLoginButtonPress={() =>
        handleRegister(userName, password, confirmPassword)
      }
    />
  );
};

export default RegisterContainer;
  