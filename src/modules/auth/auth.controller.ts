import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Public } from '../../common/decorators/public.decorator';
import { ILoginResponse } from './interfaces/auth.interface';
import { HashPasswordDto } from './dto/hash-password.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Login de usuario',
    description:
      'Autenticación de usuario con credenciales y obtención de JWT válido por 5 minutos',
  })
  @ApiBody({
    type: LoginDto,
    description: 'Credenciales de usuario',
    examples: {
      admin: {
        summary: 'Usuario Admin',
        value: {
          username: 'admin',
          password: 'admin123',
        },
      },
      user: {
        summary: 'Usuario Regular',
        value: {
          username: 'user',
          password: 'user123',
        },
      },
      demo: {
        summary: 'Usuario Demo',
        value: {
          username: 'demo',
          password: 'demo123',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Login exitoso. Retorna JWT token válido por 5 minutos.',
    schema: {
      example: {
        access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        token_type: 'Bearer',
        expires_in: '5m',
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Credenciales inválidas',
    schema: {
      example: {
        statusCode: 401,
        message: 'Credenciales inválidas',
        error: 'Unauthorized',
      },
    },
  })
  async login(@Body() loginDto: LoginDto): Promise<ILoginResponse> {
    return this.authService.login(loginDto);
  }

  @Public()
  @Post('hash-password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Generar hash de contraseña para que la envíen al login',
    description:
      'Endpoint de utilidad para generar hashes bcrypt de contraseñas',
  })
  @ApiBody({
    type: HashPasswordDto,
    description: 'Contraseña a hashear',
    examples: {
      example1: {
        summary: 'Ejemplo 1',
        value: {
          password: 'manzana123',
        },
      },
      example2: {
        summary: 'Ejemplo 2',
        value: {
          password: 'juanpa123',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Hash generado exitosamente',
    schema: {
      example: {
        plainPassword: 'manzana123',
        hashedPassword:
          '$2b$10$XZKEw8JQKqzY7n9vR5ZzK.rK5Y5xXZKEw8JQKqzY7n9vR5ZzK.rK5Y',
      },
    },
  })
  async hashPassword(@Body() hashPasswordDto: HashPasswordDto) {
    const hashedPassword = await this.authService.hashPassword(
      hashPasswordDto.password,
    );
    return {
      plainPassword: hashPasswordDto.password,
      hashedPassword: hashedPassword,
    };
  }
}
