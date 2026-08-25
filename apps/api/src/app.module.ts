import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PaymentsModule } from './payments/payments.module';
import { EnrollmentsModule } from './enrollments/enrollments.module';
import { MediatorsModule } from './mediators/mediators.module';
import { MembershipsModule } from './memberships/memberships.module';
import { AdminModule } from './admin/admin.module';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { RolesGuard } from './common/guards/roles.guard';
import { PoliciesGuard } from './common/guards/policies.guard';
import { OrgGuard } from './common/guards/org.guard';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    AuthModule,
    PaymentsModule,
    EnrollmentsModule,
    MediatorsModule,
    MembershipsModule,
    AdminModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    },
    {
      provide: APP_GUARD,
      useClass: PoliciesGuard
    },
    {
      provide: APP_GUARD,
      useClass: OrgGuard
    }
  ]
})
export class AppModule {}
