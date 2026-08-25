import { Injectable } from '@nestjs/common';
import { APP_NAME } from '@medar/config';

@Injectable()
export class AppService {
  getHealth(): { status: string; app: string; timestamp: string } {
    return {
      status: 'ok',
      app: APP_NAME,
      timestamp: new Date().toISOString()
    };
  }
}
