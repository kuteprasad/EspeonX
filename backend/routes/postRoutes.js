import express from 'express'
import {
  createPost,
  likePost,
  addComment,
  getPosts,
} from '../controllers/postController.js'
import { authenticate } from '../middlewares/authMiddleware.js'
import { upload } from '../utils/multer.js'

const router = express.Router()

router
  .route('/')
  .post(
    authenticate,
    upload.fields([{ name: 'image', maxCount: 1 }]),
    createPost
  )
  .get(authenticate, getPosts) // Create and fetch posts
router.route('/:postId/like').put(authenticate, likePost) // Like/unlike post
router.route('/:postId/comment').post(authenticate, addComment) // Add comment to post

export default router
