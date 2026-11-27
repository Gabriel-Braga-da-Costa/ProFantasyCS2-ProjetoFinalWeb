import { inject, Service, signal } from '@angular/core';
import { DbService } from './db-service';
import { Escalacao } from '../model/escalacao';
import { Jogador } from '../model/jogador';
import { JogadorService } from './jogador-service';

@Service()
export class EscalacaoService {

  private dbService = inject(DbService);

  private jogadorSignal = signal<Jogador[]>([]);

  //lista escalacao vazia
  /*private escalacaoSignal = signal<Escalacao[]>([]);

  escalacoes = this.escalacaoSignal.asReadonly();*/

  constructor() {
    this.dbService.jogadores.toArray().then(jogadores => {
      this.jogadorSignal.set(jogadores);
    })
  }

  removerJogador(id: number) {

    return this.dbService.jogadores.where('escalacaoId').equals(id).toArray().then(() => {


      return this.dbService.jogadores.delete(id).then(() => {
        this.jogadorSignal.update(jogadores => jogadores.filter(j => j.id !== id));


      })
    })
  }

}
