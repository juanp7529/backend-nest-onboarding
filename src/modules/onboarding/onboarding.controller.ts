import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { OnboardingService } from './onboarding.service';
import { CreateOnboardingDto } from './dto/create-onboarding.dto';
import { OnboardingResponseDto } from './dto/onboarding-response.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@ApiTags('onboarding')
@ApiBearerAuth('JWT-auth')
@Controller('onboarding')
@UseGuards(JwtAuthGuard)
export class OnboardingController {
  constructor(private readonly onboardingService: OnboardingService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Crear nuevo onboarding',
    description: 'Crea un nuevo proceso de onboarding',
  })
  @ApiBody({
    type: CreateOnboardingDto,
    description: 'Datos del onboarding',
    examples: {
      example1: {
        summary: 'Ejemplo 1',
        value: {
          nombre: 'Juan Pérez',
          documento: '12345678',
          email: 'juan.perez@example.com',
          montoInicial: 1000.5,
        },
      },
      example2: {
        summary: 'Ejemplo 2',
        value: {
          nombre: 'María González',
          documento: '87654321',
          email: 'maria.gonzalez@example.com',
          montoInicial: 2500.75,
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description:
      'Onboarding creado exitosamente con estado REQUESTED. Retorna ID y estado.',
    schema: {
      example: {
        onboardingId: '1',
        status: 'REQUESTED',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Validación fallida. Datos incorrectos o incompletos.',
    schema: {
      example: {
        statusCode: 400,
        message: 'Validation failed',
        errors: [
          {
            property: 'email',
            constraints: {
              isEmail: 'email must be an email',
            },
          },
        ],
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado. Token JWT inválido o expirado.',
    schema: {
      example: {
        statusCode: 401,
        message: 'Unauthorized',
      },
    },
  })
  @ApiResponse({
    status: 409,
    description:
      'Conflicto. Ya existe un onboarding con el mismo email o documento.',
    schema: {
      example: {
        statusCode: 409,
        message: 'Ya existe un onboarding con este email',
        error: 'Conflict',
      },
    },
  })
  async create(
    @Body() createOnboardingDto: CreateOnboardingDto,
  ): Promise<OnboardingResponseDto> {
    return this.onboardingService.create(createOnboardingDto);
  }
}
