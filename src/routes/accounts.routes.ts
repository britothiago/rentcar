import { Router } from "express";
import { CreateUserController } from "../module/accounts/useCases/createUser/CreateUserController";
import { ListUsersController } from "../module/accounts/useCases/listUser/ListUsersController";

export const accountsRoutes = Router();
const listUsersController = new ListUsersController();
const createUserController = new CreateUserController();

accountsRoutes.get("/", listUsersController.handle);
accountsRoutes.post("/", createUserController.handle);
