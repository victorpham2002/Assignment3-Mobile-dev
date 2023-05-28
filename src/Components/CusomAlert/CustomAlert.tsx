
import { Modal, Text, View, TouchableOpacity } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Colors } from "@/Theme/Variables";

export interface ICustomAlertProps {
  displayMode: string;
  displayMsg: string;
  visibility: boolean;
  handleDismiss: any;
  buttonTitle?: string
}
export default function CustomAlert(props: ICustomAlertProps) {
  const { displayMode, displayMsg, visibility, handleDismiss, buttonTitle = "OK" } = props;
  return (
    <View>
      <Modal
        visible={visibility}
        animationType={"fade"}
        transparent={true}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(52, 52, 52, 0.8)",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              alignItems: "center",
              backgroundColor: "white",
              width: "90%",
              borderWidth: 1,
              borderColor: "#fff",
              borderRadius: 16,
              elevation: 10,
            }}
          >
            <View style={{ alignItems: "center", margin: 10 }}>
              {displayMode == "success" ? (
                <>
                  <Ionicons
                    name="checkmark-done-circle"
                    color={"green"}
                    size={80}
                  />
                </>
              ) : (
                <>
                  <MaterialIcons name="cancel" color={"red"} size={80} />
                </>
              )}
              <Text style={{ fontSize: 18, marginTop: 5, textAlign: 'center' }}>{displayMsg}</Text>
            </View>

            <TouchableOpacity
              activeOpacity={0.9}
              onPress={handleDismiss}
              style={{
                width: "80%",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: displayMode === "success" ? Colors.PRIMARY: Colors.ERROR,
                borderColor: "#ddd",
                borderBottomWidth: 0,
                borderRadius: 8,
                bottom: 0,
                marginVertical: 20,
              }}
            >
              <Text style={{ color: "white", margin: 15 }}>{buttonTitle}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
