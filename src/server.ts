import express from 'express';
import { categoriesRoutes } from './routes/categories.routes';

const app = express();

app.use(express.json());
app.use('/categories', categoriesRoutes);

app.listen(3334, () => console.log('Running on http://localhost:3334'));
