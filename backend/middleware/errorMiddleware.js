import * as dotenv from "dotenv";
dotenv.config();

export const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

export const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;
  if (err.name === "CastError" && err.kind === "ObjectId") {
    statusCode = 404;
    message = "Resource not found";
  }
  res.status(statusCode).json({
    message,
    email: err.email,
    password: err.password,
    registrant: err.registrant,
    matchPassword: err.matchPassword,
    stack: err.stack,
  });
};
