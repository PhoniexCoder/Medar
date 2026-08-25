import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EnrollmentsService {
  constructor(private prisma: PrismaService) {}

  async getUserEnrollments(userId: string) {
    return this.prisma.enrollment.findMany({
      where: { userId },
      include: {
        cohort: {
          include: {
            program: true
          }
        }
      },
      orderBy: { enrolledAt: 'desc' }
    });
  }

  async getEnrollmentById(userId: string, enrollmentId: string) {
    const enrollment = await this.prisma.enrollment.findFirst({
      where: { id: enrollmentId, userId },
      include: {
        cohort: {
          include: {
            program: true
          }
        }
      }
    });

    if (!enrollment) {
      throw new NotFoundException('Enrollment record not found');
    }

    return enrollment;
  }
}
