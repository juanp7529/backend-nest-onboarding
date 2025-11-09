import { Injectable, ConflictException } from '@nestjs/common';
import { CreateOnboardingDto } from './dto/create-onboarding.dto';
import { OnboardingResponseDto } from './dto/onboarding-response.dto';
import { Onboarding } from './entities/onboarding.entity';
import { OnboardingStatus } from './enums/onboarding-status.enum';
import { IOnboardingService } from './interfaces/onboarding.interface';

@Injectable()
export class OnboardingService implements IOnboardingService {
  private onboardings: Onboarding[] = [];
  private idCounter = 1;

  /**
   * create onboarding
   * @param createOnboardingDto createOnboardingDto object with email and documento
   * @returns OnboardingResponseDto object with id and status
   * @throws ConflictException if there is already an onboarding with the same email or documento
   */
  create(
    createOnboardingDto: CreateOnboardingDto,
  ): Promise<OnboardingResponseDto> {
    try {
      const existingEmail = this.onboardings.find(
        (o) => o.email === createOnboardingDto.email,
      );
      if (existingEmail) {
        throw new ConflictException('Ya existe un onboarding con este email');
      }
      const existingDoc = this.onboardings.find(
        (o) => o.documento === createOnboardingDto.documento,
      );
      if (existingDoc) {
        throw new ConflictException(
          'Ya existe un onboarding con este documento',
        );
      }
      const onboarding = new Onboarding({
        id: (this.idCounter++).toString(),
        ...createOnboardingDto,
        status: OnboardingStatus.REQUESTED,
      });
      this.onboardings.push(onboarding);
      return Promise.resolve(
        new OnboardingResponseDto(onboarding.id, onboarding.status),
      );
    } catch (error) {
      console.error(error);
      throw new ConflictException('Ya existe un onboarding con este email');
    }
  }
}
