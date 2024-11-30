import express from "express";
import {createServer} from "node:http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import cors from "cors";



const app = express();
const server = createServer(app);
const io = new Server(server);

app.set("port", (process.env.PORT || 8080));

app.get("/home",(req,res) => {
    res.send("Welcome to home page");
});

const start = async () => {
    app.listen(app.get("port"),() => {
        console.log("Server is running on port 8080");
    })
}

start();