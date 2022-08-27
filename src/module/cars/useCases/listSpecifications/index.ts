import { SpecificationRepository } from "../../repositories/implementarions/SpecificationsRepository";
import { ListSpecificationsController } from "./ListSpecificationsController";
import { ListSpecificationUseCase } from "./ListSpecificationUseCase";

const listSpecificationUseCase = new ListSpecificationUseCase(
  SpecificationRepository.getInstance()
);
export const listSpecificationsController = new ListSpecificationsController(
  listSpecificationUseCase
);
