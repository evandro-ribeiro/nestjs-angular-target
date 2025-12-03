import { Module } from "@nestjs/common";
import { FinanceController } from "./finance/finance.controller";
import { FinanceService } from "./finance/finance.service";
import { InventoryController } from "./inventory/inventory.controller";
import { InventoryService } from "./inventory/inventory.service";
import { SalesController } from "./sales/sales.controller";
import { SalesService } from "./sales/sales.service";

@Module({
  imports: [],
  controllers: [SalesController, InventoryController, FinanceController],
  providers: [SalesService, InventoryService, FinanceService],
})
export class AppModule {}
