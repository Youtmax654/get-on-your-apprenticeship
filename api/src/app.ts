import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import createError from "http-errors";
import logger from "morgan";
import path from "path";
import serverless from "serverless-http";

import errorHandler from "./error-handler";
import dummyRouter from "./routes/dummy";
import realRouter from "./routes/real";
import usersRouter from "./routes/users";

const app = express();
app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/users", usersRouter);
app.use("/dummy", dummyRouter);
app.use("/real", realRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(errorHandler);

export const handler = serverless(app);

export default app;
