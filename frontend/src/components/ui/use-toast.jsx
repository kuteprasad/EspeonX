import React, { useState, useEffect } from 'react';
import ReactConfetti from 'react-confetti';
import { Button } from './button';
import axios from 'axios';
import { useUser } from '@clerk/clerk-react';

function Game1() {
  const [hitCount, setHitCount] = useState(0);
  const [skinUnlocked, setSkinUnlocked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

 const { user } = useUser();
 
  const skinName = 'Elite Sniper';

  const addSkinToUserDatabase = async () => {
    try {
      setLoading(true);
      setError(null);
      setSuccessMessage(''); // Clear previous success message
      
      console.log('Adding skin to user:', user.id);
      console.log('Skin name:', skinName);

      const response = await axios.post(
        `http://localhost:5000/api/user/skins`,
        {
          skinName,
          clerkUserId: user.id,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Response:', response.data);


      if (response.data.success) {
        setSuccessMessage(`Successfully unlocked ${skinName}`);
      }
    } catch (err) {
      console.error('Error adding skin to user:', err);
      setError('Failed to save your unlocked skin. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (hitCount >= 10 && !skinUnlocked) {
      setSkinUnlocked(true);
    }
  }, [hitCount, skinUnlocked]);

  useEffect(() => {
    if (skinUnlocked) {
      addSkinToUserDatabase();
    }
  }, [skinUnlocked]);

  const handleHit = () => {
    setHitCount((prevCount) => prevCount + 1);
  };

  return (
    <div className="relative flex justify-center items-center h-screen bg-gray-900">
      {skinUnlocked && <ReactConfetti />}
      <div className="bg-gray-800 text-white rounded-lg p-6 max-w-md w-full shadow-lg relative">
        <h1 className="text-3xl font-semibold mb-4">Hit the Button to Unlock Skin!</h1>
        <Button
          className="w-full py-3 bg-purple-600 text-xl rounded-md hover:bg-purple-500 focus:outline-none transition"
          onClick={handleHit}
          disabled={loading}
        >
          Hit!
        </Button>
        <div className="mt-4 text-xl text-gray-300">Hits: {hitCount}</div>

        {skinUnlocked && (
          <div className="mt-4 text-xl text-red-500">
            <p>
              Congratulations! You unlocked the <strong className="text-yellow-400">"Elite Sniper"</strong> skin!
            </p>
            {loading && <p className="text-sm text-gray-300">Saving your progress...</p>}
            {error && <p className="text-sm text-red-400">Error: {error}</p>}
            {successMessage && <p className="text-sm text-green-400">{successMessage}</p>}
          </div>
        )}
      </div>
    </div>
  );
}

export default Game1;