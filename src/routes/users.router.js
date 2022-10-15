import express from "express";
import { listLinks } from "../controllers/users.controller.js";

const usersRouter = express.Router();
usersRouter.get("/users/me", listLinks);

export default usersRouter;
