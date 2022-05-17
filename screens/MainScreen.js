import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Text, View, TouchableOpacity, ImageBackground, Dimensions } from "react-native";
import NavButton from "../components/NavigationButton";
import ExitButton from "../components/ExitButton";

// const bg = {uri:"../assets/MsBG.jpg"}
const bg = require("../assets/MsBG.jpg")

export default function Starting({ navigation }) {
  return (
    <View style={styles.container}>
      <ImageBackground source={require("../assets/MsBG.jpg")} resizeMode="stretch" style={styles.BGcontainer}>
        <Text style={{ color: "red", fontSize: 30 }}>
          Squabble
        </Text>
        <Text style={{ color: "green", fontSize: 30 }}>
          Balint Armand Alexandru
        </Text>
        <StatusBar style="auto" />
        <NavButton
          importedStyle={{
            width:125,
            // backgroundColor: 'black',
            // padding: 5,
            position: 'absolute',
            left: Dimensions.get("window").width / 2 - 125 / 2,
            top: Dimensions.get("window").height / 1.5,
          }}
          text=""
          picture = {require("../assets/play.png")}
          navigator={navigation}
          destination="Game"
        />
        <NavButton
          importedStyle={{
            width:125,
            // backgroundColor: 'black',
            // padding: 5,
            position: 'absolute',
            left: Dimensions.get("window").width / 2 - 125 / 2,
            top: Dimensions.get("window").height / 1.30,
          }}
          text=""
          picture = {require("../assets/options.png")}
          navigator={navigation}
          destination="Options"
          >
          </NavButton>
          
        <ExitButton
          importedStyle={{
            width:125,
            // backgroundColor: 'black',
            // padding: 5,
            position: 'absolute',
            left: Dimensions.get("window").width / 2 - 125 / 2,
            top: Dimensions.get("window").height / 1.15,
          }}
          text=""
          picture = {require("../assets/exit.png")}
          >

          </ExitButton>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  BGcontainer: {
    flex:1,
    justifyContent: "center",
    alignItems: "center",
  }

});
