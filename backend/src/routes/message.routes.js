import express from "express";
import { verifyAccessToken } from "../middlewares/auth.middleware.js";
import { getIssueMessages } from "../controllers/message.controller.js";

const router = express.Router();

router.get("/messages/:issueId", verifyAccessToken, getIssueMessages);

export default router;
