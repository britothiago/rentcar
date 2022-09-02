import { Router } from "express";
import { CreateSpecificationController } from "../module/cars/useCases/createSpecification/CreateSpecificationController";
import { ListSpecificationsController } from "../module/cars/useCases/listSpecifications/ListSpecificationsController";

export const specificationsRoutes = Router();
const createSpecificationController = new CreateSpecificationController();
const listSpecificationsController = new ListSpecificationsController();

specificationsRoutes.post("/", createSpecificationController.handle);
specificationsRoutes.get("/", listSpecificationsController.handle);
