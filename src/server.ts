import mongoose from 'mongoose';
import app from './app';
import config from './config/config';

const connectionString = config.mongoDb;
if (connectionString) {
    mongoose.connect(connectionString)
        .then(() => console.log('Database connected...'))
        .catch(err => console.log('Database connection error \n', err))
} else {
    console.error('Missing database connection string');
}

// start job-queue
config.startWorker();

app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
});