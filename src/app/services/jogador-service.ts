import { computed, inject, Injectable, signal } from '@angular/core';
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

  jogadoresTitulares = computed(() => {
    return this.jogadores().filter(jogador => jogador.titular === true);
  });

  jogadoresReservas = computed(() => {
    return this.jogadores().filter(jogador => jogador.titular !== true);
  });

  totalTitulares = computed(() => {
    return this.jogadoresTitulares().length;
  });

  totalReservas = computed(() => {
    return this.jogadoresReservas().length;
  });

  escalacaoCompleta = computed(() => {
    return this.totalTitulares() >= 5;
  })

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

  atualizarJogador(id: number, nomeJogador: string, equipe: string, posicao: string, kills: number, deaths: number, assists: number, titular: boolean) {
    return this.dbService.jogadores
      .update(id, { nomeJogador: nomeJogador, equipe: equipe, posicao: posicao, kills: kills, deaths: deaths, assists: assists, titular: titular })
      .then(() => this.dbService.jogadores.toArray())
      .then(jogadores => this.jogadorSignal.set(jogadores));
  }


  getJogador(id: number) {
    return this.dbService.jogadores.get(id);
  }

  escalarJogador(id: number) {

    if (this.totalTitulares() >= 5) {
      return false;
    }

    return this.dbService.jogadores
      .update(id, { titular: true })
      .then(() => this.dbService.jogadores.toArray())
      .then(jogadores => {
        this.jogadorSignal.set(jogadores);

        return true;
      });
  }


  reservarJogador(id: number) {

    return this.dbService.jogadores
      .update(id, {
        titular: false
      })
      .then(() => this.dbService.jogadores.toArray()
        .then(jogadores => {
          this.jogadorSignal.set(jogadores);
        }))
  }
}
