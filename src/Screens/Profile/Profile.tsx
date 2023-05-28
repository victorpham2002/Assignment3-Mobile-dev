import Header from "@/Components/Header/Header";
import { Colors, FontSize } from "@/Theme/Variables";
import { Button, TouchableOpacity } from "react-native";
import { Image } from "react-native";
import { View, Text, StyleSheet } from "react-native";
import MuiIcons from "@expo/vector-icons/MaterialIcons";
import { MyButton } from "@/Components/CustomButton";
import { OptionItem } from "@/Components/ProfileOptionItem";
import { PersonalInfo } from "./PersonalInfo";

export interface IProfileProps {
  user: any;
  logout: any;
  screen: string;
  setScreen: any;
}
export const Profile = (props: IProfileProps) => {
  const { user, logout, screen, setScreen } = props;
  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Image
          style={styles.avatar}
          source={{
            uri:
              user.picture ||
              "https://tinhdaunhuy.com/wp-content/uploads/2015/08/default-avatar.jpg",
          }}
        />
      </View>

      <View style={styles.body}>
        <Text style={styles.username}>{user.name || user.username}</Text>
        {screen === "info" ? (
          <PersonalInfo user={user} onReturn={() => setScreen("")}/>
        ) : (
          <View style={{ width: "100%" }}>
            <MyButton
              title="Thông tin cá nhân"
              buttonColor={Colors.PRIMARY}
              buttonStyle={styles.button}
              onPress={() => setScreen("info")}
            />
            <View style={styles.optionContainer}>
              <OptionItem
                title="Cài đặt"
                muiIconName="settings"
                color={Colors.PRIMARY}
              />
              <OptionItem
                title="Chọn khu vực"
                muiIconName="add-location"
                color={Colors.PRIMARY}
              />
              <OptionItem
                title="Đánh giá ứng dụng"
                muiIconName="rate-review"
                color={Colors.PRIMARY}
              />
              <OptionItem
                title="Thông tin về công ty"
                muiIconName="info"
                color={Colors.PRIMARY}
              />
            </View>
            <OptionItem
              title="Đăng xuất"
              muiIconName="logout"
              backgroundColor="#fff"
              onPress={logout}
            />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.SECONDARY,
    flex: 1,
  },
  avatarContainer: {
    backgroundColor: Colors.PRIMARY,
    height: 120,
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  avatar: {
    height: 150,
    width: 150,
    transform: [{ translateY: 75 }],
    borderRadius: 1000,
    resizeMode: "contain",
    borderWidth: 4,
    borderColor: "#fff",
  },

  username: {
    fontSize: FontSize.REGULAR,
    fontWeight: "500",
    marginVertical: 16,
    textAlign: "center",
  },

  button: {
    padding: 8,
    marginBottom: 24,
    width: "100%",
    borderRadius: 8,
  },

  body: {
    marginTop: 75,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    marginHorizontal: 16,
    flex: 1
  },

  optionContainer: {
    width: "100%",
    backgroundColor: Colors.WHITE,
    marginVertical: 16,
    borderRadius: 16,
  },
});
