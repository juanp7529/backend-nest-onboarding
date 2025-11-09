import {
  IsString,
  IsEmail,
  IsNumber,
  IsNotEmpty,
  MinLength,
  Min,
} from 'class-validator';

export class CreateOnboardingDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  nombre: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  documento: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNumber()
  @Min(0)
  montoInicial: number;
}
