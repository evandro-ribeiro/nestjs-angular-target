import { Body, Controller, Get, Post } from "@nestjs/common";
import { InventoryService } from "./inventory.service";
import { CreateMovementDto } from "./dto/create-movement.dto";

@Controller("inventory")
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get()
  getInventory() {
    return this.inventoryService.getProducts();
  }

  @Post("move")
  createMovement(@Body() dto: CreateMovementDto) {
    return this.inventoryService.registerMovement(dto);
  }
}
