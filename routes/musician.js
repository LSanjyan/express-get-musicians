const express = require("express");
const { Musician } = require("../models");
const router = express.Router();
const { check, validationResult } = require("express-validator");

//POST with validation
router.post(
  "/",
  [
    check("name").notEmpty().withMessage("Name is required"),
    check("instrument").notEmpty().withMessage("Instrument is required"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    musician.push(req.body);
    res.status(201).json(musician);
  }
);

// CREATE a new musician
// router.post("/", async (req, res) => {
//   try {
//     const musician = await Musician.create(req.body);
//     res.status(201).json(musician);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// READ all musicians
router.get("/", async (req, res, next) => {
  try {
    const musicians = await Musician.findAll();
    res.json(musicians);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// READ a specific musician by ID
router.get("/:id", async (req, res, next) => {
  try {
    const musician = await Musician.findByPk(req.params.id);
    if (!musician) {
      return res.status(404).json({ error: "Musician not found" });
    }
    res.json(musician);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// UPDATE a musician by ID
router.put("/:id", async (req, res, next) => {
  try {
    const musician = await Musician.findByPk(req.params.id);
    if (!musician) {
      return res.status(404).json({ error: "Musician not found" });
    }
    const updatedMusician = await musician.update(req.body);
    res.json(updatedMusician);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// DELETE musician by ID
router.delete("/:id", async (req, res, next) => {
  try {
    const musician = await Musician.findByPk(req.params.id);
    if (!musician) {
      return res.status(404).json({ error: "Musician not found" });
    }
    await musician.destroy();
    res.status(204).send(); // No content
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
