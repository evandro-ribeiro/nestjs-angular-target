import { IsInt, IsString, IsEnum, Min, IsNotEmpty } from "class-validator";

export enum MovementType {
  IN = "ENTRADA",
  OUT = "SAIDA",
}

export class CreateMovementDto {
  @IsInt()
  productId: number;

  @IsEnum(MovementType)
  type: MovementType;

  @IsInt()
  @Min(1)
  amount: number;

  @IsString()
  @IsNotEmpty()
  description: string;
}
