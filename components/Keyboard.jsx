import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";


export const SpecialKeyboardKeys = {
  DELETE: "delete",
  GUESS: "guess",
};

const keySequence = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M"],
  [SpecialKeyboardKeys.DELETE, SpecialKeyboardKeys.GUESS],
];

const Keyboard = (props) => {
  // eslint-disable-next-line react/prop-types
  const { onKeyPress, disabledKeyList } = props;

  return (
    <>
      {keySequence.map((row, rowIndex) => {
        return (
          <View key={"key-row-" + rowIndex} style={styles.row}>
            {row.map((key) => {
              // eslint-disable-next-line react/prop-types
              const isDisabled = disabledKeyList.includes(key);
              return (
                <Pressable
                  key={key}
                  disabled={isDisabled}
                  onPress={() => onKeyPress(key)}
                >
                  <View
                    style={[styles.cell, isDisabled && styles.cellDisabled]}
                  >
                    <Text
                      style={[styles.text, isDisabled && styles.textDisabled]}
                    >
                      {key}
                    </Text>
                  </View>
                </Pressable>
              );
            })}
          </View>
        );
      })}
    </>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginBottom: 5,
  },
  cell: {
    padding: 10,
    paddingHorizontal: 10,
    margin: 3.5,
    borderRadius: 8,
    backgroundColor: "#818384",
  },
  cellDisabled: {
    backgroundColor: "#565758",
  },
  text: {
    color: "white",
    fontSize: 16,
  },
  textDisabled: {
  },
});

export default Keyboard;
