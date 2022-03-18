import express from "express";
import { app } from "./app";
import dotenv from "dotenv";
dotenv.config();

const server = express();
server.use(app);

server.listen(process.env.PORT, () =>
  console.info(`🚀 server running at http://localhost:${process.env.PORT} ⚡`)
);
