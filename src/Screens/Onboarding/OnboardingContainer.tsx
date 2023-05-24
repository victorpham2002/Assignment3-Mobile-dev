import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { OnboardingScreen } from "./Onboarding";
import { RootStackParamList } from "@/Navigation";
import { RootScreens } from "..";


type OnboardingScreenNavigatorProps = NativeStackScreenProps<
  RootStackParamList
>;

const OnboardingContainer = ({ navigation }: OnboardingScreenNavigatorProps) => {
  const onNavigate = (screen: RootScreens) => {
    navigation.navigate(screen as any);
  };
  return <OnboardingScreen isLoading={false} onNavigate={onNavigate} />;
};

export default OnboardingContainer