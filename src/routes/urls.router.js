import express from "express";
import { getUrl, shortenUrl } from "../controllers/urls.controller.js";

const urlsRouter = express.Router();
urlsRouter.post("/urls/shorten", shortenUrl);
urlsRouter.get("/urls/:id", getUrl);

export default urlsRouter;
