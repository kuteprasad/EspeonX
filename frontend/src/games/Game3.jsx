import React, { useState } from 'react';
import ReactConfetti from 'react-confetti';
import { Button } from '../components/ui/button'; // Using a ShadCN button component


function Game3() {
  const [hitCount, setHitCount] = useState(0); // State to track the number of hits
  const [skinUnlocked, setSkinUnlocked] = useState(false); // State to track if the skin is unlocked

  // Handle the button click to simulate hitting a target
  const handleHit = () => {
    setHitCount((prevCount) => prevCount + 1);
  };

  // Unlock skin when the player hits 10 targets
  if (hitCount >= 10 && !skinUnlocked) {
    setSkinUnlocked(true);
  }

  return (
    <div className="relative flex justify-center items-center h-screen bg-gray-900">
      {skinUnlocked && <ReactConfetti />}
      <div className="bg-gray-800 text-white rounded-lg p-6 max-w-md w-full shadow-lg relative">
        <h1 className="text-3xl font-semibold mb-4">Hit the Button to Unlock Skin!</h1>
        <Button
          className="w-full py-3 bg-purple-600 text-xl rounded-md hover:bg-purple-500 focus:outline-none transition"
          onClick={handleHit}
        >
          Hit!
        </Button>
        <div className="mt-4 text-xl text-gray-300">Hits: {hitCount}</div>

        {/* Display skin unlock message */}
        {skinUnlocked && (
          <div className="mt-4 text-xl text-red-500">
            <p>
              Congratulations! You unlocked the <strong className="text-yellow-400">"Falcon Blaze"</strong> skin!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Game3;

