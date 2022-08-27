import { Router } from "express";
import multer from "multer";
import { createCategoryController } from "../module/cars/useCases/createCategory";
import { listCategoriesController } from "../module/cars/useCases/listCategories";

const upload = multer({
  dest: "./tmp",
});

export const categoriesRoutes = Router();

categoriesRoutes.post("/", (request, response) => {
  return createCategoryController.handle(request, response);
});

categoriesRoutes.post("/import", upload.single("file"), (request, response) => {
  const { file } = request;
  return response.send();
});

categoriesRoutes.get("/", (request, response) => {
  return listCategoriesController.handle(request, response);
});
