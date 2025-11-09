import {
  IsString,
  IsNotEmpty,
  IsBoolean,
  IsArray,
  IsObject,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ProductDto {
  @ApiProperty({
    description: 'ID único del producto bancario',
    example: '1',
  })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({
    description: 'Nombre del producto bancario',
    example: 'Tarjeta de Crédito Gold',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Descripción detallada del producto',
    example: 'Tarjeta de crédito con línea de hasta $50,000',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'Tipo de producto bancario',
    example: 'credit_card',
    enum: [
      'debit_card',
      'credit_card',
      'savings_account',
      'checking_account',
      'personal_loan',
      'investment',
      'insurance',
    ],
  })
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiProperty({
    description: 'Categoría del producto',
    example: 'Tarjetas',
    enum: ['Tarjetas', 'Cuentas', 'Créditos', 'Inversiones', 'Seguros'],
  })
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty({
    description: 'Lista de beneficios del producto',
    example: ['Sin costo de mantenimiento', 'Retiros ilimitados'],
    type: [String],
  })
  @IsArray()
  benefits: string[];

  @ApiProperty({
    description: 'Requisitos para contratar el producto',
    example: {
      minAge: 18,
      minIncome: 15000,
      documentation: ['DNI', 'Comprobante de ingresos'],
    },
  })
  @IsObject()
  requirements: object;

  @ApiProperty({
    description: 'Comisiones y tarifas del producto',
    example: {
      annualFee: 800,
      interestRate: 3.5,
    },
  })
  @IsObject()
  fees: object;

  @ApiProperty({
    description: 'Estado activo del producto',
    example: true,
  })
  @IsBoolean()
  active: boolean;
}
