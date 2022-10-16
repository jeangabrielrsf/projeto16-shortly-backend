import express from "express";
import { getRanking } from "../controllers/rankings.controller.js";

const rankingsRouter = express.Router();
rankingsRouter.get("/ranking", getRanking);

export default rankingsRouter;
