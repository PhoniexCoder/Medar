import { Controller, Get, Param } from '@nestjs/common';
import { EnrollmentsService } from './enrollments.service';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { UserPayload } from '../common/interfaces/auth-payload.interface';

@Controller('enrollments')
export class EnrollmentsController {
  constructor(private readonly enrollmentsService: EnrollmentsService) {}

  @Get('me')
  async getMyEnrollments(@CurrentUser() user: UserPayload) {
    return this.enrollmentsService.getUserEnrollments(user.userId);
  }

  @Get(':id')
  async getEnrollmentById(@CurrentUser() user: UserPayload, @Param('id') id: string) {
    return this.enrollmentsService.getEnrollmentById(user.userId, id);
  }
}
