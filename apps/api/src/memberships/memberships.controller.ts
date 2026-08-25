import { Controller, Get, Post, Body } from '@nestjs/common';
import { MembershipsService } from './memberships.service';
import { Public } from '../common/decorators/public.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { UserPayload } from '../common/interfaces/auth-payload.interface';

@Controller('memberships')
export class MembershipsController {
  constructor(private readonly membershipsService: MembershipsService) {}

  @Public()
  @Get('plans')
  async getPlans() {
    return this.membershipsService.getPlans();
  }

  @Get('me')
  async getMyMembership(@CurrentUser() user: UserPayload) {
    return this.membershipsService.getMyMembership(user.userId);
  }

  @Post('subscribe')
  async subscribe(@CurrentUser() user: UserPayload, @Body('planCode') planCode: string) {
    return this.membershipsService.subscribe(user.userId, planCode);
  }
}
