import { Firestore } from "@google-cloud/firestore";
import dotenv from "dotenv";
import express from "express";
import serverless from "serverless-http";

const api = express();
const realRouter = express.Router();

dotenv.config();

type House =
  | "Gryffindor"
  | "Hufflepuff"
  | "Ravenclaw"
  | "Slytherin"
  | undefined;

const db = new Firestore({
  projectId: "teolia-apprentice",
  credentials: {
    client_email: process.env.CLIENT_EMAIL,
    private_key: process.env.PRIVATE_KEY,
  },
});

const studentsCollection = db.collection("students");

const fetchStudents = async (house?: House, page?: number) => {
  let maxPage = 1;
  let students = (await studentsCollection.get()).docs.map((student: any) =>
    student.data()
  );

  if (house) {
    students = students.filter((student: any) => student.house === house);
  }

  if (page) {
    maxPage = Math.ceil(students.length / 8);
    students = students.slice(((page || 1) - 1) * 8, (page || 1) * 8);
  }

  return { students: students, maxPage: maxPage };
};

realRouter.get("/students", function (req, res, next) {
  let house = req.query.house as House;
  let page = req.query.page as number | undefined;

  if (page && page < 1) {
    res.status(400).json({ error: "Invalid page number" });
    return;
  }

  fetchStudents(house, page).then(
    ({ students, maxPage }: { students: any; maxPage: number | undefined }) => {
      res.json({ students, maxPage });
    }
  );
});

realRouter.get("/randomstudent", function (req, res, next) {
  fetchStudents().then((result: any) => {
    const randomIndex = Math.floor(Math.random() * result.students.length);
    res.json(result.students[randomIndex]);
  });
});

api.use("/real/", realRouter);

export const handler = serverless(api);

export default realRouter;
