import PostMessage from '../models/postMessage.js';
import mongoose from 'mongoose';

// Get all posts
export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find();
        console.log(postMessages);
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// Create a new post
export const createPosts = async (req, res) => {
    const post = req.body;

    // Validate request body
    if (!post.title || !post.message) {
        return res.status(400).json({ message: 'Title and message are required fields' });
    }

    const newPost = new PostMessage({ ...post, createdAt: new Date().toISOString() });

    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

// Update a post by ID
export const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body;

    try {
        // Validate if the provided ID is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No Post with that id');

        const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, { new: true });
        res.json(updatedPost);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Delete a post by ID
export const deletePost = async (req, res) => {
    const { id: _id } = req.params;

    try {
        // Validate if the provided ID is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No Post with that id');

        const deletedPost = await PostMessage.findByIdAndDelete(_id);

        // Check if post was not found
        if (!deletedPost) {
            return res.status(404).json({ message: 'No Post with that id' });
        }

        res.json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Like a post by ID
export const likePost = async (req, res) => {
    const { id: _id } = req.params;

    // Check if user is authenticated
    if (!req.userId) return res.status(401).json({ message: 'Unauthenticated' });

    try {
        // Validate if the provided ID is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(400).json({ message: 'Invalid ObjectId' });

        const post = await PostMessage.findById(_id);

        // Check if the post exists
        if (!post) return res.status(404).json({ message: 'Post not found' });

        const index = post.likes.findIndex((id) => id === String(req.userId));

        if (index === -1) {
            // If user hasn't liked the post, add their ID to the likes array
            post.likes.push(req.userId);
            // Increment the likes
           
        } else {
            // If user has already liked the post, remove their ID from the likes array
            post.likes = post.likes.filter((id) => id !== String(req.userId));
            // Decrement the likes
           
        }

        // Save the updated post back to the database
        const updatedPost = await post.save();

        res.json(updatedPost);
    } catch (error) {
        console.error('Error in likePost route:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
