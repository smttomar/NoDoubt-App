import { WebSocketServer } from "ws";
import Post from "../models/Post.js";

const startWebSocketServer = (server) => {
    const wss = new WebSocketServer({ server });

    wss.on("connection", (ws) => {
        console.log("Client connected");

        ws.on("message", async (message) => {
            try {
                const query = message.toString().trim();

                let results;

                // If empty return all posts
                if (!query) {
                    results = await Post.find();
                } else {
                    results = await Post.find({
                        title: { $regex: query, $options: "i" },
                    }).limit(50);
                }

                ws.send(JSON.stringify(results));
            } catch (error) {
                ws.send(
                    JSON.stringify({
                        error: "Search failed",
                        details: error.message,
                    }),
                );
            }
        });

        ws.on("close", () => {
            console.log("Client disconnected");
        });
    });

    console.log("WebSocket server running");
};

export default startWebSocketServer;
