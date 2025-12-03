import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateMovementDto, MovementType } from "./dto/create-movement.dto";

@Injectable()
export class InventoryService {
  private movementCounter = 1;

  private products = [
    { codigoProduto: 101, descricaoProduto: "Caneta Azul", estoque: 150 },
    {
      codigoProduto: 102,
      descricaoProduto: "Caderno Universitário",
      estoque: 75,
    },
    { codigoProduto: 103, descricaoProduto: "Borracha Branca", estoque: 200 },
    { codigoProduto: 104, descricaoProduto: "Lápis Preto HB", estoque: 320 },
    {
      codigoProduto: 105,
      descricaoProduto: "Marcador de Texto Amarelo",
      estoque: 90,
    },
  ];

  getProducts() {
    return this.products;
  }

  registerMovement(dto: CreateMovementDto) {
    const product = this.products.find(
      (p) => p.codigoProduto === dto.productId
    );

    if (!product) {
      throw new NotFoundException("Produto não encontrado.");
    }

    if (dto.type === MovementType.OUT && product.estoque < dto.amount) {
      throw new BadRequestException("Estoque insuficiente para esta saída.");
    }

    if (dto.type === MovementType.IN) {
      product.estoque += dto.amount;
    } else {
      product.estoque -= dto.amount;
    }

    if (!dto.description) {
      throw new BadRequestException(
        "A descrição da movimentação é obrigatória."
      );
    }

    const movementRecord = {
      idMovimentacao: this.movementCounter++,
      descricao: dto.description,
      tipo: dto.type,
      produto: product.descricaoProduto,
      estoqueFinal: product.estoque,
    };

    return movementRecord;
  }
}
