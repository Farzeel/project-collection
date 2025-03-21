// import React, { use, useEffect, useState } from "react";

// import { words } from "./utils/words";
// import Instruction from "./components/instruction";

// const App = () => {
//   const [currentWord, setCurrentWord] = useState("HELLO");
//   const [currentRow, setCurrentRow] = useState(0);
//   const [currentGuess, setCurrentGuess] = useState("");
//   const [guesses, setGuesses] = useState(Array(6).fill(""));
//   const [feedbacks, setFeedbacks] = useState(Array(6).fill([]));
//   const [animateFeedback, setAnimateFeedback] = useState(false);
//   const [isGameOver, setIsGameOver] = useState(false);
//   const[display, setDisplay] = useState("")
//   const [timer, SetTimer] = useState(30)
//   const[displayImg, setDisplayImg]= useState(true)

//   const [activeCell, setActiveCell] = useState({ row: 0, col: 0 });
//   const [animationStates, setAnimationStates] = useState(
//     Array.from({ length: 6 }, () => Array(5).fill({ animate: false, color: null }))
//   );

//   // useEffect(() => {
//   //   setCurrentWord(words[Math.floor(Math.random() * words.length)]);
//   // }, []);
//   useEffect(()=>{
//     let interval
//     if(timer>0 && !isGameOver){
//        interval = setInterval(() => {
//         SetTimer(timer-1)
//        }, 1000);
//     }else{
//       clearInterval(interval)
//       setIsGameOver(true)
//       console.log(isGameOver)
//     }

//  return () => clearInterval(interval);
//   },[timer])

//   useEffect(() => {
//   if (currentRow >= 5 && isGameOver) {
//     setDisplay(`YOU LOST! THE WORD WAS ${currentWord}`);
//     setIsGameOver(true);
//   }else{
//     if(currentGuess === currentWord){
//       setDisplay(`YOU WON! `);
//     }else{
//       setDisplay(`YOU LOST! THE WORD WAS ${currentWord}`);
//     }
//   }
// }, [isGameOver]); 


//   useEffect(() => {


//     const handleKeyDown = (event) => {
//       if (timer <= 0) return
//       if (isGameOver) return;
         
//       console.log("object")
//       if (event.key === "Backspace") {
//         if (activeCell.col > 0)
//           setActiveCell({ ...activeCell, col: activeCell.col - 1 });
//         setCurrentGuess(currentGuess.slice(0, -1));
//       } else if (event.key.match(/^[a-zA-Z]$/) && currentGuess.length < 5) {

//         if (activeCell.col < 4)
//           setActiveCell({ ...activeCell, col: activeCell.col + 1 });
//         setCurrentGuess((prevGuess) => prevGuess + event.key.toUpperCase());
//       } else if (event.key === "Enter" && currentGuess.length === 5 ) {
       
        
//           // Save the current guess into the guesses array
//           const newGuesses = [...guesses];
//           newGuesses[currentRow] = currentGuess;
//           setGuesses(newGuesses);
//           console.log({guesses})
          
//           // Generate feedback for the current guess
//           const newFeedback = getFeedback(currentGuess, currentWord);
//           const newFeedbacks = [...feedbacks];
//           newFeedbacks[currentRow] = newFeedback;
//           setFeedbacks(newFeedbacks);
        
//          // Trigger feedback animation
//          setAnimateFeedback(true);
         
//          if (currentGuess === currentWord) {
//           setCurrentRow(currentRow + 1);
//           setCurrentGuess("");
//           setIsGameOver(true);
//           return
//         }


//         if (currentRow >= 5) {
//           setCurrentRow(currentRow + 1);
//           setIsGameOver(true);
//           return;
//         }



//         // Move to the next row
      
//         setCurrentRow(currentRow + 1);
//         setCurrentGuess(""); 
//         setActiveCell({ row: currentRow +1, col: 0 }); 
      
//     }
//     };

//     window.addEventListener("keydown", handleKeyDown);
//     return () => window.removeEventListener("keydown", handleKeyDown);
//   }, [currentGuess,currentRow,timer]);
  
//   useEffect(() => {
    
//     if (animateFeedback) {
   
//       const newAnimationStates = [...animationStates];
      
//       const currentRowAnimations = newAnimationStates[currentRow-1]; 
//       let row = currentRow-1
//       let delay = 0;
//       console.log({currentRow})
//       console.log({row})
//       currentRowAnimations.forEach((_, colIndex) => {
//         setTimeout(() => {
//           newAnimationStates[row][colIndex] = {animate:true, color:feedbacks[row][colIndex]};
//           setAnimationStates([...newAnimationStates]);
//         }, delay);
//         delay += 200; 
//       });
//       setTimeout(() => {
//         setAnimateFeedback(false);
//         // setAnimationStates(Array.from({ length: 6 }, () => Array(5).fill(false))); 
//       }, 1000);
//       const resetAnimationStates = newAnimationStates.map((row,rowIndx)=>
//       row.map((cell,colIndx)=>rowIndx === row? { ...cell, animate: false }: cell)
//       )
//       setAnimationStates(resetAnimationStates);
//     }
//   }, [animateFeedback]);

//   const getFeedback = (guess, target) => {
//     const feedback = Array(5).fill("absent");
//     const targetLetters = target.split("");
//     const guessLetters = guess.split("");
//     // console.log({ targetLetters, guessLetters, feedback });

//     guessLetters.forEach((letter, index) => {
//       if (letter === targetLetters[index]) {
//         feedback[index] = "correct";
//       }
//     });
//     guessLetters.forEach((letter, index) => {
//       if (feedback[index] == "correct") return;

//       const targetIndex = targetLetters.indexOf(letter);
//       // console.log({ targetIndex });
//       if (targetIndex !== -1) {
//         feedback[index] = "present";
//       }
//     });

//     return feedback;
//   };
//   const checkDetails = (rowIndex, activeCell, rowLetters, colIndex) => {
//     const isActiveCell =
//       rowIndex === activeCell.row && colIndex === activeCell.col;
//     const letter = rowLetters[colIndex];
//     // console.log({letter})
//     const hasLetter = !!letter; 
//     const feedback = feedbacks[rowIndex]?.[colIndex];
//     const shouldAnimate =  animationStates[rowIndex]?.[colIndex]?.animate || false;
//     const color = animationStates[rowIndex]?.[colIndex]?.color || null;
    
   


//     return { isActiveCell, hasLetter, feedback, shouldAnimate, letter,color };
//   };

//   const handleRestart = ()=>{
//   setGuesses(Array(6).fill(""));
//     setCurrentGuess("")
//     setIsGameOver(false)
//     SetTimer(30)
//     setCurrentRow(0)
//     setFeedbacks(Array(6).fill([]));
//     setActiveCell({ row: 0, col: 0 });
//     setAnimationStates(
//       Array.from({ length: 6 }, () => Array(5).fill({ animate: false, color: null }))
//     );

//   }

//   return (
//       <>
//      {displayImg?(<div className="InstructionBody">
//      <Instruction setDisplayImg={setDisplayImg}/>
//       </div>
//         ):(<div className="gappp">
        
//       {timer>0?<><div>{`${timer}s left`}</div></>:<><div>times-Up</div></>}
//       {guesses.map((_, rowIndex) => {
//         const rowLetters = rowIndex === currentRow ? currentGuess : guesses[rowIndex];
//         // const isCurrentGuess = index === guesses.findIndex(val => val == "");
//         // console.log("isCurrentGuess",isCurrentGuess)
//         return (
//           <div className="container" key={rowIndex}>
//             {Array.from({ length: 5 }).map((_, colIndex) => {
//               // const isActiveCell = rowIndex === activeCell.row && colIndex === activeCell.col
//               // const letter = guess[colIndex]; 
//               // const hasLetter = !!letter; 
//               // const feedback = feedbacks[rowIndex][colIndex]
//               const details = checkDetails(
//                 rowIndex,
//                 activeCell,
//                 rowLetters,
//                 colIndex
//               );
//               const isActiveCell = details.isActiveCell;
//               const letter = details.letter;
//               const hasLetter = details.hasLetter;
//               const feedback = details.feedback;
//               const isAnimate = details.shouldAnimate;

//               // console.log("currentGuess",currentGuess)
//               // {isActiveCell?"active":""}
//               // console.log(`Row: ${rowIndex}, Col: ${colIndex}, Should Animate: ${isAnimate}`);
//               return (
                
//                 <span
//                   className={`cell ${hasLetter ? "animateLetters active" : ""} ${
//                     isAnimate ? "animate":""
//                   } ${details.color == "correct" && "correct"} ${
//                     details.color == "present" && "present"
//                   } ${details.color == "absent" && "absent"} `}
//                   key={colIndex}
//                 >
//                   {letter || ""}
//                 </span>
//               ); //style={{ color: guess.feedback[i] }}
//             })}
//           </div>
//         );
//       })}
//       {isGameOver && <><div>{display}</div> <button onClick={handleRestart}>Restart</button></>}
//     </div>)}
//     </>
  
//   );
// };

// export default App;
