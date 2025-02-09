import mongoose from 'mongoose';

const gameSchema = mongoose.Schema(
  {
    gameName: { type: String, required: true }, // Game name like "Game1", "Game2", etc.
    companyName: { type: String, required: true }, // Company name
    gunSkinName: { type: String, required: true }, // Gun skin name
  },
  { timestamps: true } // Automatically handles createdAt and updatedAt fields
);

const Game = mongoose.model('Game', gameSchema);

export default Game;
