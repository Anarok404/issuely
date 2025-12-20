import express from "express";

const router = express.Router();

// basic admin placeholder route(s)
router.get("/", (req, res) => {
  res.json({ message: "Admin endpoint" });
});

export default router;
