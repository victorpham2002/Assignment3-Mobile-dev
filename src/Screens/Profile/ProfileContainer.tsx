import { RootStackParamList } from "@/Navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Profile } from "./Profile";
import { useAppDispatch, useAppSelector } from "@/Hooks/redux";
import { RootState } from "@/Store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { logout } from "@/Store/reducers/user";
import { RootScreens } from "..";
import { useState } from "react";
type ProfileScreenNavigatorProps = NativeStackScreenProps<RootStackParamList>;

const ProfileContainer = ({ navigation }: ProfileScreenNavigatorProps) => {
  const { user } = useAppSelector((state: RootState) => ({ ...state }));
  const dispatch = useAppDispatch();
  const [screen, setScreen] = useState("");

  const handleLogout = async () => {
    await AsyncStorage.removeItem("user");
    dispatch(logout());
  };

  return (
    <Profile
      user={user}
      logout={handleLogout}
      screen={screen}
      setScreen={(screen: string) => setScreen(screen)}
    />
  );
};

export default ProfileContainer;
