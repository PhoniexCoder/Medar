import { Controller, Post, Body, Headers } from '@nestjs/common';
import { PaymentsService, CreateOrderDto } from './payments.service';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { Public } from '../common/decorators/public.decorator';
import { UserPayload } from '../common/interfaces/auth-payload.interface';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('create-order')
  async createOrder(@CurrentUser() user: UserPayload, @Body() dto: CreateOrderDto) {
    return this.paymentsService.createOrder(user.userId, dto);
  }

  @Post('verify')
  async verifyPayment(
    @CurrentUser() user: UserPayload,
    @Body() payload: { razorpayOrderId: string; razorpayPaymentId: string; razorpaySignature: string }
  ) {
    return this.paymentsService.verifyAndFulfill({
      ...payload,
      userId: user.userId
    });
  }

  @Public()
  @Post('webhook')
  async handleWebhook(@Body() body: any, @Headers('x-razorpay-signature') signature: string) {
    return this.paymentsService.handleWebhook(body, signature);
  }
}
