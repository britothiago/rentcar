import { Specification } from "../../model/Specification";
import {
  ISpecificationDTO,
  ISpecificationRepository,
} from "../ISpeciticationsRepository";

export class SpecificationRepository implements ISpecificationRepository {
  private specificationList: Specification[];

  private static INSTANTE: SpecificationRepository;

  private constructor() {
    this.specificationList = [];
  }

  public static getInstance(): SpecificationRepository {
    return SpecificationRepository.INSTANTE
      ? SpecificationRepository.INSTANTE
      : (SpecificationRepository.INSTANTE = new SpecificationRepository());
  }

  findByName(name: string): Specification {
    const specification = this.specificationList.find(
      (specificationName) => specificationName.name === name
    );
    return specification ? specification : null;
  }

  create({ name, description }: ISpecificationDTO): Specification {
    const specification = new Specification();
    Object.assign(specification, {
      name,
      description,
    });
    this.specificationList.push(specification);
    return specification;
  }

  list(): Specification[] {
    return this.specificationList;
  }
}
