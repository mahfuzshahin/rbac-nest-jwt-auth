// ... imports

import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
  ) {}

  // ... validateUser method remains the same

  async login(user: User) { // The 'user' object now includes the role
    const payload = {
      username: user.username,
      sub: user.id,
      role: user.role, // ✅ Include the role in the payload
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}