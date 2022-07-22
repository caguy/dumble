import express from "express";
import { Server } from "socket.io";
import http from "http";

interface Player {
  name: string;
  socketId: string;
}

const app = express();
const server = http.createServer(app);
const socket = new Server(server);

const players: Player[] = [];

socket.on("connection", (socket) => {
  console.log("a user connected");
});

app.listen(3000, () => console.log("App listening on port 3000"));
