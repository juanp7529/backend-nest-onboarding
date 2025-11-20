import { OnboardingStatus } from '../enums/onboarding-status.enum';
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('onboardings')
export class Onboarding {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @Column({ type: 'varchar', length: 100 })
  documento: string;

  @Column({ type: 'varchar', length: 100, unique: false })
  email: string;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  montoInicial: number;

  @Column({ type: 'varchar', default: OnboardingStatus.REQUESTED })
  status: OnboardingStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor(partial: Partial<Onboarding>) {
    Object.assign(this, partial);
    this.status = partial?.status || OnboardingStatus.REQUESTED;
  }
}
