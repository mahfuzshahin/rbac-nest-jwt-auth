import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    const secret = configService.get<string>('JWT_SECRET');

    // ✅ --- ADD THIS VALIDATION ---
    // This check guarantees the secret is never undefined.
    if (!secret) {
      throw new Error('JWT_SECRET is not defined in the environment variables.');
    }
    // -----------------------------

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret, // Now TypeScript knows 'secret' is a string
    });
  }

  async validate(payload: any) {
    return {
      userId: payload.sub,
      username: payload.username,
      role: payload.role,
    };
  }
}