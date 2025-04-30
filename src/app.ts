import express from 'express';
import cors from 'cors';
import { errorHandler } from './middlewares/errorHandler';
import surveyRoutes from './routes/surveyRoutes';

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/surveys', surveyRoutes);

app.use(errorHandler);

export default app;
