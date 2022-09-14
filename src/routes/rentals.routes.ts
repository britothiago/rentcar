import { Router } from "express";
import { isAdmin } from "../middlewares/isAdmin";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { CreateRentalController } from "../module/rentals/useCases/CreateRentalController";

export const rentalsRoute = Router();

const createRentalController = new CreateRentalController();

rentalsRoute.use(isAuthenticated, isAdmin);
rentalsRoute.post("/", createRentalController.handle);
