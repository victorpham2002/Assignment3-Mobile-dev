import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Login } from "./Login";
import { RootStackParamList } from "@/Navigation";
import { RootScreens } from "..";

type LoginScreenNavigatorProps = NativeStackScreenProps<
  RootStackParamList
>;

const LoginContainer = ({ navigation }: LoginScreenNavigatorProps) => {
  const onNavigate = (screen: RootScreens) => {
    navigation.navigate(screen as any);
  };
  return <Login isLoading={false} onNavigate={onNavigate} />;
};

export default LoginContainer
