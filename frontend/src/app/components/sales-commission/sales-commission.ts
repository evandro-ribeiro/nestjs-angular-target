import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sales-commission',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card">
      <h2>1. Relatório de Comissões</h2>
      <button (click)="loadCommissions()">Calcular Comissões</button>

      @if (data$ | async; as commissions) { @if(commissions.length > 0) {
      <table border="1" cellpadding="5">
        <thead>
          <tr>
            <th>Vendedor</th>
            <th>Total Vendas</th>
            <th>Comissão</th>
          </tr>
        </thead>
        <tbody>
          @for (item of commissions; track item.vendedor) {
          <tr>
            <td>{{ item.vendedor }}</td>
            <td>{{ item.totalVendas | currency : 'BRL' }}</td>
            <td>{{ item.totalComissao | currency : 'BRL' }}</td>
          </tr>
          }
        </tbody>
      </table>
      } }
    </div>
  `,
  styleUrls: ['./sales-commission.css'],
})
export class SalesCommission {
  data$: Observable<any[]> | null = null;

  constructor(private http: HttpClient) {}

  loadCommissions() {
    this.data$ = this.http.get<any[]>('http://localhost:3025/sales/commissions');
  }
}
