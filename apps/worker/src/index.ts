import { Worker } from 'bullmq';
import { processEmailJob } from './processor';
import { APP_NAME } from '@medar/config';

const connection = {
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379', 10)
};

console.log(`Starting ${APP_NAME} background worker service...`);

const emailWorker = new Worker('email-queue', processEmailJob, { connection });

emailWorker.on('completed', (job) => {
  console.log(`Job ${job.id} completed successfully`);
});

emailWorker.on('failed', (job, err) => {
  console.error(`Job ${job?.id} failed with error ${err.message}`);
});
