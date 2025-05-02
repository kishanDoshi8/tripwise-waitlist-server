import express from 'express';
import cors from 'cors';
import { errorHandler } from './middlewares/errorHandler';
import surveyRoutes from './routes/surveyRoutes';

const app = express();

let corsOrigin;
if (process.env.NODE_ENV === 'development') {
    corsOrigin = 'http://localhost:5173';
} else {
    corsOrigin = 'https://tripwise.group'; // production
}

app.use(
    cors({
        origin: corsOrigin,
    })
);
app.use(express.json());

// Routes
app.use('/api/surveys', surveyRoutes);

app.use(errorHandler);

export default app;
