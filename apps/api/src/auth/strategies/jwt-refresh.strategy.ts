import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.refreshToken || request?.body?.refreshToken;
        }
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.AUTH_SECRET || 'super-secret-medar-jwt-token-key-change-in-production'
    });
  }

  async validate(payload: any) {
    if (!payload || !payload.sub) {
      throw new UnauthorizedException('Invalid refresh token');
    }
    return { userId: payload.sub, email: payload.email };
  }
}
