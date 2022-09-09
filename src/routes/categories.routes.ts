import { Router } from "express";
import multer from "multer";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { CreateCategoryController } from "../module/cars/useCases/createCategory/CreateCategoryController";
import { ImportCategoryController } from "../module/cars/useCases/importCategory/ImportCategoryController";
import { ListCategoriesController } from "../module/cars/useCases/listCategories/ListCategoriesController";

const upload = multer({
  dest: "./tmp",
});

export const categoriesRoutes = Router();
const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();
const importCategoryController = new ImportCategoryController();

categoriesRoutes.get("/", listCategoriesController.handle);
categoriesRoutes.use(isAuthenticated);
categoriesRoutes.post("/", createCategoryController.handle);
categoriesRoutes.post(
  "/import",
  upload.single("file"),
  importCategoryController.handle
);
