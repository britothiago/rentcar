import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import swaggerUI from "swagger-ui-express";

import "./database";
import "./shared/container";

import { categoriesRoutes } from "./routes/categories.routes";
import { healthcheckRoutes } from "./routes/healthcheck.routes";
import { specificationsRoutes } from "./routes/specifications.routes";
import { accountsRoutes } from "./routes/accounts.routes";

import swaggerFile from "./swagger.json";
import { authenticateRoutes } from "./routes/authenticate.routes";
import { AppError } from "./errors/AppError";

const app = express();
app.use(express.json());
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerFile));

app.use("/categories", categoriesRoutes);
app.use("/specifications", specificationsRoutes);
app.use("/accounts", accountsRoutes);
app.use("/health", healthcheckRoutes);
app.use("/auth", authenticateRoutes);

app.use(
  (
    err: { statusCode: number; message: string },
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    if (err instanceof AppError) {
      response.status(err.statusCode);
      response.json({
        message: err.message,
      });
    }

    response.status(500);
    response.json({
      status: "error",
      message: `Internal server error | ${err.message}`,
    });

    next(err);
  }
);

app.listen(3333);
