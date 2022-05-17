import { NavigationRouteContext } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";

const NavButton = ({ text, navigator, destination, importedStyle, picture = require("../assets/templateCircular.png")}) => {
  return (
    <TouchableOpacity
      style={importedStyle}
      onPress={() => {
        navigator.navigate(destination);
      }}
    >
    <Image source={picture}/>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};
export default NavButton;

const styles = StyleSheet.create({
  buttonText: {
    fontFamily: 'Roboto',
    fontSize: 20,
    color: "white",
    position: "absolute",
    textAlign: "center",
    alignSelf: "center",
  },
  buttonBody: {
    width: 125,
    // backgroundColor: "black",
    // padding: 5,
    position: "absolute",
    left: Dimensions.get("window").width / 2 - 125 / 2,
    top: Dimensions.get("window").height / 1.5,
  },
});
