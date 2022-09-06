import { Request, Response } from "express";
import { container } from "tsyringe";
import { CarsRepository } from "../../repositories/implementarions/CarsRepository";

export class ListCarsController {
  async handle(request: Request, response: Response) {
    const repository = container.resolve(CarsRepository);
    const cars = await repository.list();
    return response.json(cars);
  }
}