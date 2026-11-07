import { inject, Injectable, signal } from '@angular/core';
import { Jogador } from '../model/jogador';
import { DbService } from './db-service';

@Injectable({
  providedIn: 'root',
})
export class JogadorService {

  private dbService = inject(DbService);

  //lista
  private jogadorSignal = signal<Jogador[]>([]);

  //signal para leitura
  jogadores = this.jogadorSignal.asReadonly();

  constructor() {
    //carrega os jogadores que estão no indexedb
    this.dbService.jogadores.toArray().then(jogadores => {
      this.jogadorSignal.set(jogadores);
    });
  }

  addJogador(novoJogador: Jogador) {
    return this.dbService.jogadores.add(novoJogador).then(novoId => {

      //guarda o id do jogo
      novoJogador.id = novoId;

      //atualiza a lista com o jogo
      this.jogadorSignal.update(jogador => [...jogador, novoJogador]);
    })
  }

  removerJogador(id: number) {
    return this.dbService.jogadores.delete(id).then(() => {
      this.jogadorSignal.update(jogadores => jogadores.filter(jogador => jogador.id !== id));
    })

  }

  atualizarJogador(id: number, nomeJogador: string, equipe: string, posicao: string, kills: number, deaths: number, assists: number) {
    return this.dbService.jogadores
      .update(id, { nomeJogador: nomeJogador, equipe: equipe, posicao: posicao, kills: kills, deaths: deaths, assists: assists })
      .then(() => this.dbService.jogadores.toArray())
      .then(jogadores => this.jogadorSignal.set(jogadores));
  }
}
