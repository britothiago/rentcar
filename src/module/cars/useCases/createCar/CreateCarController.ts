import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCarUseCase } from "./createCarUseCase";

export class CreateCarController {
  async handle(request: Request, response: Response) {
    const {
      name,
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_place,
    } = request.body;
    const createCarUseCase = container.resolve(CreateCarUseCase);
    const car = await createCarUseCase.execute({
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_place,
      name,
    });
    return response.status(201).json(car);
  }
}
