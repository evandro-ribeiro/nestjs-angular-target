import { Injectable } from "@nestjs/common";
import { CalculateInterestDto } from "./dto/calculate-interest.dto";

@Injectable()
export class FinanceService {
  calculateInterest(dto: CalculateInterestDto) {
    const today = new Date();
    const due = new Date(dto.dueDate);

    today.setHours(0, 0, 0, 0);
    due.setHours(0, 0, 0, 0);

    const diffTime = today.getTime() - due.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // milisegundos em um dia

    let interest = 0;
    let daysLate = 0;

    if (diffDays > 0) {
      daysLate = diffDays;
      interest = dto.value * 0.025 * daysLate;
    }

    return {
      valorOriginal: dto.value,
      diasAtraso: daysLate,
      jurosCalculado: interest,
      valorTotal: dto.value + interest,
    };
  }
}
