"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Worker = void 0;
class Worker {
    constructor(queue, processJob, { concurrency = 1 } = {}) {
        this.activeJobs = new Map();
        this.processJob = processJob;
        this.queue = queue;
        this.concurrency = concurrency;
    }
    async start() {
        while (true) {
            const job = await this.queue.getOrWaitForJob();
            if (job == null) {
                await new Promise(resolve => setTimeout(resolve, 15000));
            }
            else {
                this.activeJobs.set(job.id, this.processJob(job)
                    .catch(async () => {
                    await this.queue.addJob({
                        ...job,
                        options: {
                            ...job.options,
                            retry: {
                                ...job.options.retry,
                                totalAttempts: job.options.retry.totalAttempts + 1,
                            },
                            delay: job.options.retry.delay *
                                (job.options.retry.totalAttempts + 1) ** 2,
                        },
                    });
                })
                    .finally(() => {
                    this.activeJobs.delete(job.id);
                }));
            }
            if (this.activeJobs.size >= this.concurrency) {
                await Promise.any(this.activeJobs.values());
            }
        }
    }
}
exports.Worker = Worker;
