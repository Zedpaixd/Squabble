/* eslint-disable react/prop-types */
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { CORRECT, PRESENT, ABSENT } from "../constants/gameConstants";
export const TextBlockState = {
  GUESS: "guess",
  CORRECT: "correct",
  POSSIBLE: "possible",
  INCORRECT: "incorrect",
};

const ColorMap = {
  [TextBlockState.GUESS]: "transparent",
  [TextBlockState.CORRECT]: CORRECT,
  [TextBlockState.POSSIBLE]: PRESENT,
  [TextBlockState.INCORRECT]: ABSENT,
};

const TextBlock = (props) => {
  // eslint-disable-next-line react/prop-types
  const { text, state } = props;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: ColorMap[state],
        },
      ]}
    >
      <Text style={styles.text}>
        {
          text.toUpperCase()
        }
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 45,
    borderWidth: 0.4,
    borderColor: "#565758",
    alignItems: "center",
    margin: 1,
    justifyContent: "center",
  },
  text: {
    fontSize: 25,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default TextBlock;
