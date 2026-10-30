import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { JogadorService } from '../../services/jogador-service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './home.css',
})
export class Home {
  jogadorService = inject(JogadorService);
}
