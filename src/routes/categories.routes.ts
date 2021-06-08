import { Router } from 'express';
import { v4 as uuid } from 'uuid';

const categoriesRoutes = Router();

const categories = [];

categoriesRoutes.post('/', (req, res) => {
  const { name, description } = req.body;

  const category = {
    name,
    description,
    id: uuid(),
  };
  categories.push(category);

  return res.status(201).send();
});

export { categoriesRoutes };
