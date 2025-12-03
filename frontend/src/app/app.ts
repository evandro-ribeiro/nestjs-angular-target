import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { SalesCommission } from './components/sales-commission/sales-commission';
import { Inventory } from './components/inventory/inventory';
import { InterestCalc } from './components/interest-calc/interest-calc';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, SalesCommission, Inventory, InterestCalc],
  template: `
    <main style="padding: 2rem;">
      <h1>Sistema de Gestão Comercial - Evandro Machado</h1>
      <app-sales-commission></app-sales-commission>
      <app-inventory></app-inventory>
      <app-interest-calc></app-interest-calc>
    </main>
  `,
})
export class App {
  protected readonly title = signal('frontend');
}
