import app from './app';
import config from './config/config';
import dotenv from 'dotenv';

dotenv.config();

// start job-queue
config.startWorker();

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});