# Wordle Clone

A simple Wordle clone built using **React.js**. This project allows users to guess a 5-letter word within 6 attempts, following the classic Wordle game rules.

## Features
- 🎯 **Word Guessing Game**: Players enter 5-letter words to match a randomly selected target word.
- 🎨 **Visual Feedback**: Letters turn **green** (correct position), **yellow** (wrong position), or **gray** (not in the word).
- 🎹 **Keyboard Input Handling**: Supports typing letters, using Backspace to delete, and Enter to submit guesses.
- 📊 **Game State Management**: Stores user guesses and checks validity.

## Technologies Used
- React.js (useState, useEffect for state management)
- CSS (basic styling for the board and tiles)
- JavaScript (event handling and game logic)



## Game Rules
1. The player must guess a **5-letter word**.
2. The word is checked and feedback is given:
   - ✅ **Green**: Correct letter in the correct position.
   - 🟡 **Yellow**: Correct letter in the wrong position.
   - ⚪ **Gray**: Letter not in the word.
3. The player has **6 attempts** to guess the word correctly.
4. If the correct word is guessed, the game ends with a success message.
5. If the player runs out of attempts, the correct word is revealed.





