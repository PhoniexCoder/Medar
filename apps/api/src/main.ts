import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  
  // Safe CommonJS / ESM interop for cookie-parser
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cp = cookieParser as any;
  const cookieMiddleware = typeof cp === 'function' ? cp : (typeof cp?.default === 'function' ? cp.default : require('cookie-parser'));
  app.use(cookieMiddleware());
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
  });

  const port = process.env.PORT || 4000;
  await app.listen(port, '0.0.0.0');
  console.log(`Medar API service running on port ${port} (0.0.0.0)`);
}

bootstrap();
