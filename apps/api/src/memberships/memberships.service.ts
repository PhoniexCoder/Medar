import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MembershipsService {
  constructor(private prisma: PrismaService) {}

  async getPlans() {
    return this.prisma.membershipPlan.findMany({
      where: { status: 'ACTIVE' }
    });
  }

  async getMyMembership(userId: string) {
    return this.prisma.membership.findFirst({
      where: { userId, status: 'ACTIVE' },
      include: { plan: true },
      orderBy: { expiresAt: 'desc' }
    });
  }

  async subscribe(userId: string, planCode: string) {
    const plan = await this.prisma.membershipPlan.findUnique({
      where: { code: planCode }
    });

    if (!plan) {
      throw new NotFoundException('Membership plan not found');
    }

    // Check certificate prerequisite for Full Membership
    if (planCode === 'FULL_MEMBER') {
      const activeCert = await this.prisma.certification.findFirst({
        where: { userId, status: 'ACTIVE' }
      });

      if (!activeCert) {
        throw new BadRequestException('Full Membership requires a passed Practitioner Certification');
      }
    }

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + plan.duration);

    return this.prisma.membership.create({
      data: {
        userId,
        planId: plan.id,
        status: 'ACTIVE',
        startsAt: new Date(),
        expiresAt
      },
      include: { plan: true }
    });
  }
}
