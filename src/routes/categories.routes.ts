import { Router } from 'express';
import { v4 as uuid } from 'uuid';
import { Category } from '../model/Category';

const categoriesRoutes = Router();

const categories: Category[] = [];

categoriesRoutes.post('/', (req, res) => {
  const { name, description } = req.body;

  const category: Category = {
    name,
    description,
    id: uuid(),
    created_at: new Date(),
  };
  categories.push(category);

  return res.status(201).send();
});

export { categoriesRoutes };
