import { Firestore } from "@google-cloud/firestore";
import express from "express";
const realRouter = express.Router();

type House =
  | "Gryffindor"
  | "Hufflepuff"
  | "Ravenclaw"
  | "Slytherin"
  | undefined;

const db = new Firestore({
  projectId: "teolia-apprentice",
  keyFilename: "./src/keyfile.json",
});

const studentsCollection = db.collection("students");

const fetchStudents = async (house?: House) => {
  const students = await studentsCollection.get();

  if (house) {
    return students.docs
      .map((student) => student.data())
      .filter((student) => student.house === house);
  }

  return students.docs.map((student) => student.data());
};

realRouter.get("/", function (req, res, next) {
  res.send("This is real route");
});

realRouter.get("/students", function (req, res, next) {
  let house = req.query.house as House;

  fetchStudents(house).then((students: any) => {
    res.json(students);
  });
});

realRouter.get("/randomstudent", function (req, res, next) {
  fetchStudents().then((students: any) => {
    const randomIndex = Math.floor(Math.random() * students.length);
    res.json(students[randomIndex]);
  });
});

export default realRouter;
