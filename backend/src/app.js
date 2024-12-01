import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import connectToSocket from "./controllers/socketManager.js";

dotenv.config();

const app = express();
const server = createServer(app);
const io = connectToSocket(server);

app.set("port", process.env.PORT || 8080);
const uri = process.env.URI;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware
app.use(cors());
app.use(express.json({limit: "40kb"}));
app.use(express.urlencoded({limit: "40kb",extended: true}));

// Routes
app.get("/home", (req, res) => {
  res.send("Welcome to the home page");
});

const start = async () => {
  try {
    // Connect to MongoDB
    await client.connect();
    console.log(
      `Connected to MongoDB successfully! Host: ${client.s.options.srvHost}`
    );

    // Start the server
    server.listen(app.get("port"), () => {
      console.log(`Server is running on port ${app.get("port")}`);
    });
  } catch (err) {
    console.error("MongoDB Connection Error:", err.message);
  }
};

start();
