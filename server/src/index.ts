import express from "express";
import { config } from "dotenv";

config();

const PORT = process.env.port || 3000;

const app = express();

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
