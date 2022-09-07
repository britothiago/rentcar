import { Request, Response, Router } from "express";
import { isAdmin } from "../middlewares/isAdmin";
import { CreateCarController } from "../module/cars/useCases/createCar/CreateCarController";
import { ListCarsController } from "../module/cars/useCases/listCar/ListCarsController";

export const carsRoutes = Router();

const createCarController = new CreateCarController();
const listCarsController = new ListCarsController();

carsRoutes.get("/name/:name", listCarsController.handle);
carsRoutes.get("/category/:category_id", listCarsController.handle);
carsRoutes.get("/brand/:brand", listCarsController.handle);
carsRoutes.get("/available/:available", listCarsController.handle);
carsRoutes.get("/", listCarsController.handle);
carsRoutes.use(isAdmin);
carsRoutes.post("/", createCarController.handle);
