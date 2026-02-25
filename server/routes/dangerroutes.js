import express from "express";
import Danger from "../models/danger.js";

const router = express.Router();

/* GET all dangers */
router.get("/", async (req, res) => {
  try {
    const dangers = await Danger.find();
    res.json(dangers);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch dangers" });
  }
});

/* POST new danger */
router.post("/", async (req, res) => {
  try {
    const { category, latitude, longitude, description, location } = req.body;

    const newDanger = new Danger({
      category,
      latitude,
      longitude,
      description,
      location,
      date: new Date(),
    });

    await newDanger.save();

    res.status(201).json(newDanger);
  } catch (err) {
    res.status(500).json({ error: "Failed to save danger" });
  }
});

export default router;
