// install dependencies
const { execSync } = require("child_process");
execSync("npm install");
execSync("npm run seed");

const request = require("supertest");
const { db } = require("./db/connection");
const { Musician } = require("./models/index");
const app = require("./src/app");
const { seedMusician } = require("./seedData");

// describe("./musicians endpoint", () => {
//   // Write your tests here
//   test("Testing musicians endpoint", async () => {
//     const response = await request(app).get("/musicians");
//     expect(response.statusCode).toBe(200);
//     const responseData = JSON.parse(response.text);
//     console.log(responseData);
//     expect(Array.isArray(responseData)).toBe(true);
//   });
//   it("should return a musician by ID", async () => {
//     const musician = await Musician.findOne({ where: { name: "Mick Jagger" } });
//     const response = await request(app).get(`/musicians/${musician.id}`);
//     expect(response.status).toBe(200);
//     expect(response.body).toHaveProperty("name", "Mick Jagger");
//     expect(response.body).toHaveProperty("instrument", "Voice");
//   });
//   it("should create new musician", async () => {
//     const response = await request(app)
//       .post("/musicians")
//       .send({ name: "George", instrument: "Piano" });
//     expect(response.status).toBe(200);
//     expect(response.body).toHaveProperty("name", "George");
//     expect(response.body).toHaveProperty("instrument", "Piano");
//   });
//   // it("should update a musician", async () => {
//   //   const response = (await request(app).put("/musicians")).setEncoding({name: "George1", instrument: "Piano1"})
//   //   expect(response.status).

//   // })
// });
let restQuantity;
beforeAll(async () => {
  const musicians = await Musician.findAll({});
  restQuantity = musicians.length;
});
// describe("POST /musicians", () => {
//   it("should create a new musician", async () => {
//     const newMusician = { name: "Jacky", instrument: "Piano" };
//     const response = await request(app)
//       .post("/musicians")
//       .send(newMusician)
//       .expect(201);
//     expect(response.body.name).toBe(newMusician.name);
//     expect(response.body.instrument).toBe(newMusician.instrument);
//   });
// });
describe("Should test name & instrument validation", () => {
  test("Should return validation error if name field is empty", async () => {
    const response = await request(app).post("/musicians").send({
      instrument: "Guitar",
    });
    expect(response.statusCode).toBe(400);
    expect(response.body.errors).toEqual([
      {
        msg: "Name is required",
        path: "name",
        location: "body",
        type: "field",
      },
    ]);
  });
  test("Should return validation error if instrument field is empty", async () => {
    const response = await request(app).post("/musicians").send({
      name: "John",
    });
    expect(response.statusCode).toBe(400);
    expect(response.body.errors).toEqual([
      {
        msg: "Instrument is required",
        path: "instrument",
        location: "body",
        type: "field",
      },
    ]);
  });
});
