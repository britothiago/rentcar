import { Request, Response, Router } from "express";
import { CreateCarController } from "../module/cars/useCases/createCar/CreateCarController";
import { ListCarsController } from "../module/cars/useCases/listCar/ListCarsController";

export const carsRoutes = Router();

const createCarController = new CreateCarController();
const listCarsController = new ListCarsController();

carsRoutes.post("/", createCarController.handle);
carsRoutes.get("/", listCarsController.handle);
