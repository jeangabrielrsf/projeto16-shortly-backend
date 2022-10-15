import express from "express";
import { shortenUrl } from "../controllers/urls.controller.js";

const urlsRouter = express.Router();
urlsRouter.post("/urls/shorten", shortenUrl);

export default urlsRouter;
