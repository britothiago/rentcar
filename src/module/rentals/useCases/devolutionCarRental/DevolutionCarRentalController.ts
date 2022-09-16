import { Request, Response } from "express";
import { container } from "tsyringe";
import { Repository } from "typeorm";
import { Rental } from "../../entities/Rental";
import { DevolutionCarRentalUseCase } from "./DevolutionCarRentalUseCase";

export class DevolutionCarRentalController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const devolutionCarRentalUseCase = container.resolve(
      DevolutionCarRentalUseCase
    );
    await devolutionCarRentalUseCase.execute({ id_user: id });
    return response.status(200).send();
  }
}
