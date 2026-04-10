import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        userId: {
            type: Number,
        },
        title: {
            type: String,
            required: true,
        },
        body: {
            type: String,
            required: true,
        },
    },
    { timestamps: true },
);

const Post = mongoose.model("Post", postSchema);

export default Post;
