import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserPayload } from '../common/interfaces/auth-payload.interface';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getUserProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        profile: true,
        roles: { include: { role: true } },
        memberships: { include: { organization: true } }
      }
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const { passwordHash: _, ...safeUser } = user;
    return safeUser;
  }

  async getAllUsers() {
    const users = await this.prisma.user.findMany({
      include: {
        profile: true,
        roles: { include: { role: true } }
      }
    });

    return users.map(({ passwordHash: _, ...u }) => u);
  }

  async getResourceDocument(docId: string, currentUser: UserPayload) {
    const doc = await this.prisma.document.findUnique({
      where: { id: docId }
    });

    if (!doc) {
      throw new NotFoundException('Document not found');
    }

    return doc;
  }
}
