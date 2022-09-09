import { Router } from "express";
import multer from "multer";
import upload from "../config/upload";
import { isAdmin } from "../middlewares/isAdmin";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { CreateUserController } from "../module/accounts/useCases/createUser/CreateUserController";
import { ListUsersController } from "../module/accounts/useCases/listUser/ListUsersController";
import { UpdateUserAvatarController } from "../module/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";

export const accountsRoutes = Router();
const listUsersController = new ListUsersController();
const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

const uploadAvatar = multer(upload.upload("./tmp/avatar"));

accountsRoutes.use(isAuthenticated);
accountsRoutes.get("/", isAdmin, listUsersController.handle);
accountsRoutes.post(
  "/",
  uploadAvatar.single("avatar"),
  createUserController.handle
);
accountsRoutes.patch(
  "/avatar",
  uploadAvatar.single("avatar"),
  updateUserAvatarController.handle
);
