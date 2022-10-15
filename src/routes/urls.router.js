import express from "express";
import {
	getUrl,
	redirectToUrl,
	shortenUrl,
} from "../controllers/urls.controller.js";

const urlsRouter = express.Router();
urlsRouter.post("/urls/shorten", shortenUrl);
urlsRouter.get("/urls/:id", getUrl);
urlsRouter.get("/urls/open/:shortUrl", redirectToUrl);

export default urlsRouter;
