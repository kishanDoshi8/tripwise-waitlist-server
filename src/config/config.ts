import dotenv from 'dotenv';
import { RedisQueue } from '../libs/job-queue/redis-adapter';
import { Worker } from '../libs/job-queue/worker';
import { sendEmail } from '../libs/email';
import path from 'path';

dotenv.config({
    path: path.resolve(__dirname, '../.env'),
});

export const Queue = new RedisQueue<{ email: string, subject: string, body: string }>(
    'redis://localhost:6379',
    'email-queue',
)

const worker = new Worker(
    Queue,
    async job => {
        console.log(`Job started: ${job.name}`);
        const { email, subject, body } = job.data;
        await sendEmail(email, subject, body);
    },
)

interface Config {
    port: number;
    nodeEnv: string;
    mongoDb: string;
    startWorker: () => void;
}

const config: Config = {
    port: Number(process.env.PORT) || 3000,
    nodeEnv: process.env.NODE_ENV ?? 'development',
    mongoDb: process.env.MONGODB_URI ?? '',
    startWorker: () => {
        console.log('worker started');
        worker.start();
    },
};

export default config;