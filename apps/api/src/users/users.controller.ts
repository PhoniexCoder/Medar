import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { UserPayload } from '../common/interfaces/auth-payload.interface';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '@medar/types';
import { CheckPolicies } from '../common/decorators/check-policies.decorator';
import { OrgGuard } from '../common/guards/org.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  getMe(@CurrentUser() user: UserPayload) {
    return this.usersService.getUserProfile(user.userId);
  }

  @Get()
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Get('documents/:id')
  @CheckPolicies((user, context) => {
    const req = context.switchToHttp().getRequest();
    const docId = req.params.id;
    // Policy check: user can access if docId matches their ownership string or ownerId
    return docId === 'public-doc' || docId === `user-doc-${user.userId}` || user.roles.includes('ADMIN');
  })
  getDocument(@Param('id') id: string, @CurrentUser() user: UserPayload) {
    return { id, access: 'granted', requestedBy: user.userId };
  }

  @Get('organizations/:orgId')
  @UseGuards(OrgGuard)
  getOrganizationData(@Param('orgId') orgId: string, @CurrentUser() user: UserPayload) {
    return { organizationId: orgId, data: 'Protected Org Content', requestedBy: user.userId };
  }
}
