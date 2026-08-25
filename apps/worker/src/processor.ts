import { Job } from 'bullmq';

export interface EmailJobData {
  to: string;
  subject: string;
  body: string;
}

export async function processEmailJob(job: Job<EmailJobData>): Promise<{ success: boolean }> {
  console.log(`[Worker] Processing email job ${job.id} to ${job.data.to}`);
  // Place email sending logic (e.g. Resend) here
  return { success: true };
}
