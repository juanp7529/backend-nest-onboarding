import { CreateOnboardingDto } from '../dto/create-onboarding.dto';
import { OnboardingResponseDto } from '../dto/onboarding-response.dto';

export interface IOnboardingService {
  create(
    createOnboardingDto: CreateOnboardingDto,
  ): Promise<OnboardingResponseDto>;
}
