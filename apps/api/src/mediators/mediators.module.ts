import { Module } from '@nestjs/common';
import { MediatorsService } from './mediators.service';
import { MediatorsController } from './mediators.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [MediatorsController],
  providers: [MediatorsService],
  exports: [MediatorsService]
})
export class MediatorsModule {}
