import fiveLetterWords from './constants/fiveLetterWords.json';
import {MAX_GUESSES} from './constants/gameConstants';

export const getInitialBoard = () => {
  const board = [];
  for (let i = 0; i < 6; i++) {
    board.push(new Array(5).fill(''));
  }

  return board;
};

export const getRandomWord = () => {
  const len = fiveLetterWords.length;
  const randomIndex = Math.floor(Math.random() * 100000) % len;
  return fiveLetterWords[randomIndex].toUpperCase();
};

export const getWordleEmoji = (word, guessList) => {
  const hasWon = guessList[guessList.length - 1] === word;

  let output = `${hasWon ? guessList.length : 'x'}/${MAX_GUESSES}\n\n`;

  guessList.forEach(row => {
    let line = '';

    row.split('').forEach((char, colIndex) => {
      if (char === word[colIndex]) {
        line += '🟩';
      } else if (word.includes(char)) {
        line += '🟨';
      } else {
        line += '⬜';
      }
    });

    output += line + '\n';
  });

  return output;
};
