import { computed, Service } from '@angular/core';
import { Jogador } from '../model/jogador';

@Service()
export class PontuacaoService {

    //PONTUACAO INDIVIDUAL
    calcularPontos(jogador: Jogador): number {
        return (jogador.kills * 3) - jogador.deaths + jogador.assists;
    }

    //PONTUACAO TOTAL
    calcularPontosEscalacao(jogadores: Jogador[]): number {
        return jogadores.reduce((total, jogador) =>
            total + this.calcularPontos(jogador), 0);
    }
}
