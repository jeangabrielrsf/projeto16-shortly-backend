import express from "express";
import authRouter from "./auth.router.js";
import urlsRouter from "./urls.router.js";

const router = express.Router();
router.use(authRouter);
router.use(urlsRouter);

export default router;
