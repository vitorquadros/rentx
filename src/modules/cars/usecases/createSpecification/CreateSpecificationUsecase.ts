import { inject, injectable } from 'tsyringe';
import { AppError } from '@shared/errors/AppError';
import { ISpecificationRepository } from '@modules/cars/repositories/ISpecificationRepository';

interface IRequest {
  name: string;
  description: string;
}

@injectable()
export class CreateSpecificationUsecase {
  constructor(
    @inject('SpecificationsRepository')
    private specificationsRepository: ISpecificationRepository
  ) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const specificationAlreadyExists =
      await this.specificationsRepository.findByName(name);

    if (specificationAlreadyExists) {
      throw new AppError('Specification already exists');
    }

    await this.specificationsRepository.create({ name, description });
  }
}
