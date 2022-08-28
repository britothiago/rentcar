import { Router } from "express";

export const healthcheckRoutes = Router();

healthcheckRoutes.get("/", (request, response, _next) => {
  const healthcheck = {
    uptime: process.uptime(),
    message: "Your service is online",
    timestamp: Date.now(),
  };
  try {
    response.send(healthcheck);
  } catch (error) {
    healthcheck.message = error;
    response.status(503).send();
  }
});
