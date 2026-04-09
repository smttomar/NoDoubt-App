import { WebSocketServer } from "ws";
import Post from "../models/post.js";

const startWebSocketServer = (server) => {
    const wss = new WebSocketServer({ port: process.env.WS_PORT || 8080 });

    wss.on("connection", (ws) => {
        console.log("Client connected");

        ws.on("message", async (message) => {
            try {
                const query = message.toString().trim();

                // Search in DB (case insensitive)
                const results = await Post.find({
                    title: { $regex: query, $options: "i" },
                }).limit(20);

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
