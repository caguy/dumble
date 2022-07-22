import { Server } from "socket.io";
import { createServer } from "http";

interface Player {
  username: string;
}

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:4000"],
  },
});

const players = new Map<string, Player>();

io.on("connection", (socket) => {
  socket.emit(
    "all_online_players",
    Array.from(players).map(([id, player]) => player)
  );

  socket.on("username_chosen", (params: { username: string }) => {
    players.set(socket.id, { username: params.username });
  });

  socket.on("disconnect", () => {
    players.delete(socket.id);
  });
});

httpServer.listen(3000);
