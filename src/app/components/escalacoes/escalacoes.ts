import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { EscalacaoService } from '../../services/escalacao-service';

@Component({
  selector: 'app-escalacoes',
  imports: [],
  templateUrl: './escalacoes.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './escalacoes.css',
})
export class Escalacoes {

  private escalacaoService = inject(EscalacaoService);
  



}
