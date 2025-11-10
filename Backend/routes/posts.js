const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Post = require('../models/Post');
const User = require('../models/User');

// Create post
router.post('/', auth, async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ msg: 'Post text required' });

    const user = await User.findById(req.user.id).select('-passwordHash');
    const newPost = new Post({ user: user._id, userName: user.name, text });
    await newPost.save();
    res.json(newPost);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Get all posts (latest first)
// Get all posts (latest first) with user details
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('user', 'name email _id')
      .sort({ createdAt: -1 })
      .limit(100);
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Optional: edit/delete endpoints (only owner)
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: 'Post not found' });
    if (post.user.toString() !== req.user.id) return res.status(401).json({ msg: 'Unauthorized' });
    await post.deleteOne();
    res.json({ msg: 'Post deleted' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
