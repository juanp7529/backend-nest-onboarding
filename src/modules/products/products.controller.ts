import {
  Controller,
  Get,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { Public } from '../../common/decorators/public.decorator';
import { Product } from './entities/product.entity';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Public()
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Listar todos los productos bancarios',
    description:
      'Obtiene un listado completo de todos los productos bancarios disponibles (tarjetas, cuentas, créditos, inversiones, seguros)',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de productos bancarios obtenida exitosamente',
    schema: {
      example: [
        {
          id: '1',
          name: 'Tarjeta de Débito Clásica',
          description:
            'Tarjeta de débito para transacciones diarias. Sin costo de mantenimiento.',
          type: 'debit_card',
          category: 'Tarjetas',
          benefits: [
            'Sin costo de mantenimiento',
            'Retiros ilimitados en red propia',
          ],
          requirements: {
            minAge: 18,
            minIncome: 0,
            documentation: ['DNI', 'Comprobante de domicilio'],
          },
          fees: {
            annualFee: 0,
            maintenanceFee: 0,
          },
          active: true,
        },
        {
          id: '2',
          name: 'Tarjeta de Crédito Gold',
          description: 'Tarjeta de crédito con línea de hasta $50,000.',
          type: 'credit_card',
          category: 'Tarjetas',
          benefits: ['Hasta $50,000 de línea de crédito', 'Programa de puntos'],
          requirements: {
            minAge: 21,
            minIncome: 15000,
          },
          fees: {
            annualFee: 800,
            interestRate: 3.5,
          },
          active: true,
        },
      ],
    },
  })
  async findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Public()
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Obtener producto bancario por ID',
    description:
      'Obtiene los detalles completos de un producto bancario específico por su ID',
  })
  @ApiParam({
    name: 'id',
    description: 'ID del producto bancario',
    example: '1',
  })
  @ApiResponse({
    status: 200,
    description: 'Producto bancario encontrado',
    schema: {
      example: {
        id: '2',
        name: 'Tarjeta de Crédito Gold',
        description:
          'Tarjeta de crédito con línea de hasta $50,000. Incluye programa de puntos y seguros.',
        type: 'credit_card',
        category: 'Tarjetas',
        benefits: [
          'Hasta $50,000 de línea de crédito',
          'Programa de puntos canjeables',
          'Seguro de compras incluido',
          'Meses sin intereses en comercios afiliados',
        ],
        requirements: {
          minAge: 21,
          minIncome: 15000,
          documentation: [
            'DNI',
            'Comprobante de ingresos',
            'Comprobante de domicilio',
          ],
        },
        fees: {
          annualFee: 800,
          interestRate: 3.5,
          atmWithdrawal: 50,
        },
        active: true,
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Producto bancario no encontrado',
    schema: {
      example: {
        statusCode: 404,
        message: 'Producto bancario con ID 999 no encontrado',
        error: 'Not Found',
      },
    },
  })
  async findOne(@Param('id') id: string): Promise<Product> {
    return this.productsService.findOne(id);
  }
}
