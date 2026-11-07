import { Component, inject, ChangeDetectionStrategy, computed } from '@angular/core';
import { JogadorService } from '../../services/jogador-service';
import { RouterLink } from '@angular/router';
import { Jogador } from '../../model/jogador';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './home.css',
})
export class Home {
  jogadorService = inject(JogadorService);

  jogadoresExibidos = computed(() => {
    const lista = [...this.jogadorService.jogadores()];
  })

  remover(jogador: Jogador) {

    this.jogadorService.removerJogador(jogador.id!).then(() => {

    })

  }
}

