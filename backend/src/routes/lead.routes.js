import express from "express";
import { getAllStaff } from "../controllers/lead.controller.js";
const router = express.Router();
router.get("/getstaff", getAllStaff);
export default router;
