import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async getDashboardMetrics() {
    const totalUsers = await this.prisma.user.count();
    const pendingEmpanelments = await this.prisma.empanelmentApplication.count({
      where: { applicationStatus: 'SUBMITTED' }
    });
    const completedPayments = await this.prisma.payment.findMany({
      where: { status: 'CAPTURED' }
    });
    const totalRevenue = completedPayments.reduce((acc, p) => acc + p.amount, 0);
    const activeEnrollments = await this.prisma.enrollment.count({
      where: { status: 'ACTIVE' }
    });

    return {
      totalUsers,
      pendingEmpanelments,
      totalRevenue,
      activeEnrollments
    };
  }

  async listUsers() {
    return this.prisma.user.findMany({
      include: {
        roles: {
          include: { role: true }
        }
      },
      orderBy: { createdAt: 'desc' },
      take: 50
    });
  }

  async listEmpanelmentApplications() {
    return this.prisma.empanelmentApplication.findMany({
      include: {
        mediator: {
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true
              }
            }
          }
        }
      },
      orderBy: { submittedAt: 'desc' }
    });
  }

  async reviewEmpanelmentApplication(id: string, reviewerId: string, status: 'APPROVED' | 'REJECTED', notes?: string) {
    const app = await this.prisma.empanelmentApplication.findUnique({
      where: { id }
    });

    if (!app) {
      throw new NotFoundException('Empanelment application not found');
    }

    return this.prisma.empanelmentApplication.update({
      where: { id },
      data: {
        applicationStatus: status,
        reviewedAt: new Date(),
        reviewedBy: reviewerId,
        notes
      }
    });
  }

  async listPayments() {
    return this.prisma.payment.findMany({
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true
          }
        }
      },
      orderBy: { createdAt: 'desc' },
      take: 50
    });
  }

  async listAuditLogs() {
    return this.prisma.auditLog.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50
    });
  }
}
