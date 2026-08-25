import { Test, TestingModule } from '@nestjs/testing';
import { ExecutionContext, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { PoliciesGuard } from '../../common/guards/policies.guard';
import { OrgGuard } from '../../common/guards/org.guard';
import { UserRole } from '@medar/types';
import { UserPayload } from '../../common/interfaces/auth-payload.interface';

describe('Authentication & Authorization Guards Test Suite', () => {
  let reflector: Reflector;
  let jwtGuard: JwtAuthGuard;
  let rolesGuard: RolesGuard;
  let policiesGuard: PoliciesGuard;
  let orgGuard: OrgGuard;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        Reflector,
        {
          provide: JwtAuthGuard,
          useFactory: (ref: Reflector) => new JwtAuthGuard(ref),
          inject: [Reflector]
        },
        RolesGuard,
        PoliciesGuard,
        OrgGuard
      ]
    }).compile();

    reflector = module.get<Reflector>(Reflector);
    jwtGuard = module.get<JwtAuthGuard>(JwtAuthGuard);
    rolesGuard = module.get<RolesGuard>(RolesGuard);
    policiesGuard = module.get<PoliciesGuard>(PoliciesGuard);
    orgGuard = module.get<OrgGuard>(OrgGuard);
  });

  function createMockContext(user?: UserPayload | null, params: any = {}, query: any = {}, body: any = {}): ExecutionContext {
    return {
      getHandler: () => ({}),
      getClass: () => ({}),
      switchToHttp: () => ({
        getRequest: () => ({
          user,
          params,
          query,
          body
        })
      })
    } as unknown as ExecutionContext;
  }

  // Vector 1: Unauthenticated Request
  describe('1. Unauthenticated Request Verification', () => {
    it('should throw UnauthorizedException when user token is missing', () => {
      expect(() => jwtGuard.handleRequest(null, null)).toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException when error occurs during auth', () => {
      expect(() => jwtGuard.handleRequest(new Error('Invalid token'), null)).toThrow(UnauthorizedException);
    });
  });

  // Vector 2: Authenticated Request
  describe('2. Authenticated Request Verification', () => {
    it('should allow request when valid user payload exists', () => {
      const mockUser: UserPayload = {
        userId: 'usr-123',
        email: 'user@medar.org',
        firstName: 'John',
        lastName: 'Doe',
        roles: [UserRole.STUDENT],
        organizationIds: ['org-1']
      };

      const result = jwtGuard.handleRequest(null, mockUser);
      expect(result).toEqual(mockUser);
      expect(result.userId).toBe('usr-123');
    });
  });

  // Vector 3: Unauthorized Role
  describe('3. Unauthorized Role Verification (RBAC)', () => {
    it('should throw ForbiddenException when user lacks required ADMIN role', () => {
      jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue([UserRole.ADMIN]);

      const mockStudent: UserPayload = {
        userId: 'student-1',
        email: 'student@medar.org',
        firstName: 'Jane',
        lastName: 'Doe',
        roles: [UserRole.STUDENT],
        organizationIds: []
      };

      const context = createMockContext(mockStudent);
      expect(() => rolesGuard.canActivate(context)).toThrow(ForbiddenException);
    });
  });

  // Vector 4: Authorized Role
  describe('4. Authorized Role Verification (RBAC)', () => {
    it('should allow access when user possesses the ADMIN role', () => {
      jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue([UserRole.ADMIN]);

      const mockAdmin: UserPayload = {
        userId: 'admin-1',
        email: 'admin@medar.org',
        firstName: 'Super',
        lastName: 'Admin',
        roles: [UserRole.ADMIN],
        organizationIds: []
      };

      const context = createMockContext(mockAdmin);
      expect(rolesGuard.canActivate(context)).toBe(true);
    });
  });

  // Vector 5: Resource Ownership
  describe('5. Resource Ownership Verification (ABAC)', () => {
    const isOwnerPolicy = (user: UserPayload, ctx: ExecutionContext) => {
      const req = ctx.switchToHttp().getRequest();
      return req.params.ownerId === user.userId;
    };

    it('should allow owner to access their own resource', async () => {
      jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue([isOwnerPolicy]);

      const mockUser: UserPayload = {
        userId: 'usr-777',
        email: 'owner@medar.org',
        firstName: 'Alice',
        lastName: 'Smith',
        roles: [UserRole.PRACTITIONER],
        organizationIds: []
      };

      const context = createMockContext(mockUser, { ownerId: 'usr-777' });
      const result = await policiesGuard.canActivate(context);
      expect(result).toBe(true);
    });

    it('should throw ForbiddenException when user attempts to access another user resource', async () => {
      jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue([isOwnerPolicy]);

      const mockAttacker: UserPayload = {
        userId: 'usr-888',
        email: 'attacker@medar.org',
        firstName: 'Bob',
        lastName: 'Malicious',
        roles: [UserRole.STUDENT],
        organizationIds: []
      };

      const context = createMockContext(mockAttacker, { ownerId: 'usr-777' });
      await expect(policiesGuard.canActivate(context)).rejects.toThrow(ForbiddenException);
    });
  });

  // Vector 6: Organization Isolation
  describe('6. Organization Multi-Tenant Isolation Verification', () => {
    it('should allow organization member to access their org data', () => {
      const mockCorpUser: UserPayload = {
        userId: 'corp-user-1',
        email: 'corp@firm.com',
        firstName: 'Corporate',
        lastName: 'Member',
        roles: [UserRole.CORPORATE_MEMBER],
        organizationIds: ['org-alpha', 'org-beta']
      };

      const context = createMockContext(mockCorpUser, { orgId: 'org-alpha' });
      expect(orgGuard.canActivate(context)).toBe(true);
    });

    it('should throw ForbiddenException when user attempts cross-tenant org access', () => {
      const mockCorpUser: UserPayload = {
        userId: 'corp-user-1',
        email: 'corp@firm.com',
        firstName: 'Corporate',
        lastName: 'Member',
        roles: [UserRole.CORPORATE_MEMBER],
        organizationIds: ['org-alpha']
      };

      const context = createMockContext(mockCorpUser, { orgId: 'org-forbidden-tenant' });
      expect(() => orgGuard.canActivate(context)).toThrow(ForbiddenException);
    });

    it('should allow Super Admin to bypass organization tenant check', () => {
      const mockSuperAdmin: UserPayload = {
        userId: 'sys-admin-1',
        email: 'sysadmin@medar.org',
        firstName: 'System',
        lastName: 'Admin',
        roles: [UserRole.SUPER_ADMIN],
        organizationIds: []
      };

      const context = createMockContext(mockSuperAdmin, { orgId: 'any-tenant-id' });
      expect(orgGuard.canActivate(context)).toBe(true);
    });
  });
});
