import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { MediatorsService, ApplyEmpanelmentDto } from './mediators.service';
import { Public } from '../common/decorators/public.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { UserPayload } from '../common/interfaces/auth-payload.interface';

@Controller('mediators')
export class MediatorsController {
  constructor(private readonly mediatorsService: MediatorsService) {}

  @Public()
  @Get()
  async getDirectory(@Query('jurisdiction') jurisdiction?: string, @Query('search') search?: string) {
    return this.mediatorsService.getPublicDirectory({ jurisdiction, search });
  }

  @Public()
  @Get(':slug')
  async getBySlug(@Param('slug') slug: string) {
    return this.mediatorsService.getBySlug(slug);
  }

  @Post('empanelment/apply')
  async submitApplication(@CurrentUser() user: UserPayload, @Body() dto: ApplyEmpanelmentDto) {
    return this.mediatorsService.submitEmpanelmentApplication(user.userId, dto);
  }

  @Get('empanelment/status')
  async getEmpanelmentStatus(@CurrentUser() user: UserPayload) {
    return this.mediatorsService.getEmpanelmentStatus(user.userId);
  }
}
