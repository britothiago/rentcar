import express from "express";
import swaggerUI from "swagger-ui-express";

import "./database";
import "./shared/container";

import { categoriesRoutes } from "./routes/categories.routes";
import { healthcheckRoutes } from "./routes/healthcheck.routes";
import { specificationsRoutes } from "./routes/specifications.routes";
import { accountsRoutes } from "./routes/accounts.routes";

import swaggerFile from "./swagger.json";

const app = express();
app.use(express.json());
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerFile));

app.use("/categories", categoriesRoutes);
app.use("/specifications", specificationsRoutes);
app.use("/accounts", accountsRoutes);
app.use("/health", healthcheckRoutes);

app.listen(3333);
