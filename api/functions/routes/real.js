"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firestore_1 = require("@google-cloud/firestore");
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const realRouter = express_1.default.Router();
dotenv_1.default.config();
const db = new firestore_1.Firestore({
    projectId: "teolia-apprentice",
    credentials: {
        client_email: process.env.CLIENT_EMAIL,
        private_key: process.env.PRIVATE_KEY,
    },
});
const studentsCollection = db.collection("students");
const fetchStudents = async (house, page) => {
    let maxPage = undefined;
    let students = (await studentsCollection.get()).docs.map((student) => student.data());
    if (house) {
        students = students.filter((student) => student.house === house);
    }
    if (page) {
        maxPage = Math.ceil(students.length / 8);
        students = students.slice(((page || 1) - 1) * 8, (page || 1) * 8);
    }
    return { students: students, maxPage: maxPage };
};
realRouter.get("/", function (req, res, next) {
    res.send("This is real route");
});
realRouter.get("/students", function (req, res, next) {
    let house = req.query.house;
    let page = req.query.page;
    if (page && page < 1) {
        res.status(400).json({ error: "Invalid page number" });
        return;
    }
    fetchStudents(house, page).then(({ students, maxPage }) => {
        res.json({ students, maxPage });
    });
});
realRouter.get("/randomstudent", function (req, res, next) {
    fetchStudents().then((result) => {
        const randomIndex = Math.floor(Math.random() * result.students.length);
        res.json(result.students[randomIndex]);
    });
});
exports.default = realRouter;
