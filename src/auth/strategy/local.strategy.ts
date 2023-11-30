import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { MessageHelper } from '../helpers/message.helper';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authservice: AuthService) {
    super({ usernameField: 'email' });
  }
  async validate(email: string, password: string) {
    const user = await this.authservice.validateUser(email, password);
    if (!user) throw new UnauthorizedException(MessageHelper.PASSWORD_INVALID);

    return user;
  }
}
