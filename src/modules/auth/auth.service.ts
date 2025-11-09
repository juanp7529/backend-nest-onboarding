import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import {
  IAuthService,
  ILoginResponse,
  IUser,
  IValidateUserResponse,
} from './interfaces/auth.interface';
import { readFile } from 'fs/promises';
import { join } from 'path';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService implements IAuthService {
  private users: IUser[] | null = null;
  constructor(private readonly jwtService: JwtService) {}

  /**
   * load users from users_login.json file
   * @returns IUser[]
   */
  private async loadUsers(): Promise<IUser[]> {
    if (this.users) {
      return this.users;
    }
    try {
      const filePath = join(process.cwd(), 'users_login.json');
      const fileContent = await readFile(filePath, 'utf8');
      this.users = JSON.parse(fileContent) as IUser[];
      return this.users;
    } catch (err) {
      console.error(err);
      throw new Error('No se pudo cargar la lista de usuarios');
    }
  }

  /**
   * validate user credentials
   * @param username username of the user
   * @param password password of the user
   * @returns IValidateUserResponse | null
   */
  async validateUser(
    username: string,
    password: string,
  ): Promise<IValidateUserResponse | null> {
    try {
      const users = await this.loadUsers();
      const user = users.find((u) => u.username === username);
      if (!user) {
        throw new UnauthorizedException('Credenciales inválidas');
      }
      // Verificar password (en producción usarías bcrypt)
      if (user.password !== password) {
        throw new UnauthorizedException('Credenciales inválidas');
      }
      return {
        id: user.id,
        username: user.username,
      };
    } catch (err) {
      console.error(err);
      throw new Error('No se pudo cargar la lista de usuarios');
    }
  }

  /**
   * login user
   * @param loginDto loginDto object with username and password
   * @returns ILoginResponse
   */
  async login(loginDto: LoginDto): Promise<ILoginResponse> {
    try {
      const user = await this.validateUser(
        loginDto.username,
        loginDto.password,
      );
      if (!user) {
        throw new UnauthorizedException('Credenciales inválidas');
      }
      const payload = { sub: user.id, username: user.username };
      const accessToken = await this.jwtService.signAsync(payload);
      return {
        access_token: accessToken,
        token_type: 'Bearer',
        expires_in: '5m',
      };
    } catch (err) {
      console.error(err);
      throw new UnauthorizedException('Credenciales inválidas');
    }
  }

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }
}
