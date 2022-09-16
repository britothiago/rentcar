import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateRentalUseCase } from "./CreateRentalUseCase";

export class CreateRentalController {
  async handle(request: Request, response: Response) {
    const { car_id, expect_return_date, start_date, user_id } = request.body;

    const createRentalUseCase = container.resolve(CreateRentalUseCase);
    const rental = await createRentalUseCase.execute({
      car_id,
      expect_return_date,
      start_date,
      user_id,
    });
    return response.status(201).json(rental);
  }
}
