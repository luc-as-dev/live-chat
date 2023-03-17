import express, { Response } from "express";
import { config } from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";

config();

const PORT = process.env.port || 3000;
const ORIGIN = process.env.port || "*";

const app = express();
const server = createServer(app);
const io = new Server(server, { cors: { origin: ORIGIN } });

app.get("/", (_, res: Response) => {
  res.send();
});

io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
