import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export interface ApplyEmpanelmentDto {
  panel?: string;
  barNumber?: string;
  jurisdiction: string;
  experienceYears: number;
  specialties: string[];
  bio: string;
  documentUrls?: string[];
}

@Injectable()
export class MediatorsService {
  constructor(private prisma: PrismaService) {}

  async getPublicDirectory(query?: { jurisdiction?: string; search?: string }) {
    return this.prisma.mediatorProfile.findMany({
      where: query?.jurisdiction ? {
        jurisdictions: {
          has: query.jurisdiction
        }
      } : undefined,
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true
          }
        },
        credentials: true
      },
      take: 20
    });
  }

  async getBySlug(slug: string) {
    const profile = await this.prisma.mediatorProfile.findFirst({
      where: {
        OR: [
          { id: slug },
          { publicProfileSlug: slug },
          { user: { id: slug } }
        ]
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true
          }
        },
        credentials: true
      }
    });

    if (!profile) {
      throw new NotFoundException('Mediator profile not found');
    }

    return profile;
  }

  async submitEmpanelmentApplication(userId: string, dto: ApplyEmpanelmentDto) {
    // Get or create MediatorProfile for user
    let mediatorProfile = await this.prisma.mediatorProfile.findUnique({
      where: { userId }
    });

    if (!mediatorProfile) {
      mediatorProfile = await this.prisma.mediatorProfile.create({
        data: {
          userId,
          displayName: dto.barNumber ? `Advocate ${userId.slice(0, 6)}` : 'Mediator Practitioner',
          professionalBio: dto.bio,
          yearsOfExperience: dto.experienceYears,
          practiceAreas: dto.specialties,
          languages: ['English'],
          locations: [dto.jurisdiction],
          jurisdictions: [dto.jurisdiction],
          publicProfileSlug: `mediator-${userId.slice(0, 8)}`
        }
      });
    }

    const existing = await this.prisma.empanelmentApplication.findFirst({
      where: { mediatorId: mediatorProfile.id }
    });

    if (existing && existing.applicationStatus === 'SUBMITTED') {
      throw new BadRequestException('You already have a pending empanelment application');
    }

    return this.prisma.empanelmentApplication.create({
      data: {
        mediatorId: mediatorProfile.id,
        panel: dto.panel || dto.jurisdiction,
        applicationStatus: 'SUBMITTED',
        submittedAt: new Date()
      }
    });
  }

  async getEmpanelmentStatus(userId: string) {
    const mediatorProfile = await this.prisma.mediatorProfile.findUnique({
      where: { userId }
    });

    if (!mediatorProfile) {
      return null;
    }

    return this.prisma.empanelmentApplication.findFirst({
      where: { mediatorId: mediatorProfile.id },
      orderBy: { submittedAt: 'desc' }
    });
  }
}
