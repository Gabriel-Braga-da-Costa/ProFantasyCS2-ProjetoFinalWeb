import { Component, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { PontuacaoService } from '../../services/pontuacao-service';
import { EscalacaoService } from '../../services/escalacao-service';
import { JogadorService } from '../../services/jogador-service';
import { Jogador } from '../../model/jogador';

@Component({
  selector: 'app-escalacoes',
  imports: [],
  templateUrl: './escalacoes.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './escalacoes.css',
})
export class Escalacoes {

  pontuacaoService = inject(PontuacaoService);

  escalacaoService = inject(EscalacaoService);

  jogadorService = inject(JogadorService);

  jogadoresExibidos = computed(() => {
    return this.jogadorService.jogadores();
  });

  titulares = this.jogadorService.jogadoresTitulares;

  reservas = this.jogadorService.jogadoresReservas;

  totalTitulares = this.jogadorService.totalTitulares;

  pontuacaoTotal = computed(() => {
    return this.pontuacaoService.calcularPontosEscalacao(this.titulares());
  });

  escalar(jogador: Jogador) {

    this.jogadorService.escalarJogador(jogador.id!);
  }

  reservar(jogador: Jogador) {

    this.jogadorService.reservarJogador(jogador.id!);
  }



}
