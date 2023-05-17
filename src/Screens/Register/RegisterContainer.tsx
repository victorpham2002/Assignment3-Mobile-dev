import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Register } from "./Retgister";
import { RootStackParamList } from "@/Navigation";
import { RootScreens } from "..";

type LoginScreenNavigatorProps = NativeStackScreenProps<
  RootStackParamList
>;

const ResgisterContainer = ({ navigation }: LoginScreenNavigatorProps) => {
  const onNavigate = (screen: RootScreens) => {
    navigation.navigate(screen);
  };
  return <Register isLoading={false} onNavigate={onNavigate} />;
};

export default ResgisterContainer