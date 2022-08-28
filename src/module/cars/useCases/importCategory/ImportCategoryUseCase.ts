import fs from "fs";
import { parse } from "csv-parse";
import { CategoriesRepository } from "../../repositories/implementarions/CategoriesRepository";

interface IImportCategories {
  name: string;
  description: string;
}

interface IImportCategoriesEmpty {
  message: string;
}

export class ImportCategoryUseCase {
  private categories: IImportCategories[];
  constructor(private categoryRepository: CategoriesRepository) {
    this.categories = [];
  }

  loadCategories(file: Express.Multer.File): Promise<IImportCategories[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);
      const parseFile = parse();
      stream.pipe(parseFile);

      parseFile
        .on("data", (line) => {
          const [name, description] = line;
          this.categories.push({
            name,
            description,
          });
        })
        .on("end", () => {
          resolve(this.categories);
        })
        .on("error", (err) => {
          reject(err);
        });
    });
  }

  async execute(
    categories: IImportCategories[]
  ): Promise<IImportCategories[] | IImportCategoriesEmpty> {
    this.categories = [];
    categories.map((categoryFromCategories) => {
      const { name, description } = categoryFromCategories;

      if (!this.categoryRepository.findByName(name)) {
        const category = this.categoryRepository.create({
          name,
          description,
        });
        this.categories.push(category);
      }
    });

    return this.categories.length
      ? this.categories
      : { message: "No data imported. All categories already exists" };
  }
}
