import Asset from '../models/assetModel.js';
import User from '../models/userModel.js'; 

// Create a new asset
export const createAsset = async (req, res) => {
  try {
    const { name, description, price, image, tags } = req.body;
    const userId = req.user._id; 
    
    const newAsset = new Asset({
      user: userId,
      name,
      description,
      price,
      image,
      tags,
    });

    const savedAsset = await newAsset.save();
    res.status(201).json(savedAsset);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating asset' });
  }
};


export const getAssets = async (req, res) => {
  try {
    const assets = await Asset.find().populate('user', 'name'); // Populating user field to get the user name
    res.status(200).json(assets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching assets' });
  }
};

// Get a single asset by ID
export const getAssetById = async (req, res) => {
  const { assetId } = req.params;
  try {
    const asset = await Asset.findById(assetId).populate('user', 'name').populate('comments.user', 'name');
    if (!asset) {
      return res.status(404).json({ message: 'Asset not found' });
    }
    res.status(200).json(asset);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching asset' });
  }
};

// Update an asset
export const updateAsset = async (req, res) => {
  const { assetId } = req.params;
  const { name, description, price, image, tags } = req.body;
  try {
    const updatedAsset = await Asset.findByIdAndUpdate(
      assetId,
      { name, description, price, image, tags },
      { new: true }
    );
    if (!updatedAsset) {
      return res.status(404).json({ message: 'Asset not found' });
    }
    res.status(200).json(updatedAsset);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating asset' });
  }
};

// Delete an asset
export const deleteAsset = async (req, res) => {
  const { assetId } = req.params;
  try {
    const deletedAsset = await Asset.findByIdAndDelete(assetId);
    if (!deletedAsset) {
      return res.status(404).json({ message: 'Asset not found' });
    }
    res.status(200).json({ message: 'Asset deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting asset' });
  }
};

// Add a comment to an asset
export const addComment = async (req, res) => {
  const { assetId } = req.params;
  const { text } = req.body;
  const userId = req.user._id; // Assuming you have user authentication middleware to get the current user

  try {
    const asset = await Asset.findById(assetId);
    if (!asset) {
      return res.status(404).json({ message: 'Asset not found' });
    }

    const newComment = { user: userId, text };
    asset.comments.push(newComment);
    await asset.save();

    res.status(201).json(asset);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error adding comment' });
  }
};

// Like an asset
export const likeAsset = async (req, res) => {
  const { assetId } = req.params;
  const userId = req.user._id; // Assuming you have user authentication middleware to get the current user

  try {
    const asset = await Asset.findById(assetId);
    if (!asset) {
      return res.status(404).json({ message: 'Asset not found' });
    }

    // If the user already liked the asset, remove the like
    if (asset.likes.includes(userId)) {
      asset.likes = asset.likes.filter((like) => like.toString() !== userId.toString());
    } else {
      asset.likes.push(userId);
    }

    await asset.save();
    res.status(200).json(asset);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error liking asset' });
  }
};
