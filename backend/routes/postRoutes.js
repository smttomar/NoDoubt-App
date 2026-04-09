import axios from "axios";
import Post from "../models/post.js";
import express, { json } from "express";

const router = express.Router();

router.get("/fetch-posts", async (req, res) => {
    try {
        const response = await axios.get(
            "https://jsonplaceholder.typicode.com/posts",
        );

        const posts = response.data;

        // Clear old data (important to avoid duplicates)
        await Post.deleteMany();

        const savedPosts = await Post.insertMany(posts)(
            res.status(200),
            json({
                message: "Posts fetched and stored successfully",
                data: savedPosts,
            }),
        );
    } catch (error) {
        res.status(500).json({
            message: "Error fetching posts",
            error: error.message,
        });
    }
});

// Get all posts
router.get("/posts", async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });

        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching posts",
            error: error.message,
        });
    }
});

// Get single post by ID
router.get("/posts/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                message: "Post not found",
            });
        }

        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching post",
            error: error.message,
        });
    }
});

export default router;
