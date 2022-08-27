import { Router } from "express";
import { createSpecificationController } from "../module/cars/useCases/createSpecification";
import { listSpecificationsController } from "../module/cars/useCases/listSpecifications";

export const specificationsRoutes = Router();

specificationsRoutes.post("/", (request, response) => {
  return createSpecificationController.handle(request, response);
});

specificationsRoutes.get("/", (request, response) => {
  return listSpecificationsController.handle(request, response);
});
