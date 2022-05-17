import { StatusBar } from "expo-status-bar";
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Button,
  ImageBackground,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useLayoutEffect, useEffect } from "react";
import NavigationButton from "../components/NavigationButton";

const getConfig = async () => {
  try {
    const boxes = await AsyncStorage.getItem("boxesVal");
    const attempts = await AsyncStorage.getItem("attemptsVal");
    const treatGreenAsYellow = await AsyncStorage.getItem(
      "treatGreenAsYellowVal"
    );
    return {
      boxes: boxes != null ? parseInt(boxes) : null,
      attempts: attempts != null ? parseInt(attempts) : null,
      treatGreenAsYellow:
        treatGreenAsYellow != null ? parseInt(treatGreenAsYellow) : null,
    };
  } catch (error) {
    console.log("🚀 ~ file: Options.js ~ line 21 ~ getConfig ~ error", error);
  }
};

const setConfig = async (boxes, attempts, treatGreenAsYellow) => {
  try {
    if (boxes !== undefined && boxes !== null)
      await AsyncStorage.setItem("boxesVal", boxes.toString());
    if (attempts !== undefined && attempts !== null)
      await AsyncStorage.setItem("attemptsVal", attempts.toString());
    if (treatGreenAsYellow !== undefined && treatGreenAsYellow !== null)
      await AsyncStorage.setItem(
        "treatGreenAsYellowVal",
        treatGreenAsYellow.toString()
      );
  } catch (error) {
    console.log("🚀 ~ file: Options.js ~ line 33 ~ setConfig ~ error", error);
  }
};

export default function MainScreen({ navigation }) {
  const [boxes, setBoxes] = useState(4);
  const [attempts, setAttempts] = useState(2);
  const [treatGreenAsYellow, setTreatGreenAsYellow] = useState(0);

  useLayoutEffect(() => {
    getConfig()
      .then((config) => {
        setBoxes(config.boxes == null ? 5 : config.boxes);
        setAttempts(config.attempts == null ? 3 : config.attempts);
        setTreatGreenAsYellow(
          config.treatGreenAsYellow == null ? 1 : config.treatGreenAsYellow
        );
      })
      .catch((err) => {
        console.log(
          "🚀 ~ file: Options.js ~ line 34 ~ useLayoutEffect ~ err",
          err
        );
      });
  }, []);

  useEffect(() => {
    setConfig(boxes, attempts, treatGreenAsYellow).catch((err) => {
      console.log("🚀 ~ file: Options.js ~ line 57 ~ useEffect ~ err", err);
    });
  }, [boxes, attempts, treatGreenAsYellow]);

  const incrementVar = (varToIncrement, incrementer, lowBound, highBound) => {
    incrementer(varToIncrement + 1);
    if (varToIncrement >= highBound) incrementer(lowBound);
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require("../assets/MsBG.jpg")} resizeMode="stretch" style={styles.BGcontainer}>
      <Text
        style={{
          color: "white",
          fontSize: 45,
          position: "absolute",
          left: Dimensions.get("window").width / 2 - 150/2,
          top: Dimensions.get("window").height / 15,
        }}
      >
        Options
      </Text>

      <TouchableOpacity
        title="Set Boxes"
        onPress={() => incrementVar(boxes, setBoxes, 4, 7)}
        style={{
          width: 195,
          position: "absolute",
          left: Dimensions.get("window").width / 5 - 125 / 2,
          top: Dimensions.get("window").height / 3,
        }}
      >
        <Image source={require("../assets/SetBoxes.png")} />
      </TouchableOpacity>

      <Text
        style={{
          fontSize: 25,
          color: "white",
          position: "absolute",
          left: Dimensions.get("window").width / 1.3,
          top: Dimensions.get("window").height / 2.75,
        }}
      >
        {boxes}
      </Text>

      <TouchableOpacity
        title="Set Attempts"
        style={{
          width: 125,
          position: "absolute",
          left: Dimensions.get("window").width / 5 - 125 / 2,
          top: Dimensions.get("window").height / 2.1,
        }}
        onPress={() => incrementVar(attempts, setAttempts, 2, 7)}
      >
        <Image source={require("../assets/SetAttempts.png")} />
      </TouchableOpacity>
      <Text
        style={{
          fontSize: 25,
          color: "white",
          position: "absolute",
          left: Dimensions.get("window").width / 1.3,
          top: Dimensions.get("window").height / 1.95,
        }}
      >{attempts}</Text>

      <TouchableOpacity
        title="Green as Yellow toggle"
        style={{
          width: 125,
          position: "absolute",
          left: Dimensions.get("window").width / 5 - 125 / 2,
          top: Dimensions.get("window").height / 1.60,
        }}
        onPress={() =>
          incrementVar(treatGreenAsYellow, setTreatGreenAsYellow, 0, 1)
        }
      >
      <Image source={require("../assets/ToggleGreenAsYellow.png")} />
      </TouchableOpacity>
      <Text
        style={{
          fontSize: 25,
          color: "white",
          position: "absolute",
          left: Dimensions.get("window").width / 1.3,
          top: Dimensions.get("window").height / 1.50,
        }}
      >{treatGreenAsYellow}</Text>

      <StatusBar style="auto" />
      <NavigationButton
        text="Previous Screen"
        importedStyle={{
          width: 125,
          // backgroundColor: 'black',
          // padding: 5,
          position: "absolute",
          left: Dimensions.get("window").width / 2 - 125 / 2,
          top: Dimensions.get("window").height / 1.2,
        }}
        navigator={navigation}
        destination="MainScreen"
      />
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
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
