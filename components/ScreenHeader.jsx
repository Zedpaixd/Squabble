import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { CORRECT, PRESENT, ABSENT } from "../constants/gameConstants";
const ScreenHeader = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleP}>Sq</Text>
      <Text style={styles.titleC}>ua</Text>
      <Text style={styles.titleA}>bb</Text>
      <Text style={styles.titleC}>le</Text>
    </View>
  );
};
const title = {
  fontWeight: "bold",
  fontSize: 32,
};
const styles = StyleSheet.create({
  container: {
    borderBottomColor: "white",
    borderBottomWidth: 1,
    marginTop: 10,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },

  titleC: {
    ...title,
    color: CORRECT,
  },
  titleP: {
    ...title,
    color: PRESENT,
  },
  titleA: {
    ...title,
    color: ABSENT,
  },
  subtitle: {
    color: "#91e5f6",
    fontWeight: "300",
    fontSize: 10,
  },
});

export default ScreenHeader;
