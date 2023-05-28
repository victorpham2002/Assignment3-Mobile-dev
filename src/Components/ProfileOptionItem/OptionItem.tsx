import { StyleSheet, Text, TouchableOpacity } from "react-native";
import MuiIcons from "@expo/vector-icons/MaterialIcons";
import { Colors, FontSize } from "@/Theme/Variables";

export interface IOptionItemProps {
  muiIconName: any;
  title: string;
  backgroundColor?: string;
  color?: string;
  onPress?: any;
}
export const OptionItem = (props: IOptionItemProps) => {
  return (
    <TouchableOpacity
      style={{
        ...styles.optionItem,
        backgroundColor: props.backgroundColor || "transparent",
      }}
      onPress={props.onPress}
    >
      <MuiIcons
        name={props.muiIconName}
        size={FontSize.REGULAR}
        style={{ marginRight: 16 }}
        color={props.color}
      />
      <Text style={{ fontSize: 18 }}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  optionItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomColor: Colors.SECONDARY,
    borderStyle: "solid",
    borderBottomWidth: 1,
    // backgroundColor: Colors.WHITE,
    borderRadius: 16,
  },
});

export default OptionItem;
