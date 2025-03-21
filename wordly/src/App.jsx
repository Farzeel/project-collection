import React, { use, useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";


import { words } from "./utils/words";
import Instruction from "./components/instruction";
import GameNavbar from "./components/Navbar";
import Fireworks from "./components/Fireworks";

const App = () => {
  const [playerName, setPlayerName] = useState(Cookies.get("playerName") || "");
  const [totalGames, setTotalGames] = useState(parseInt(Cookies.get("totalGames") || 0));
  const [gamesWon, setGamesWon] = useState(parseInt(Cookies.get("gamesWon") || 0));
  const [gamesLost, setGamesLost] = useState(parseInt(Cookies.get("gamesLost") || 0));
  const [win, SetWin] = useState(false)
  const [currentWord, setCurrentWord] = useState("HELLO");
  const [currentRow, setCurrentRow] = useState(0);
  const [currentGuess, setCurrentGuess] = useState("");
  const [guesses, setGuesses] = useState(Array(6).fill(""));
  const [feedbacks, setFeedbacks] = useState(Array(6).fill([]));
  const [animateFeedback, setAnimateFeedback] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const[display, setDisplay] = useState("")
  const [timer, SetTimer] = useState(60)
  const[displayImg, setDisplayImg]= useState(false)
  const[lastComparison, setLastComparison]= useState("")
  const [play, setPlay] = useState(false)
  const [activeCell, setActiveCell] = useState({ row: 0, col: 0 });
  const [animationStates, setAnimationStates] = useState(
    Array.from({ length: 6 }, () => Array(5).fill({ animate: false, color: null })));
    const tickSoundRef = useRef(new Audio("/tick.mp3"));

  useEffect(() => {
    setCurrentWord(words[Math.floor(Math.random() * words.length)].toUpperCase());
  }, []);

  useEffect(() => {
    if (!playerName) {
      let name = prompt("Enter your name to start playing:");

      while (!name || name.length<3 || !/^[A-Za-z]+$/.test(name)) {
       if(name==null){
        setPlayerName("player1");
        Cookies.set("playerName", "player1", { expires: 30 });
        return
      }
      name = prompt("Invalid name. Please enter a name with at least 3 letters:");
      }
      setPlayerName(name);
      Cookies.set("playerName", name, { expires: 30 }); 
    }
  }, []);

  useEffect(()=>{
    let interval
    if (play) {
      if (timer > 0 && !isGameOver) {
        interval = setInterval(() => {
          SetTimer(prevTimer => {
            if (prevTimer <= 1) {
              clearInterval(interval);
              setIsGameOver(true);
              return 0;
            }
            try {
              tickSoundRef.current.play();
            } catch (error) {
              console.error("Error playing sound:", error);
            }
            return prevTimer - 1;
          });
        }, 1000);
      } else {
        tickSoundRef.current.pause();
        setIsGameOver(true);
      }
    }


 return () => clearInterval(interval);
  },[timer,play])

  useEffect(() => {
    if (win) {
      setTimeout(() => SetWin(false), 3000); 
    }
  }, [win]);

  useEffect(() => {
  if(!isGameOver) return
  if (currentRow >= 5 && isGameOver && lastComparison !== currentWord) {
    setDisplay(`YOU LOST! THE WORD WAS ${currentWord}`);
    updateGameStats(false)
    setIsGameOver(true);
  }else{
    if(lastComparison === currentWord){
      setDisplay(`YOU WON! `);
      SetWin(true)
      updateGameStats(true)
    }else{
      setDisplay(`YOU LOST! THE WORD WAS ${currentWord}`);
      updateGameStats(false)
    }
  }
}, [isGameOver]); 


  useEffect(() => {


    const handleKeyDown = (event) => {
      if (timer <= 0) return
      if (isGameOver) return;
         
      console.log("object")
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
          setCurrentRow(currentRow + 1);
          setLastComparison(currentGuess)
          setCurrentGuess("");
          setIsGameOver(true);
          return
        }


        if (currentRow >= 5) {
          setCurrentRow(currentRow + 1);
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
  }, [currentGuess,currentRow,timer]);
  
  useEffect(() => {
    
    if (animateFeedback) {
   
      const newAnimationStates = [...animationStates];
      
      const currentRowAnimations = newAnimationStates[currentRow-1]; 
      let row = currentRow-1
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

  const handleRestart = ()=>{
  setGuesses(Array(6).fill(""));
    setCurrentGuess("")
    setLastComparison("")
    setIsGameOver(false)
    SetTimer(60)
    setCurrentRow(0)
    setFeedbacks(Array(6).fill([]));
    setActiveCell({ row: 0, col: 0 });
    setAnimationStates(
      Array.from({ length: 6 }, () => Array(5).fill({ animate: false, color: null }))
    );
    setCurrentWord(words[Math.floor(Math.random() * words.length)].toUpperCase());

  }
  const updateGameStats = (win) => {
    setTotalGames(prev=>{
      const newTotal = prev + 1;
      Cookies.set("totalGames", newTotal, { expires: 30 });
      return newTotal;
    })
    if(win){

      setGamesWon(prev=>{
        const newTotal = prev + 1;
        Cookies.set("gamesWon", newTotal, { expires: 30 });
        return newTotal;
      })
    }else{

      setGamesLost(prev=>{
        const newTotal = prev + 1;
        Cookies.set("gamesLost", newTotal, { expires: 30 });
        return newTotal;
      })
    }
  }

  return (
    <>
    <GameNavbar playerName={playerName} totalGames={totalGames} gamesWon = {gamesWon} gamesLost = {gamesLost} setDisplayImg={setDisplayImg}/>
      {displayImg ? (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 z-20" >
          <Instruction setDisplayImg={setDisplayImg} />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
          <p className="text-green-600">Enter letters using your keyboard.</p>
          {timer > 0 ? (
                     <div className="flex items-center space-x-2 mb-2">
                     <span className="text-gray-300">⏳ Time Left:</span>
                     <span className="font-semibold text-red-400">00:{timer}</span>
                   </div>
          ) : (
            <div className="text-xl mb-4">Time's Up!</div>
          )}
          {guesses.map((_, rowIndex) => {
            const rowLetters = rowIndex === currentRow ? currentGuess : guesses[rowIndex];
            return (
              <div key={rowIndex} className="flex gap-2 mb-2">
                {Array.from({ length: 5 }).map((_, colIndex) => {
                  const details = checkDetails(rowIndex, activeCell, rowLetters, colIndex);
                  return (
                    <span
                      key={colIndex}
                      className={`w-16 h-16 flex items-center justify-center text-2xl font-bold border-2 rounded-lg transition-all duration-300 ${
                        details.hasLetter ? "border-gray-400" : "border-gray-600"
                      } ${
                        details.shouldAnimate ? "animate-flip" : ""
                      } ${
                        details.color === "correct"
                          ? "bg-green-500 border-green-500"
                          : details.color === "present"
                          ? "bg-yellow-500 border-yellow-500"
                          : details.color === "absent"
                          ? "bg-gray-700 border-gray-700"
                          : "bg-gray-800"
                      }`}
                    >
                      {details.letter || ""}
                    </span>
                  );
                })}
              </div>
            );
          })}
          {!play && (
            <button
              onClick={() => setPlay(true)}
              className="mt-4 px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all"
            >
              Play
            </button>
          )}
          {isGameOver && (
            <div className="mt-4 text-center">
              <div className="text-2xl font-bold mb-4">{display}</div>
              <button
                onClick={handleRestart}
                className="px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all"
              >
                Restart
              </button>
            </div>
          )}
          {win && <Fireworks show={win} />}
        </div>
      )}
    </>
  );
};

export default App;
