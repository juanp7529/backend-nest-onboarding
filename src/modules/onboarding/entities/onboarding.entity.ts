import { OnboardingStatus } from '../enums/onboarding-status.enum';

export class Onboarding {
  id: string;
  nombre: string;
  documento: string;
  email: string;
  montoInicial: number;
  status: OnboardingStatus;
  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<Onboarding>) {
    Object.assign(this, partial);
    this.status = partial.status || OnboardingStatus.REQUESTED;
    this.createdAt = partial.createdAt || new Date();
    this.updatedAt = partial.updatedAt || new Date();
  }
}
