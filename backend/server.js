import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import axios from "axios";
import dotenv from "dotenv";
import postRouter from "./routes/postRoutes.js";
import http from "http";
import startWebSocketServer from "./websocket/socket.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", postRouter);
const server = http.createServer(app);

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));

startWebSocketServer(server);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
