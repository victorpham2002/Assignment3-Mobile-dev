import { i18n, LocalizationKey } from "@/Localization";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  Image,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { HStack, Spinner, Heading } from "native-base";
import { User } from "@/Services";
import Header from "@/Components/Header/Header";
import { Colors } from "@/Theme/Variables";
import MuiIcons from "@expo/vector-icons/MaterialIcons";
import { TextInput } from "react-native";
import MapView from 'react-native-maps';

export interface IHomeProps {
  data: User | undefined;
  isLoading: boolean;
}

export const Home = (props: IHomeProps) => {
  const { data, isLoading } = props;
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {isLoading ? (
        <HStack space={2} justifyContent="center">
          <Spinner accessibilityLabel="Loading posts" />
          <Heading color="primary.500" fontSize="md">
            {i18n.t(LocalizationKey.LOADING)}
          </Heading>
        </HStack>
      ) : (
        <React.Fragment>
          <Header
            title={i18n.t(LocalizationKey.HOME)}
            LeftIcon={<MuiIcons name="menu" size={28} color={Colors.WHITE} />}
            RightIcon={
              <MuiIcons name="person" size={28} color={Colors.WHITE} />
            }
          />

          <View style={styles.content}>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: 10.88063531088379,
                longitude:  106.80765799339738,
                latitudeDelta: 0.0942,
                longitudeDelta: 0.042,
              }}
              zoomEnabled={true}
              zoomControlEnabled={true}

            />
            <View style={styles.inputTextContainer}>
              <TextInput
                placeholderTextColor="#C6C6C6"
                placeholder="Tìm kiếm địa điểm"
                style={{
                  ...styles.inputText,
                  ...Platform.select({
                    ios: { ...styles.iosShadow },
                    android: { ...styles.androidShadow },
                  }),
                }}
              />
              <MuiIcons
                style={styles.searchIcon}
                name="search"
                color="#C6C6C6"
                size={24}
              />
            </View>
            <View style={styles.optionContainer}>
              <View
                style={{
                  ...styles.option,
                  ...Platform.select({
                    ios: { ...styles.iosShadow },
                    android: { ...styles.androidShadow },
                  }),
                }}
              >
                <Image source={require("../../../assets/buses.png")} />
                <Text style={{ marginTop: 12, color: Colors.PRIMARY }}>
                  Tra cứu
                </Text>
              </View>
              <View
                style={{
                  ...styles.option,
                  ...Platform.select({
                    ios: { ...styles.iosShadow },
                    android: { ...styles.androidShadow },
                  }),
                }}
              >
                <Image source={require("../../../assets/routes.png")} />
                <Text style={{ marginTop: 12, color: Colors.PRIMARY }}>
                  Tìm đường
                </Text>
              </View>
            </View>
          </View>
        </React.Fragment>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: Colors.PRIMARY,
    alignItems: "center",
  },

  content: {
    backgroundColor: Colors.WHITE,
    flex: 1,
    width: "100%",
    paddingHorizontal: 16,
    paddingBottom: 32,
    paddingTop: 16,
    justifyContent: 'space-between'
  },
  inputText: {
    backgroundColor: "#fff",
    fontSize: 14,
    textAlignVertical: "center",
    paddingHorizontal: 40,
    paddingVertical: 8,
    height: 40,
    borderRadius: 8,
  },
  inputTextContainer: {
    position: "relative",
    zIndex: 2
  },
  optionContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    zIndex: 2
  },
  option: {
    backgroundColor: "#fff",
    width: "45%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 32,
    borderRadius: 8,
  },

  searchIcon: {
    position: "absolute",
    top: 8,
    left: 12,
  },

  iosShadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 40 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
  },

  androidShadow: {
    elevation: 4,
  },

  map: {
    zIndex: 1,
    ...StyleSheet.absoluteFillObject,
  },
});
