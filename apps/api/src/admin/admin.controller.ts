import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { UserRole } from '@medar/types';
import { UserPayload } from '../common/interfaces/auth-payload.interface';

@Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('dashboard')
  async getDashboardMetrics() {
    return this.adminService.getDashboardMetrics();
  }

  @Get('users')
  async listUsers() {
    return this.adminService.listUsers();
  }

  @Get('empanelments')
  async listEmpanelments() {
    return this.adminService.listEmpanelmentApplications();
  }

  @Post('empanelments/:id/review')
  async reviewEmpanelment(
    @CurrentUser() user: UserPayload,
    @Param('id') id: string,
    @Body() body: { status: 'APPROVED' | 'REJECTED'; notes?: string }
  ) {
    return this.adminService.reviewEmpanelmentApplication(id, user.userId, body.status, body.notes);
  }

  @Get('payments')
  async listPayments() {
    return this.adminService.listPayments();
  }

  @Get('audit-logs')
  async listAuditLogs() {
    return this.adminService.listAuditLogs();
  }
}
