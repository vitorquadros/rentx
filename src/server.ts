import express from 'express';
import { router } from './routes';

const app = express();

app.use(express.json());

app.use(router);

app.listen(3334, () => console.log('Running on http://localhost:3334'));
