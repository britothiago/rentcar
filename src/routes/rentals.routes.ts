import { Router } from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { CreateRentalController } from "../module/rentals/useCases/createRental/CreateRentalController";
import { DevolutionCarRentalController } from "../module/rentals/useCases/devolutionCarRental/DevolutionCarRentalController";

export const rentalsRoute = Router();

const createRentalController = new CreateRentalController();
const devolutionCarRentalController = new DevolutionCarRentalController();

rentalsRoute.use(isAuthenticated);
rentalsRoute.post("/", createRentalController.handle);
rentalsRoute.post("/devolution/:id", devolutionCarRentalController.handle);
