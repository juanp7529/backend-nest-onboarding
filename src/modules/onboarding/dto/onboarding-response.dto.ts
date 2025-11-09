import { OnboardingStatus } from '../enums/onboarding-status.enum';

export class OnboardingResponseDto {
  onboardingId: string;
  status: OnboardingStatus;

  constructor(onboardingId: string, status: OnboardingStatus) {
    this.onboardingId = onboardingId;
    this.status = status;
  }
}
