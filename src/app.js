const express = require("express");
const app = express();
//const { Musician } = require("../models/index");
const { db } = require("../db/connection");
const musicianRouter = require("../routes/musician");
const port = 3000;

//TODO: Create a GET /musicians route to return all musicians
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// app.use(express.json());

app.use("/musicians", musicianRouter);

// app.get("/musicians", async (req, res) => {
//   const musicians = await Musician.findAll({});
//   res.json(musicians);
// });
// //read
// app.get("/musicians/:id", async (req, res) => {
//   const num = req.params.id;
//   const musician = await Musician.findByPk(num);
//   res.json(musician);
// });
// //create
// app.post("/musicians", async (req, res) => {
//   const musician = await Musician.create(req.body);
//   res.json(musician);
// });
// //update
// app.put("/musicians", async (req, res) => {
//   const updatedRest = await Musician.update(req.body, {
//     where: { id: req.params.id },
//   });
//   res.json(updatedRest);
// });
// app.delete("/musicians/:id", async (req, res) => {
//   const deletedRest = await Musician.destroy({
//     where: { id: req.params.id },
//   });
//   res.json(deletedRest);
// });

module.exports = app;
