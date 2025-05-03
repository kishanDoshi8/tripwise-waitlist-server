"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Queue = void 0;
const uuid_1 = require("uuid");
class Queue {
    constructor(queueName, options = { retryAttempts: 5, retryDelay: 1000 }) {
        this.queueName = queueName;
        this.options = options;
    }
    async addJob(job) {
        const id = job.id ?? (0, uuid_1.v4)();
        if ((job.options?.retry?.totalAttempts ?? 0) >=
            (job.options?.retry?.maxAttempts ?? 1)) {
            return id;
        }
        await this.push({
            ...job,
            id,
            options: {
                delay: job.options?.delay ?? 0,
                priority: job.options?.priority ?? 0,
                retry: {
                    totalAttempts: job.options?.retry?.totalAttempts ?? 0,
                    maxAttempts: job.options?.retry?.maxAttempts ?? this.options.retryAttempts,
                    delay: job.options?.retry?.delay ?? this.options.retryDelay,
                },
            },
        });
        return id;
    }
}
exports.Queue = Queue;
