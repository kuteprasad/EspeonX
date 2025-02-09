import mongoose from 'mongoose';

const assetSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: String, required: true }, // Store price as a string for flexibility (e.g., "0.05 ETH")
    image: { type: String }, // Optional image field for the asset
    tags: [{ type: String }], // Optional field for asset tags or categories
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Array of users who liked the asset
    comments: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        text: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

const Asset = mongoose.model('Asset', assetSchema);

export default Asset;
