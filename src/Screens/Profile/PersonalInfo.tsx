import Header from "@/Components/Header/Header";
import { Colors, FontSize } from "@/Theme/Variables";
import { Button, TouchableOpacity } from "react-native";
import { Image } from "react-native";
import { View, Text, StyleSheet } from "react-native";
import MuiIcons from "@expo/vector-icons/MaterialIcons";
import { MyButton } from "@/Components/CustomButton";
import { OptionItem } from "@/Components/ProfileOptionItem";
import { FloatingInput } from "@/Components/FloatingInput";
import { getUserInAsyncStorage } from "@/Helper";
import { useEffect, useState } from "react";
import { TextInput } from "react-native-paper";
import { CustomAlert } from "@/Components/CusomAlert";
import { LocalizationKey, i18n } from "@/Localization";
import { useAppDispatch } from "@/Hooks/redux";
import { HStack, Heading, Spinner } from "native-base";
import { updateUserInfo } from "@/Store/reducers/user";

export interface IPersonalInfoProps {
  user: any;
  onReturn: any;
}
export const PersonalInfo = (props: IPersonalInfoProps) => {
  const { user } = props;
  const [accoutType, setAccoutType] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [inputError, setInputError] = useState("");
  // const [fetchOne, {data, isError, isSuccess, error }] = useUpdateUserMutation();
  const dispatch = useAppDispatch();

  const handleCancel = () => {
    setName(user.name);
    setEmail(user.email);
    setPhone(user.phone);
    setEditMode(false);
  };

  const handleChangeInfo = (name: string, email: string, phone: string) => {
    name = name.trim();
    email = email.trim();
    phone = phone.trim();

    const email_regex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!email_regex.test(email)) {
      setInputError("Email không hợp lệ!");
    } else if (phone.length < 10 || phone.length > 12) {
      setInputError("Số điện thoại không hợp lệ!");
    } else {
      // call api
      console.log(name, phone, email);

      getUserInAsyncStorage().then((res) => {
        if (res) {
          dispatch(updateUserInfo({
            token: res.access_token,
            id: user.id,
            info: { name, phone, email },
          })).then(res => props.onReturn())
        }
      });
    }
  };

  useEffect(() => {
    getUserInAsyncStorage().then((user) => {
      if (user) {
        setAccoutType(user.type);
      }
    });
  }, []);

  // useEffect(() => {
  //   if (error) {
  //     console.log("error: ", error)
  //     const fetchError = error as FetchBaseQueryError;
  //     if (typeof fetchError.data === 'object' && fetchError.data !== null && 'message' in fetchError.data) {
  //       setInputError(fetchError.data.message as string);
  //     } 
  //   } else if (data && data.data) {
  //     dispatch(updateUser(data.data))
  //   }
  // }, [error, data, fetchOne])
  return (
    <View style={styles.container}>
      {accoutType === "google" || accoutType === "facebook" ? (
        <View style={{ flex: 1, position: "relative", height: "100%" }}>
          <FloatingInput
            style={{ marginVertical: 0 }}
            label="Tên"
            value={user.name}
            onChangeText={() => {}}
            disabled
          />
          <FloatingInput
            style={{ marginVertical: 0 }}
            label="Email"
            value={user.email}
            onChangeText={() => {}}
            disabled
          />
          <FloatingInput
            style={{ marginVertical: 0 }}
            label="Số điện thoại"
            value={user.phone || "Chưa có"}
            onChangeText={() => {}}
            disabled
          />

          <Text
            style={{
              textAlign: "center",
              marginVertical: 8,
              color: Colors.SUCCESS,
              fontWeight: "500",
            }}
          >
            Bạn hiện đang đăng nhập bằng tài khoản{" "}
            {accoutType === "google" ? "Google" : "Facebook"}
          </Text>

          <MyButton
            buttonStyle={{
              position: "absolute",
              bottom: 16,
              width: "100%",
              borderRadius: 8,
            }}
            title={"Trở về"}
            buttonColor={Colors.PRIMARY}
            onPress={props.onReturn}
          />
        </View>
      ) : user.loading ? (
        <HStack space={2} justifyContent="center">
          <Spinner accessibilityLabel="Loading posts" />
          <Heading color="primary.500" fontSize="md">
            {i18n.t(LocalizationKey.LOADING)}
          </Heading>
        </HStack>
      ) : (
        <View
          style={{
            display: "flex",
            justifyContent: "space-between",
            height: "100%",
          }}
        >
          <View>
            <FloatingInput
              style={{ marginVertical: 0 }}
              label="Tên đăng nhập"
              value={user.username}
              onChangeText={() => {}}
              disabled
            />
            <FloatingInput
              style={{ marginVertical: 0 }}
              label="Tên"
              value={name}
              onChangeText={(value) => {
                setName(value);
              }}
              disabled={!editMode}
            />

            <FloatingInput
              style={{ marginVertical: 0 }}
              label="Email"
              value={email}
              onChangeText={(value) => {
                setEmail(value);
              }}
              disabled={!editMode}
            />

            <FloatingInput
              style={{ marginVertical: 0 }}
              label="Số điện thoại"
              value={phone}
              keyboardType="numeric"
              onChangeText={(value) => {
                setPhone(value);
              }}
              disabled={!editMode}
            />
          </View>

          <View
            style={{
              width: "100%",
              borderRadius: 8,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 16,
            }}
          >
            <MyButton
              buttonStyle={{ borderRadius: 8, width: "45%" }}
              title={!editMode ? "Trở về" : "Huỷ bỏ"}
              buttonColor={Colors.PRIMARY}
              onPress={!editMode ? props.onReturn : handleCancel}
            />

            <MyButton
              buttonStyle={{ borderRadius: 8, width: "45%" }}
              title={!editMode ? "Chỉnh sửa" : "Lưu thay đổi"}
              buttonColor={Colors.PRIMARY}
              onPress={
                !editMode
                  ? () => setEditMode(true)
                  : () => handleChangeInfo(name, email, phone)
              }
            />
          </View>

          <CustomAlert
            displayMode="warning"
            displayMsg={inputError}
            visibility={!!inputError}
            handleDismiss={() => setInputError("")}
          />
          {/* <CustomAlert
            displayMode="success"
            displayMsg={"Cập nhật thành công"}
            visibility={!!isSuccess}
            handleDismiss={() => {props.onReturn()}}
            buttonTitle="OK"
          /> */}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    width: "100%",
    height: "100%",
    flex: 1,
  },
})
