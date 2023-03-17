import { config } from "dotenv";
import cookieParser from "cookie-parser";
import express, { Response } from "express";
import session from "express-session";
import { createServer } from "http";
import { Server } from "socket.io";
import { connect } from "./db/db";
import { User } from "./db/model/user";

config();

const SECRET: string = process.env.SECRET || "NOTsafe";
const PORT: number = +process.env.PORT || 3000;
const ORIGIN: string = process.env.ORIGIN || "*";
const MONGO_URI: string = process.env.MONGO_URI;

const app = express();
const server = createServer(app);
const io = new Server(server, { cors: { origin: ORIGIN } });
const sessionMiddleware = session({ secret: SECRET });

io.engine.use(sessionMiddleware);
app.use(sessionMiddleware);
app.use(cookieParser());

app.get("/", (_, res: Response) => {
  res.send();
});

io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("sign_up", async (data) => {
    const { username, password } = data;

    try {
      const user = await User.create({ username, password });
      console.log(username, password);
      socket.emit("signed_in", { username: user.username });
    } catch (err) {
      socket.emit("sign_up_error");
    }
  });

  socket.on("sign_in", async (data) => {
    const { username, password } = data;
    console.log(username, password);

    try {
      const user = await User.findOne({ username, password });
      if (user) {
        socket.emit("signed_in", { username });
      } else {
        socket.emit("sign_in_invalid");
      }
    } catch (err) {
      socket.emit("sign_in_error");
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(PORT, () => {
  connect(MONGO_URI);
  console.log(`Server started on port ${PORT}`);
});
