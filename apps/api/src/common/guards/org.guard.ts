import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { UserPayload } from '../interfaces/auth-payload.interface';

@Injectable()
export class OrgGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user as UserPayload;

    if (!user) {
      throw new ForbiddenException('User context missing');
    }

    // Admins bypass organization multi-tenant checks
    if (user.roles?.includes('SUPER_ADMIN') || user.roles?.includes('ADMIN')) {
      return true;
    }

    const orgId = request.params?.orgId || request.query?.orgId || request.body?.organizationId;

    if (!orgId) {
      return true;
    }

    const isMember = user.organizationIds?.includes(orgId);

    if (!isMember) {
      throw new ForbiddenException('Forbidden: Cross-tenant organization access denied');
    }

    return true;
  }
}
