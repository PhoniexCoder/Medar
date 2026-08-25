import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CHECK_POLICIES_KEY } from '../decorators/check-policies.decorator';
import { PolicyHandler } from '../interfaces/policy.interface';
import { UserPayload } from '../interfaces/auth-payload.interface';

@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const policyHandlers =
      this.reflector.getAllAndOverride<PolicyHandler[]>(CHECK_POLICIES_KEY, [
        context.getHandler(),
        context.getClass()
      ]) || [];

    if (policyHandlers.length === 0) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest<{ user: UserPayload }>();

    for (const handler of policyHandlers) {
      const allowed = await this.execPolicyHandler(handler, user, context);
      if (!allowed) {
        throw new ForbiddenException('Forbidden: Resource policy check failed');
      }
    }

    return true;
  }

  private execPolicyHandler(
    handler: PolicyHandler,
    user: UserPayload,
    context: ExecutionContext
  ) {
    if (typeof handler === 'function') {
      return handler(user, context);
    }
    return handler.handle(user, context);
  }
}
