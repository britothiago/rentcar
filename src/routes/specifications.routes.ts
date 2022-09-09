import { Router } from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { CreateSpecificationController } from "../module/cars/useCases/createSpecification/CreateSpecificationController";
import { ListSpecificationsController } from "../module/cars/useCases/listSpecifications/ListSpecificationsController";

export const specificationsRoutes = Router();
const createSpecificationController = new CreateSpecificationController();
const listSpecificationsController = new ListSpecificationsController();

specificationsRoutes.get("/", listSpecificationsController.handle);
specificationsRoutes.use(isAuthenticated);
specificationsRoutes.post("/", createSpecificationController.handle);
