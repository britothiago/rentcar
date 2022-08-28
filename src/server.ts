import express from "express";
import { categoriesRoutes } from "./routes/categories.routes";
import { healthcheckRoutes } from "./routes/healthcheck.routes";
import { specificationsRoutes } from "./routes/specifications.routes";

const app = express();
app.use(express.json());

app.use("/categories", categoriesRoutes);
app.use("/specifications", specificationsRoutes);
app.use("/health", healthcheckRoutes);

app.listen(3333);
