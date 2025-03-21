import React from 'react';

const Instruction = ({ setDisplayImg }) => {
  return (
    <div className="max-w-lg mx-auto p-6 bg-gray-800 rounded-lg shadow-lg text-white">
   
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">How to play</h2>
        <button
          onClick={() => setDisplayImg(false)}
          className="text-gray-400 hover:text-white text-2xl font-bold"
        >
          ×
        </button>
      </div>

     
      <h4 className="text-lg mb-6">
        You have to guess the hidden word in 6 tries, and the color of the letters changes to show how close you are.
      </h4>

   
      <div className="mb-6">
        <p className="text-gray-300 mb-4">To start the game, just enter any word, for example:</p>
        <div className="flex gap-2 mb-4">
          <span className="w-10 h-10 flex items-center justify-center bg-yellow-500 text-white font-bold rounded">T</span>
          <span className="w-10 h-10 flex items-center justify-center bg-gray-600 text-white font-bold rounded">A</span>
          <span className="w-10 h-10 flex items-center justify-center bg-yellow-500 text-white font-bold rounded">B</span>
          <span className="w-10 h-10 flex items-center justify-center bg-green-500 text-white font-bold rounded">L</span>
          <span className="w-10 h-10 flex items-center justify-center bg-green-500 text-white font-bold rounded">E</span>
        </div>

 
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <strong className="w-6 h-6 flex items-center justify-center bg-gray-600 text-white font-bold rounded">T</strong>
            <strong className="w-6 h-6 flex items-center justify-center bg-gray-600 text-white font-bold rounded">B</strong>
            <span className="text-gray-300">these characters aren't in the target word at all.</span>
          </div>
          <div className="flex items-center gap-2">
            <strong className="w-6 h-6 flex items-center justify-center bg-yellow-500 text-white font-bold rounded">A</strong>
            <strong className="w-6 h-6 flex items-center justify-center bg-yellow-500 text-white font-bold rounded">L</strong>
            <span className="text-gray-300"> these characters are in the word but in the wrong spot.</span>
          </div>
          <div className="flex items-center gap-2">
            <strong className="w-6 h-6 flex items-center justify-center bg-green-500 text-white font-bold rounded">E</strong>
            <span className="text-gray-300">this character is in the word and in the correct spot.</span>
          </div>
        </div>
      </div>

   
      <p className="text-gray-300 mb-4">Another try to find matching letters in the target word.</p>
      <div className="flex gap-2 mb-4">
        <span className="w-10 h-10 flex items-center justify-center bg-green-500 text-white font-bold rounded">F</span>
        <span className="w-10 h-10 flex items-center justify-center bg-green-500 text-white font-bold rounded">L</span>
        <span className="w-10 h-10 flex items-center justify-center bg-green-500 text-white font-bold rounded">A</span>
        <span className="w-10 h-10 flex items-center justify-center bg-gray-600 text-white font-bold rounded">S</span>
        <span className="w-10 h-10 flex items-center justify-center bg-gray-600 text-white font-bold rounded">H</span>
      </div>
      <p className="text-gray-300 mb-6">So close!</p>

     
      <div className="flex gap-2 items-center">
        <span className="w-10 h-10 flex items-center justify-center bg-green-500 text-white font-bold rounded">F</span>
        <span className="w-10 h-10 flex items-center justify-center bg-green-500 text-white font-bold rounded">L</span>
        <span className="w-10 h-10 flex items-center justify-center bg-green-500 text-white font-bold rounded">A</span>
        <span className="w-10 h-10 flex items-center justify-center bg-green-500 text-white font-bold rounded">M</span>
        <span className="w-10 h-10 flex items-center justify-center bg-green-500 text-white font-bold rounded">E</span>
        <span className="text-green-500 font-bold ml-2">Got it! 🎉</span>
      </div>
    </div>
  );
};

export default Instruction;