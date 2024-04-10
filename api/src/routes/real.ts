import express from "express";
const realRouter = express.Router();

realRouter.get("/", function (req, res, next) {
  res.send("This is real route");
});

realRouter.get("/students", function (req, res, next) {
  fetch(
    "https://harry-potter-api-3a23c827ee69.herokuapp.com/api/characters/students"
  )
    .then((res) => res.json())
    .then((data: any) => {
      res.json(data);
    });
});

realRouter.get("/randomstudent", function (req, res, next) {
  fetch(
    "https://harry-potter-api-3a23c827ee69.herokuapp.com/api/characters/students"
  )
    .then((res) => res.json())
    .then((data: any) => {
      const randomIndex = Math.floor(Math.random() * data.length);
      res.json(data[randomIndex]);
    });
});

export default realRouter;
