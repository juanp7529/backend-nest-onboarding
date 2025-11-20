import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOnboardingDto } from './dto/create-onboarding.dto';
import { OnboardingResponseDto } from './dto/onboarding-response.dto';
import { Onboarding } from './dto/onboarding.dto';
import { OnboardingStatus } from './enums/onboarding-status.enum';
import { IOnboardingService } from './interfaces/onboarding.interface';

@Injectable()
export class OnboardingService implements IOnboardingService {
  constructor(
    @InjectRepository(Onboarding)
    private onboardingRepository: Repository<Onboarding>,
  ) {}

  /**
   * create onboarding
   * @param createOnboardingDto createOnboardingDto object with email and documento
   * @returns OnboardingResponseDto object with id and status
   * @throws ConflictException if there is already an onboarding with the same email or documento
   */
  async create(
    createOnboardingDto: CreateOnboardingDto,
  ): Promise<OnboardingResponseDto> {
    try {
      const onboarding = new Onboarding({
        ...createOnboardingDto,
        status: OnboardingStatus.REQUESTED,
      });

      const savedOnboarding = await this.onboardingRepository.save(onboarding);
      
      return new OnboardingResponseDto(
        savedOnboarding.id,
        savedOnboarding.status,
      );
    } catch (error) {
      console.error(error);
      throw new ConflictException('Ya existe un onboarding con este email');
    }
  }
}
