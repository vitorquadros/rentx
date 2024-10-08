import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UploadCarImagesUsecase } from './UploadCarImagesUsecase';

interface IFiles {
  filename: string;
}

export class UploadCarImagesController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const images = req.files as IFiles[];

    const uploadCarImagesUsecase = container.resolve(UploadCarImagesUsecase);

    const images_name = images.map((file) => file.filename);

    await uploadCarImagesUsecase.execute({
      car_id: id,
      images_name,
    });

    return res.status(201).send();
  }
}
