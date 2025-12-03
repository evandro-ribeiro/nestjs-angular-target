import { Body, Controller, Post } from "@nestjs/common";
import { FinanceService } from "./finance.service";
import { CalculateInterestDto } from "./dto/calculate-interest.dto";

@Controller("finance")
export class FinanceController {
  constructor(private readonly financeService: FinanceService) {}

  @Post("interest")
  calculate(@Body() dto: CalculateInterestDto) {
    return this.financeService.calculateInterest(dto);
  }
}
