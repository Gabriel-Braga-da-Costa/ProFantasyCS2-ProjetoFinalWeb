import { Component, inject, ChangeDetectionStrategy, computed } from '@angular/core';
import { JogadorService } from '../../services/jogador-service';
import { RouterLink } from '@angular/router';
import { Jogador } from '../../model/jogador';
import { PontuacaoService } from '../../services/pontuacao-service';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './home.css',
})
export class Home {

  tituloSistema = 'PRO FANTASY CS SEASON 1'

  jogadorService = inject(JogadorService);

  pontuacaoService = inject(PontuacaoService);

  totalEscalados = computed(() => {
    return this.jogadoresExibidos().length;
  })

  titulares = this.jogadorService.jogadoresTitulares;

  reservas = this.jogadorService.jogadoresReservas;

  totalTitulares = this.jogadorService.totalTitulares;

  pontuacaoTotal = computed(() => {
    return this.pontuacaoService.calcularPontosEscalacao(this.titulares());
  });

  mvp = computed(() => {
    const lista = [...this.jogadoresExibidos()];

    lista.sort((a, b) => this.pontuacaoService.calcularPontos(b) - this.pontuacaoService.calcularPontos(a));

    return lista[0];
  });

  jogadoresExibidos = computed(() => {
    /*const lista = [...this.jogadorService.jogadores()];

    return lista;*/

    return this.jogadorService.jogadores();
  })

  remover(jogador: Jogador) {

    this.jogadorService.removerJogador(jogador.id!).then(() => {

    })

  }

  ordenar = computed(() => {

    const lista = [...this.jogadorService.jogadoresTitulares()];

    lista.sort((a, b) => this.pontuacaoService.calcularPontos(b) - this.pontuacaoService.calcularPontos(a));

    return lista;
  })
}

