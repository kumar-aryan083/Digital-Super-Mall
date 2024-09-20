import express from "express";
import { editHome, getHomeRow } from "../controllers/home.controller.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

router.get("/get", getHomeRow);
router.post("/edit", verifyToken, editHome);

export default router;