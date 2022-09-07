import { Request, Response, Router } from "express";
import { isAdmin } from "../middlewares/isAdmin";
import { CreateCarController } from "../module/cars/useCases/createCar/CreateCarController";
import { ListCarsController } from "../module/cars/useCases/listCar/ListCarsController";

export const carsRoutes = Router();

const createCarController = new CreateCarController();
const listCarsController = new ListCarsController();

carsRoutes.use(isAdmin);
carsRoutes.post("/", createCarController.handle);
carsRoutes.get("/", listCarsController.handle);
