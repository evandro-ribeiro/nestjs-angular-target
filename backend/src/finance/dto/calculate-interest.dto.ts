import { IsDateString, IsNumber, Min } from "class-validator";

export class CalculateInterestDto {
  @IsNumber()
  @Min(0)
  value: number;

  @IsDateString()
  dueDate: string;
}
