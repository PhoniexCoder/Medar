import { ExecutionContext } from '@nestjs/common';
import { UserPayload } from './auth-payload.interface';

export interface IPolicyHandler {
  handle(user: UserPayload, context: ExecutionContext): boolean | Promise<boolean>;
}

export type PolicyHandler = IPolicyHandler | ((user: UserPayload, context: ExecutionContext) => boolean | Promise<boolean>);
