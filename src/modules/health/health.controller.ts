import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Public } from '../../common/decorators/public.decorator';
import { HealthResponseDto } from './dto/health-response.dto';

@ApiTags('health')
@Controller('health')
export class HealthController {
  @Public()
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Health check',
    description:
      'Verifica el estado de salud de la aplicación',
  })
  @ApiResponse({
    status: 200,
    description: 'Aplicación funcionando correctamente',
    schema: {
      example: {
        ok: true,
      },
    },
  })
  check(): HealthResponseDto {
    return new HealthResponseDto(true);
  }
}
