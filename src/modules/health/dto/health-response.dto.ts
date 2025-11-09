export class HealthResponseDto {
  ok: boolean;

  constructor(ok: boolean = true) {
    this.ok = ok;
  }
}
