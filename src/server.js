import express from "express";
import router from "./routes/index.js";
import cors from "cors";

const server = express();
server.use(express.json());
server.use(cors());
server.use(router);

server.listen(4000, () => console.log("listening on port 4000..."));
