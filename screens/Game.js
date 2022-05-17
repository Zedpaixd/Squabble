import React from "react";
import ScreenHeader from "../components/ScreenHeader";
import Game from "../components/Game";
import { backgroundColor } from "../constants/themeColors";
import { SafeAreaView, StyleSheet } from "react-native";
export default function GameScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader />
      <Game />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgroundColor,
  },
});
