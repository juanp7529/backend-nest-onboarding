import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConfig } from '../../../config/jwt.config';
import { JwtPayloadDto } from '../dto/jwt-payload.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConfig.secret,
    });
  }

  /**
   * validate jwt payload
   * @param payload jwt payload
   * @returns IValidateUserResponse
   */
  validate(payload: JwtPayloadDto) {
    try {
      return { userId: payload.sub, username: payload.username };
    } catch (err) {
      console.error(err);
      throw new UnauthorizedException('Credenciales inválidas');
    }
  }
}
