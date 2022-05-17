import { NavigationRouteContext } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  BackHandler,
} from "react-native";

const ExitButton = ({ text, importedStyle, picture = require("../assets/templateCircular.png")}) => {
    return (
      <TouchableOpacity
        style={importedStyle}
        onPress={() => {
            BackHandler.exitApp();
        }}
      >
      <Image source={picture}/>
        <Text style={styles.buttonText}>{text}</Text>
      </TouchableOpacity>
    );
  };
export default ExitButton;


const styles = StyleSheet.create({
    buttonText: {
      fontFamily: 'Roboto',
      fontSize: 20,
      color: "white",
      position: "absolute",
      textAlign: "center",
      alignSelf: "center",
    }
});