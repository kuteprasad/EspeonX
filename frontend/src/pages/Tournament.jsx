import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Using useNavigate for React Router v6

const Tournament = () => {
  const [hovered, setHovered] = useState(null);
  const navigate = useNavigate(); // Initialize navigate hook

  // Handle box click to navigate to the game
  const handleBoxClick = (gameNumber) => {
    switch (gameNumber) {
      case 1:
        navigate('/game-1'); // Use navigate to go to the first game route
        break;
      case 2:
        navigate('/game-2'); // Navigate to the second game route
        break;
      case 3:
        navigate('/game-3'); // Navigate to the third game route
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900 p-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Box 1 */}
        <div
          className={`relative overflow-hidden rounded-lg shadow-xl cursor-pointer ${hovered === 1 ? 'transform scale-105' : ''} transition-all duration-300`}
          onMouseEnter={() => setHovered(1)}
          onMouseLeave={() => setHovered(null)}
          onClick={() => handleBoxClick(1)}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-blue-500 opacity-80 hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative z-10 flex flex-col items-center justify-center h-full p-6 text-center text-white">
            <h2 className="text-3xl font-bold">Game 1</h2>
            <p className="mt-2 text-lg">Enter the battlefield and test your skills.</p>
          </div>
        </div>

        {/* Box 2 */}
        <div
          className={`relative overflow-hidden rounded-lg shadow-xl cursor-pointer ${hovered === 2 ? 'transform scale-105' : ''} transition-all duration-300`}
          onMouseEnter={() => setHovered(2)}
          onMouseLeave={() => setHovered(null)}
          onClick={() => handleBoxClick(2)}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-600 to-red-600 opacity-80 hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative z-10 flex flex-col items-center justify-center h-full p-6 text-center text-white">
            <h2 className="text-3xl font-bold">Game 2</h2>
            <p className="mt-2 text-lg">A fast-paced adventure awaits. Join now!</p>
          </div>
        </div>

        {/* Box 3 */}
        <div
          className={`relative overflow-hidden rounded-lg shadow-xl cursor-pointer ${hovered === 3 ? 'transform scale-105' : ''} transition-all duration-300`}
          onMouseEnter={() => setHovered(3)}
          onMouseLeave={() => setHovered(null)}
          onClick={() => handleBoxClick(3)}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-purple-900 opacity-80 hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative z-10 flex flex-col items-center justify-center h-full p-6 text-center text-white">
            <h2 className="text-3xl font-bold">Game 3</h2>
            <p className="mt-2 text-lg">Are you ready for the ultimate challenge?</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tournament;
