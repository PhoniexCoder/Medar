import { Injectable, BadRequestException, NotFoundException, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PaymentStatus } from '@prisma/client';
import * as crypto from 'crypto';

export interface CreateOrderDto {
  cohortId?: string;
  membershipPlanId?: string;
  amount: number; // in INR
  currency?: string;
}

@Injectable()
export class PaymentsService {
  private readonly logger = new Logger(PaymentsService.name);

  constructor(private prisma: PrismaService) {}

  async createOrder(userId: string, dto: CreateOrderDto) {
    const currency = dto.currency || 'INR';
    const razorpayOrderId = `order_${crypto.randomBytes(10).toString('hex')}`;

    const payment = await this.prisma.payment.create({
      data: {
        userId,
        amount: dto.amount,
        currency,
        provider: 'RAZORPAY',
        purpose: dto.cohortId ? 'COHORT_ENROLLMENT' : 'MEMBERSHIP',
        referenceType: dto.cohortId ? 'PROGRAM_COHORT' : 'MEMBERSHIP_PLAN',
        referenceId: razorpayOrderId,
        status: PaymentStatus.PENDING,
        metadata: {
          cohortId: dto.cohortId,
          membershipPlanId: dto.membershipPlanId
        }
      }
    });

    return {
      orderId: razorpayOrderId,
      paymentId: payment.id,
      amount: dto.amount,
      currency,
      keyId: process.env.RAZORPAY_KEY_ID || 'rzp_test_medar_key'
    };
  }

  async verifyAndFulfill(payload: {
    razorpayOrderId: string;
    razorpayPaymentId: string;
    razorpaySignature: string;
    userId: string;
  }) {
    const payment = await this.prisma.payment.findFirst({
      where: { referenceId: payload.razorpayOrderId }
    });

    if (!payment) {
      throw new NotFoundException('Payment transaction record not found');
    }

    // Update payment status to CAPTURED
    await this.prisma.payment.update({
      where: { id: payment.id },
      data: {
        status: PaymentStatus.CAPTURED,
        metadata: {
          ...(payment.metadata as object),
          razorpayPaymentId: payload.razorpayPaymentId
        }
      }
    });

    // Fulfill enrollment if cohortId is present
    const metadata = payment.metadata as { cohortId?: string };
    if (metadata?.cohortId) {
      const existingEnrollment = await this.prisma.enrollment.findFirst({
        where: {
          userId: payload.userId,
          cohortId: metadata.cohortId
        }
      });

      if (!existingEnrollment) {
        await this.prisma.enrollment.create({
          data: {
            userId: payload.userId,
            cohortId: metadata.cohortId,
            status: 'ACTIVE',
            enrolledAt: new Date()
          }
        });
      }
    }

    return { success: true, paymentId: payment.id };
  }

  async handleWebhook(body: any, signature: string) {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET || 'rzp_webhook_secret';
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(JSON.stringify(body))
      .digest('hex');

    if (signature !== expectedSignature && process.env.NODE_ENV === 'production') {
      throw new BadRequestException('Invalid webhook signature');
    }

    if (body.event === 'payment.captured') {
      const paymentEntity = body.payload.payment.entity;
      const razorpayOrderId = paymentEntity.order_id;

      const payment = await this.prisma.payment.findFirst({
        where: { referenceId: razorpayOrderId }
      });

      if (payment) {
        await this.prisma.payment.update({
          where: { id: payment.id },
          data: { status: PaymentStatus.CAPTURED }
        });

        const metadata = payment.metadata as { cohortId?: string };
        if (metadata?.cohortId) {
          const existingEnrollment = await this.prisma.enrollment.findFirst({
            where: {
              userId: payment.userId,
              cohortId: metadata.cohortId
            }
          });

          if (!existingEnrollment) {
            await this.prisma.enrollment.create({
              data: {
                userId: payment.userId,
                cohortId: metadata.cohortId,
                status: 'ACTIVE'
              }
            });
          }
        }
      }
    }

    return { received: true };
  }
}
