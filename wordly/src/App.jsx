import React, { useEffect, useState } from "react";

import { words } from "./utils/words";

const App = () => {
  const [currentWord, setCurrentWord] = useState("HELLO");
  const [currentRow, setCurrentRow] = useState(0);
  const [currentGuess, setCurrentGuess] = useState("");
  const [guesses, setGuesses] = useState(Array(6).fill(""));
  const [feedbacks, setFeedbacks] = useState(Array(6).fill([]));
  const [animateFeedback, setAnimateFeedback] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const[display, setDisplay] = useState("")

  const [activeCell, setActiveCell] = useState({ row: 0, col: 0 });
  const [animationStates, setAnimationStates] = useState(
    Array.from({ length: 6 }, () => Array(5).fill({ animate: false, color: null }))
  );

  // useEffect(() => {
  //   setCurrentWord(words[Math.floor(Math.random() * words.length)]);
  // }, []);

  useEffect(() => {
  if (currentRow >= 5 && isGameOver) {
    setDisplay(`YOU LOST! THE WORD WAS ${currentWord}`);
    setIsGameOver(true);
  }else{
        setDisplay(`YOU WON! `);
  }
}, [isGameOver]); 


  useEffect(() => {


    const handleKeyDown = (event) => {
   
      if (isGameOver) return;
         
      
      if (event.key === "Backspace") {
        if (activeCell.col > 0)
          setActiveCell({ ...activeCell, col: activeCell.col - 1 });
        setCurrentGuess(currentGuess.slice(0, -1));
      } else if (event.key.match(/^[a-zA-Z]$/) && currentGuess.length < 5) {

        if (activeCell.col < 4)
          setActiveCell({ ...activeCell, col: activeCell.col + 1 });
        setCurrentGuess((prevGuess) => prevGuess + event.key.toUpperCase());
      } else if (event.key === "Enter" && currentGuess.length === 5 ) {
       
        
          // Save the current guess into the guesses array
          const newGuesses = [...guesses];
          newGuesses[currentRow] = currentGuess;
          setGuesses(newGuesses);
          console.log({guesses})
          
          // Generate feedback for the current guess
          const newFeedback = getFeedback(currentGuess, currentWord);
          const newFeedbacks = [...feedbacks];
          newFeedbacks[currentRow] = newFeedback;
          setFeedbacks(newFeedbacks);
        
         // Trigger feedback animation
         setAnimateFeedback(true);
         
         if (currentGuess === currentWord) {
          setIsGameOver(true);
          return
        }


        if (currentRow >= 5) {
          setIsGameOver(true);
          return;
        }



        // Move to the next row
      
        setCurrentRow(currentRow + 1);
        setCurrentGuess(""); 
        setActiveCell({ row: currentRow +1, col: 0 }); 
      
    }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentGuess,currentRow]);
  
  useEffect(() => {
    
    if (animateFeedback) {
   
      let row = currentRow <= 5?currentRow - 1:5
      const newAnimationStates = [...animationStates];
     
      const currentRowAnimations = newAnimationStates[row]; 
      let delay = 0;
      console.log({currentRow})
      console.log({row})
      currentRowAnimations.forEach((_, colIndex) => {
        setTimeout(() => {
          newAnimationStates[row][colIndex] = {animate:true, color:feedbacks[row][colIndex]};
          setAnimationStates([...newAnimationStates]);
        }, delay);
        delay += 200; 
      });
      setTimeout(() => {
        setAnimateFeedback(false);
        // setAnimationStates(Array.from({ length: 6 }, () => Array(5).fill(false))); 
      }, 1000);
      const resetAnimationStates = newAnimationStates.map((row,rowIndx)=>
      row.map((cell,colIndx)=>rowIndx === row? { ...cell, animate: false }: cell)
      )
      setAnimationStates(resetAnimationStates);
    }
  }, [animateFeedback]);

  const getFeedback = (guess, target) => {
    const feedback = Array(5).fill("absent");
    const targetLetters = target.split("");
    const guessLetters = guess.split("");
    // console.log({ targetLetters, guessLetters, feedback });

    guessLetters.forEach((letter, index) => {
      if (letter === targetLetters[index]) {
        feedback[index] = "correct";
      }
    });
    guessLetters.forEach((letter, index) => {
      if (feedback[index] == "correct") return;

      const targetIndex = targetLetters.indexOf(letter);
      // console.log({ targetIndex });
      if (targetIndex !== -1) {
        feedback[index] = "present";
      }
    });

    return feedback;
  };
  const checkDetails = (rowIndex, activeCell, rowLetters, colIndex) => {
    const isActiveCell =
      rowIndex === activeCell.row && colIndex === activeCell.col;
    const letter = rowLetters[colIndex];
    // console.log({letter})
    const hasLetter = !!letter; 
    const feedback = feedbacks[rowIndex]?.[colIndex];
    const shouldAnimate =  animationStates[rowIndex]?.[colIndex]?.animate || false;
    const color = animationStates[rowIndex]?.[colIndex]?.color || null;
    
   


    return { isActiveCell, hasLetter, feedback, shouldAnimate, letter,color };
  };

  return (
    <div className="gappp">
      {guesses.map((_, rowIndex) => {
        const rowLetters = rowIndex === currentRow ? currentGuess : guesses[rowIndex];
        // const isCurrentGuess = index === guesses.findIndex(val => val == "");
        // console.log("isCurrentGuess",isCurrentGuess)
        return (
          <div className="container" key={rowIndex}>
            {Array.from({ length: 5 }).map((_, colIndex) => {
              // const isActiveCell = rowIndex === activeCell.row && colIndex === activeCell.col
              // const letter = guess[colIndex]; 
              // const hasLetter = !!letter; 
              // const feedback = feedbacks[rowIndex][colIndex]
              const details = checkDetails(
                rowIndex,
                activeCell,
                rowLetters,
                colIndex
              );
              const isActiveCell = details.isActiveCell;
              const letter = details.letter;
              const hasLetter = details.hasLetter;
              const feedback = details.feedback;
              const isAnimate = details.shouldAnimate;

              // console.log("currentGuess",currentGuess)
              // {isActiveCell?"active":""}
              // console.log(`Row: ${rowIndex}, Col: ${colIndex}, Should Animate: ${isAnimate}`);
              return (
                
                <span
                  className={`cell ${hasLetter ? "animateLetters active" : ""} ${
                    isAnimate ? "animate":""
                  } ${details.color == "correct" && "correct"} ${
                    details.color == "present" && "present"
                  } ${details.color == "absent" && "absent"} `}
                  key={colIndex}
                >
                  {letter || ""}
                </span>
              ); //style={{ color: guess.feedback[i] }}
            })}
          </div>
        );
      })}
      {isGameOver && <><div>{display}</div></>}
    </div>
  );
};

export default App;
