import express from 'express';
import {
  getUserByClerkId,
  updateXP,
  updateSkinAvailability,
  addGameToPlayed,
  updateSepoliaBalance,
} from '../controllers/userController.js';

const router = express.Router();

// Route to get user by Clerk User ID
router.get('/:clerkUserId', getUserByClerkId);

// Route to update user's XP
router.put('/:clerkUserId/xp', updateXP);

// Route to update skin availability for a user
router.post('/skins', updateSkinAvailability);

// Route to add a game to the user's played games
router.put('/:clerkUserId/games', addGameToPlayed);

// Route to update Sepolia balance for a user
router.put('/:clerkUserId/sepolia', updateSepoliaBalance);

export default router;
