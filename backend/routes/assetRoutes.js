import express from 'express';
import {
  createAsset,
  getAssets,
  getAssetById,
  updateAsset,
  deleteAsset,
  addComment,
  likeAsset
} from '../controllers/assetController.js';

const router = express.Router();

// Create a new asset
router.post('/assets', createAsset);

// Get all assets
router.get('/assets', getAssets);

// Get a single asset by ID
router.get('/assets/:assetId', getAssetById);

// Update an asset
router.put('/assets/:assetId', updateAsset);

// Delete an asset
router.delete('/assets/:assetId', deleteAsset);

// Add a comment to an asset
router.post('/assets/:assetId/comments', addComment);

// Like an asset
router.post('/assets/:assetId/like', likeAsset);

export default router;
