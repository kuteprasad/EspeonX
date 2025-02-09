import User from '../models/userModel.js';

// Get a user by Clerk User ID
export const getUserByClerkId = async (req, res) => {
  try {
    const { clerkUserId } = req.params;

    const user = await User.findOne({ clerkUserId });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, data: user });
  } catch (err) {
    console.error('Error fetching user:', err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update user's XP
export const updateXP = async (req, res) => {
  try {
    const { clerkUserId } = req.params;
    const { xp } = req.body;

    if (typeof xp !== 'number') {
      return res.status(400).json({ success: false, message: 'XP should be a number' });
    }

    const user = await User.findOneAndUpdate(
      { clerkUserId },
      { xp },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, message: 'XP updated', data: user });
  } catch (err) {
    console.error('Error updating XP:', err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update user's skin availability
export const updateSkinAvailability = async (req, res) => {
  console.log('Request body:', req.body);  // Check the request body
  const { clerkUserId, skinName } = req.body;

  try {
    console.log('Received data:', clerkUserId, skinName);  // Check the data being sent

    const user = await User.findOneAndUpdate(
      { clerkUserId },
      { $push: { skinAvailable: skinName } },
      {upsert:true, new: true }
    );

    console.log('User before update:', user);  // Check the user document before update
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    console.log('User after update:', user);  // Check the updated user document

   return res.status(200).json({
      success: true,
      message: `Skin ${skinName} unlocked and added to the user's profile.`,
      data: user,
    });
  } catch (err) {
    console.error('Error updating skin availability:', err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Add a game to the user's played games
export const addGameToPlayed = async (req, res) => {
  try {
    const { clerkUserId } = req.params;
    const { gameName } = req.body;

    if (!gameName) {
      return res.status(400).json({ success: false, message: 'Game name is required' });
    }

    const user = await User.findOneAndUpdate(
      { clerkUserId },
      {
        $push: {
          gamesPlayed: { gameName, datePlayed: new Date() }
        }
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, message: 'Game added to played list', data: user });
  } catch (err) {
    console.error('Error adding game to played list:', err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update the user's Sepolia balance
export const updateSepoliaBalance = async (req, res) => {
  try {
    const { clerkUserId } = req.params;
    const { sepoliaBalance } = req.body;

    if (typeof sepoliaBalance !== 'number') {
      return res.status(400).json({ success: false, message: 'Sepolia balance should be a number' });
    }

    const user = await User.findOneAndUpdate(
      { clerkUserId },
      { sepoliaBalance },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, message: 'Sepolia balance updated', data: user });
  } catch (err) {
    console.error('Error updating Sepolia balance:', err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};

