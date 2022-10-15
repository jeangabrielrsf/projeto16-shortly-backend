import express from "express";
import authRouter from "./auth.router.js";
import urlsRouter from "./urls.router.js";
import usersRouter from "./users.router.js";

const router = express.Router();
router.use(authRouter);
router.use(urlsRouter);
router.use(usersRouter);

export default router;
