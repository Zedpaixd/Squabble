import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { StyleSheet, Text, View, Platform } from "react-native";
import * as Clipboard from 'expo-clipboard';
import Button from "./Button";
import Keyboard, { SpecialKeyboardKeys } from "./Keyboard";
import TextBlock, { TextBlockState } from "./TextBlock";
import { MAX_GUESSES, MAX_WORD_LEN } from "../constants/gameConstants";
import { getInitialBoard, getRandomWord, getWordleEmoji } from "../gameUtils";

const BOARD_TEMPLATE = getInitialBoard();

const Game = () => {
  const [guessList, setGuessList] = useState([]);
  const [inputWord, setInputWord] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [disabledLetters, setDisabledLetters] = useState([]);

  const wordToGuess = useRef("xxxxx");

  useEffect(() => {
    if (gameOver === false) {
      wordToGuess.current = getRandomWord();
      console.log(
        "🚀 ~ file: GameScreen.jsx ~ line 28 ~ useEffect ~ wordToGuess.current",
        wordToGuess.current
      );

      setInputWord("");
      setGuessList([]);
    }
  }, [gameOver]);

  useEffect(() => {
    const guessLen = guessList.length;
    if (guessList[guessLen - 1] === wordToGuess.current) {
      setGameOver(true);
    } else if (guessLen === MAX_GUESSES) {
      setGameOver(true);
    }
  }, [guessList]);

  useEffect(() => {
    const list = [];

    guessList.forEach((word) => {
      word.split("").forEach((letter) => {
        if (!wordToGuess.current.includes(letter)) {
          list.push(letter);
        }
      });
    });

    setDisabledLetters(list);
  }, [guessList]);

  const onKeyPress = useCallback(
    (key) => {
      if (key === SpecialKeyboardKeys.DELETE) {
        setInputWord((prev) => prev.slice(0, -1));
      } else if (key === SpecialKeyboardKeys.GUESS) {
        setGuessList((prev) => [...prev, inputWord.toUpperCase()]);
        setInputWord("");
      } else if (key.length === 1) {
        setInputWord((prev) => {
          if (prev.length < MAX_WORD_LEN && !disabledLetters.includes(key)) {
            return prev + key;
          }

          return prev;
        });
      }
    },
    [disabledLetters, inputWord]
  );

  useEffect(() => {
    if (Platform.OS === "web") {
      const callback = (event) => {
        const key = event.key;

        if (/^[A-Za-z]$/.test(key)) {
          onKeyPress(key.toUpperCase());
        } else if (key === "Enter" && inputWord.length === MAX_WORD_LEN) {
          onKeyPress(SpecialKeyboardKeys.GUESS);
        } else if (key === "Backspace") {
          onKeyPress(SpecialKeyboardKeys.DELETE);
        }
      };

      window.addEventListener("keyup", callback);
      return () => window.removeEventListener("keyup", callback);
    }
  }, [inputWord.length, onKeyPress]);

  const wordleEmoji = useMemo(() => {
    if (!gameOver) {
      return "";
    }

    return getWordleEmoji(wordToGuess.current, guessList);
  }, [gameOver, guessList]);

  return (
    <View style={styles.fg1}>
      {BOARD_TEMPLATE.map((row, rowIndex) => {
        return (
          <View key={`row-${rowIndex}`} style={styles.row}>
            {row.map((_, colIndex) => {
              const guessLetter = guessList[rowIndex]?.[colIndex];
              let state = TextBlockState.GUESS;

              if (guessLetter === undefined) {
                state = TextBlockState.GUESS;
              } else if (guessLetter === wordToGuess.current[colIndex]) {
                state = TextBlockState.CORRECT;
              } else if (wordToGuess.current.includes(guessLetter)) {
                state = TextBlockState.POSSIBLE;
              } else {
                state = TextBlockState.INCORRECT;
              }

              const letterToShow =
                rowIndex === guessList.length
                  ? inputWord[colIndex]
                  : guessLetter;

              return (
                <View style={styles.mh2} key={`col-${colIndex}`}>
                  <TextBlock text={letterToShow || ""} state={state} />
                </View>
              );
            })}
          </View>
        );
      })}

      <View style={styles.bottomContainer}>
        {gameOver ? (
          <>
          <View style={styles.alertContainer}>
            <Text
              style={[styles.textWhite, styles.mb12, { textAlign: "center" }]}
            >
              Game Over!
            </Text>
            <Text
              style={[styles.textWhite, styles.mb12, { textAlign: "center" }]}
            >
              The word was : {wordToGuess.current}
            </Text>

            <Text
              style={[styles.textWhite, { textAlign: "center"}]}
              selectable
            >
              {wordleEmoji}
            </Text>
            
            <View style={styles.buttonRow}>
              <Button 
                cta="Copy Score"
                onPress={() => Clipboard.setString(wordleEmoji)}
              />
              <View style={styles.buttonSpacer} />
              <Button cta="Play Again" onPress={() => setGameOver(false)} />
            </View>
            </View>
          </>
        ) : (
          <Keyboard
            style={styles.bottomContainer}
            disabledKeyList={[
              ...disabledLetters,
              inputWord.length !== MAX_WORD_LEN
                ? SpecialKeyboardKeys.GUESS
                : "",
            ]}
            onKeyPress={onKeyPress}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mb12: {
    marginBottom: 20,
  },
  mh2: {
    marginHorizontal: 1,
  },
  fg1: {
    flexGrow: 1,
  },
  textWhite: {
    color: "#000",
    fontSize: 20,
  },
  row: {
    marginBottom: 2,
    flexDirection: "row",
    justifyContent: "center",
  },
  bottomContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "#E3D4A8",
    // borderRadius: 35,
    // marginTop: -300,
    // marginHorizontal: 50,
  },
  alertContainer: {
    flex: 1,
    paddingTop: 35,
    // alignItems: "center",
    // justifyContent: "center",
    backgroundColor: "#E3D4A8",
    borderRadius: 50,
    marginTop: -300,
    paddingHorizontal: 35,
    marginBottom: 75,
  },
  score: {
    color: "#fff",
    fontSize: 12,
  },
  buttonRow: {
    flexDirection: "row",
    marginTop: 25,
  },
  buttonSpacer: {
    width: 24,
  },
});

export default Game;
