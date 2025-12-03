import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-interest-calc',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="card">
      <h2>3. Cálculo de Juros (2.5% a.d.)</h2>

      <div class="form-row">
        <div class="form-group">
          <label>Valor Original:</label>
          <input type="number" [(ngModel)]="inputData.value" placeholder="R$ 0,00" />
        </div>

        <div class="form-group">
          <label>Data Vencimento:</label>
          <input type="date" [(ngModel)]="inputData.dueDate" />
        </div>
      </div>

      <button (click)="calculate()">Calcular</button>

      @if (result(); as res) {
      <div class="result-box">
        <div class="result-item">
          <span>Dias de Atraso</span>
          <strong>{{ res.diasAtraso }} dias</strong>
        </div>

        <div class="result-item">
          <span>Juros Calculado</span>
          <strong>{{ res.jurosCalculado | currency : 'BRL' }}</strong>
        </div>

        <div class="result-divider"></div>

        <div class="result-total">
          <span>Total a Pagar</span>
          <strong>{{ res.valorTotal | currency : 'BRL' }}</strong>
        </div>
      </div>
      }
    </section>
  `,
  styleUrls: ['./interest-calc.css'],
})
export class InterestCalc {
  inputData = { value: 0, dueDate: '' };

  result = signal<any>(null);

  constructor(private http: HttpClient) {}

  calculate() {
    this.http.post('http://localhost:3025/finance/interest', this.inputData).subscribe((res) => {
      this.result.set(res);
    });
  }
}
