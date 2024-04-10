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
  fetchStudents().then((data: any) => {
    res.json(data);
  });
});

realRouter.get("/randomstudent", function (req, res, next) {
  fetchStudents().then((data: any) => {
    const randomIndex = Math.floor(Math.random() * data.length);
    res.json(data[randomIndex]);
  });
});

export default realRouter;
