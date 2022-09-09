import { Request, Response, Router } from "express";
import { isAdmin } from "../middlewares/isAdmin";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { CreateCarController } from "../module/cars/useCases/createCar/CreateCarController";
import { CreateCarSpecificationController } from "../module/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { ListCarsController } from "../module/cars/useCases/listCar/ListCarsController";

export const carsRoutes = Router();

const createCarController = new CreateCarController();
const listCarsController = new ListCarsController();
const createCarSpecificationUseCase = new CreateCarSpecificationController();

carsRoutes.get("/name/:name", listCarsController.handle);
carsRoutes.get("/category/:category_id", listCarsController.handle);
carsRoutes.get("/brand/:brand", listCarsController.handle);
carsRoutes.get("/available/:available", listCarsController.handle);
carsRoutes.get("/", listCarsController.handle);
carsRoutes.use(isAuthenticated);
carsRoutes.use(isAdmin);
carsRoutes.post("/", createCarController.handle);
carsRoutes.post("/specifications/:id", createCarSpecificationUseCase.handle);
