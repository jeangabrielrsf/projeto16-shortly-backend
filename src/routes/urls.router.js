import express from "express";
import {
	deleteUrl,
	getUrl,
	redirectToUrl,
	shortenUrl,
} from "../controllers/urls.controller.js";

const urlsRouter = express.Router();
urlsRouter.post("/urls/shorten", shortenUrl);
urlsRouter.get("/urls/:id", getUrl);
urlsRouter.get("/urls/open/:shortUrl", redirectToUrl);
urlsRouter.delete("/urls/:id", deleteUrl);

export default urlsRouter;
