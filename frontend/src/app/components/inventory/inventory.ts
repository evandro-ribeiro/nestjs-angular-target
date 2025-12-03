import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="card">
      <h2>2. Controle de Estoque</h2>

      <div class="product-list-container">
        <h4>Produtos Atuais:</h4>
        <ul class="product-list">
          @for (p of products(); track p.codigoProduto) {
          <li>
            <span class="product-name">(#{{ p.codigoProduto }}) {{ p.descricaoProduto }}</span>
            <span class="product-qty">Qtd: {{ p.estoque }}</span>
          </li>
          }
        </ul>
      </div>

      <div class="form-section">
        <h4>Nova Movimentação</h4>

        <div class="form-group">
          <label>Produto:</label>
          <select [(ngModel)]="movement.productId">
            @for (p of products(); track p.codigoProduto) {
            <option [value]="p.codigoProduto">{{ p.descricaoProduto }}</option>
            }
          </select>
        </div>

        <div class="form-group">
          <label>Tipo:</label>
          <select [(ngModel)]="movement.type">
            <option value="ENTRADA">Entrada</option>
            <option value="SAIDA">Saída</option>
          </select>
        </div>

        <div class="form-group">
          <label>Quantidade:</label>
          <input type="number" [(ngModel)]="movement.amount" placeholder="0" />
        </div>

        <div class="form-group">
          <label>Descrição:</label>
          <input
            type="text"
            [(ngModel)]="movement.description"
            placeholder="Motivo da movimentação"
          />
        </div>

        <button (click)="register()">Registrar Movimentação</button>
      </div>

      @if (lastResult(); as res) {
      <div class="feedback success">
        <strong>Sucesso:</strong> Movimentação #{{ res.idMovimentacao }} realizada. Estoque final de
        {{ res.produto }}: {{ res.estoqueFinal }}
      </div>
      } @if (errorMsg(); as err) {
      <div class="feedback error">
        {{ err }}
      </div>
      }
    </section>
  `,
  styleUrls: ['./inventory.css'],
})
export class Inventory implements OnInit {
  products = signal<any[]>([]);
  lastResult = signal<any>(null);
  errorMsg = signal<string>('');

  movement = { productId: 101, type: 'ENTRADA', amount: 1, description: '' };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.http.get<any[]>('http://localhost:3025/inventory').subscribe((res) => {
      this.products.set(res);
    });
  }

  register() {
    this.errorMsg.set('');
    this.lastResult.set(null);

    const payload = {
      ...this.movement,
      productId: Number(this.movement.productId),
    };

    this.http.post('http://localhost:3025/inventory/move', payload).subscribe({
      next: (res) => {
        this.lastResult.set(res);
        this.loadProducts();
      },
      error: (err) => {
        this.errorMsg.set(err.error.message || 'Erro ao movimentar');
      },
    });
  }
}
