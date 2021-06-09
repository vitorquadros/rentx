import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';
import { Category } from '../../model/Category';

export class ListCategoriesUsecase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  execute(): Category[] {
    const categories = this.categoriesRepository.list();
    return categories;
  }
}
