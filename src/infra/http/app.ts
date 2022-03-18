import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import { errors } from "celebrate";
import { appRoutes } from "./routes";
import { AppError } from "@errors/AppError";

const app = express();

app.use(express.json());
app.use(appRoutes);

app.use(errors());
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.log(err, "message: ", err.message);
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }
  return res.status(500).json({
    status: "error",
    message: "Internal server error",
  });
});

export { app };
