import express from "express";
import router from "./routes/index.js";
import cors from "cors";

const server = express();
server.use(express.json());
server.use(cors());
server.use(router);

server.listen(process.env.PORT, () =>
	console.log(`Listening on port ${process.env.PORT} ....`)
);
