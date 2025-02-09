import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
  {
    clerkUserId: { type: String, required: true }, // User ID from Clerk
    firstName: { type: String, required: true }, // User's first name
    lastName: { type: String, required: true }, // User's last name
    userName: { type: String, required: true }, // User's username
    skinAvailable: { type: [String], default: [] }, // Array of available skins
    xp: { type: Number, default: 0 }, // User's experience points (XP)
    gamesPlayed: { 
      type: [{ 
        gameName: { type: String }, // Name of the game
        datePlayed: { type: Date, default: Date.now } // Date when the game was played
      }], 
      default: [] // Default to an empty array
    }, 
    sepoliaBalance: { type: Number, default: 0 }, // User's Sepolia balance (default is 0)
  },
  { timestamps: true } // Automatically handles createdAt and updatedAt fields
);

const User = mongoose.model('User', userSchema);

export default User;
