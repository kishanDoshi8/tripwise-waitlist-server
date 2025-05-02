"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Queue = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const redis_adapter_1 = require("../libs/job-queue/redis-adapter");
const worker_1 = require("../libs/job-queue/worker");
const email_1 = require("../libs/email");
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({
    path: path_1.default.resolve(__dirname, '../.env'),
});
exports.Queue = new redis_adapter_1.RedisQueue('redis://localhost:6379', 'email-queue');
const worker = new worker_1.Worker(exports.Queue, async (job) => {
    console.log(`Job started: ${job.name}`);
    const { email, subject, body } = job.data;
    await (0, email_1.sendEmail)(email, subject, body);
});
const config = {
    startWorker: () => {
        console.log('worker started');
        worker.start();
    },
};
exports.default = config;
