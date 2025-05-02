import mongoose from 'mongoose';
import app from './app';
import config from './config/config';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.MONGODB_URI;
if (connectionString) {
    mongoose.connect(connectionString)
        .then(() => console.log('Database connected...'))
        .catch(err => console.log('Database connection error \n', err))
} else {
    console.error('Missing database connection string');
}

// start job-queue
config.startWorker();

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});