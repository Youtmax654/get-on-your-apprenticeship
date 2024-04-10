import { Firestore } from "@google-cloud/firestore";
import express from "express";
const realRouter = express.Router();

const db = new Firestore({
  projectId: "teolia-apprentice",
  keyFilename: "./src/keyfile.json",
});

const studentsCollection = db.collection("students");

const fetchStudents = async () => {
  const students = await studentsCollection.get();
  console.log(students.docs.map((student) => student.data()));
  return students.docs.map((student) => student.data());
};

realRouter.get("/", function (req, res, next) {
  res.send("This is real route");
});

realRouter.get("/students", function (req, res, next) {
  fetchStudents().then((students: any) => {
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
