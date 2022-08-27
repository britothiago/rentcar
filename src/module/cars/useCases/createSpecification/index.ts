import { SpecificationRepository } from "../../repositories/implementarions/SpecificationsRepository";
import { CreateSpecificationController } from "./CreateSpecificationController";
import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

const createSpecitificationUseCase = new CreateSpecificationUseCase(
  SpecificationRepository.getInstance()
);
export const createSpecificationController = new CreateSpecificationController(
  createSpecitificationUseCase
);
