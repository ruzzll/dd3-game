import React from 'react';
import { useDispatch, useSelector } from '@/store/hooks';
import {
  BoardProps,
  incrementGamesPlayed,
  incrementGamesWon,
  incrementRow,
  resetInputWord,
  selectPlano,
  setGameOver,
  setInputWord,
  updateCurrentRow
} from '@/store/apps/plano';
import { RiDeleteBack2Line } from "react-icons/ri";


const Keyboard = () => {
  const dispatch = useDispatch();
  const { inputWord, board, currentRow, secretWord, gameOver } = useSelector(selectPlano);

  const checkWord = (word: string) => {
    const result: BoardProps[] = [];
    let correctLetters = 0;

    for (let i = 0; i < 5; i++) {
      if (word[i] === secretWord[i]) {
        result.push({ letter: word[i], status: 'plano-success' });
        correctLetters += 1;
      } else if (secretWord.includes(word[i])) {
        result.push({ letter: word[i], status: 'plano-warning' });
      } else {
        result.push({ letter: word[i], status: 'plano-error' });
      }
    }


    dispatch(updateCurrentRow(result));

    if (correctLetters === 5) {
      dispatch(incrementGamesWon());
      dispatch(setGameOver(true));
      dispatch(incrementGamesPlayed());
    } else if (currentRow === 4) {
      dispatch(setGameOver(true));
      dispatch(incrementGamesPlayed());
    } else {
      dispatch(incrementRow());
    }

    dispatch(resetInputWord());
  }

  const keyLayout = [
    "q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
    "a", "s", "d", "f", "g", "h", "j", "k", "l", "ñ",
    "enter", "z", "x", "c", "v", "b", "n", "m", "backspace",
  ];

  const handleUpdateWord = (word: string) => {
    if (!gameOver && inputWord.length < 5) {
      const newWord = inputWord + word;
      dispatch(setInputWord(newWord));

      const newRow = board[currentRow].map((cell, index) => {
        return index < newWord.length ? { letter: newWord[index], status: '' } : cell;
      })

      dispatch(updateCurrentRow(newRow));

      if (newWord.length === 5) {
        checkWord(newWord);
      }
    }
  }

  const handleDelete = () => {
    if (!gameOver) {
      const newWord = inputWord.slice(0, -1);
      dispatch(setInputWord(newWord));

      const newRow = board[currentRow].map((cell, index) => {
        return index < newWord.length ? { letter: newWord[index], status: '' } : { letter: '', status: '' };
      })

      dispatch(updateCurrentRow(newRow));
    }
  }

  const handleKeyClick = (key: string) => {
    switch (key) {
      case "backspace":
        handleDelete();
        break;
      case "enter":
        checkWord(inputWord);
        break;
      default:
        handleUpdateWord(key);
        break;
    }
  }

  const createIconHTML = (iconName: string) => {
    switch (iconName) {
      case 'backspace':
        return <RiDeleteBack2Line size={25} />;
      default:
        return iconName;
    }
  };

  const renderKey = (key: string) => {
    return (
      <React.Fragment key={key}>
        <button
          type="button"
          className={`keyboard__key${["backspace", "enter"].includes(key) ? ' keyboard__key--wide' : ''}`}
          onClick={() => handleKeyClick(key)}
        >
          {["backspace", "enter"].includes(key) ? createIconHTML(key === "backspace" ? "backspace" : "enter") : key}
        </button>
        {["backspace", "p", "ñ"].includes(key) && <br />}
      </React.Fragment>
    );
  };

  return (
    <div className="keyboard">
      <div className="keyboard__keys">
        {keyLayout.map((key) => renderKey(key))}
      </div>
    </div>
  );
};

export default Keyboard;
