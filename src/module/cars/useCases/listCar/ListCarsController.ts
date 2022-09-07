import { Request, Response } from "express";
import { container } from "tsyringe";
import { CarsRepository } from "../../repositories/implementations/CarsRepository";
export class ListCarsController {
  async handle(request: Request, response: Response) {
    const repository = container.resolve(CarsRepository);
    const cars = await repository.list(request.params);
    return response.json(cars);
  }
}
