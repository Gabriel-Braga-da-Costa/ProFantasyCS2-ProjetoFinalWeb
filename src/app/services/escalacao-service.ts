import { inject, Service, signal } from '@angular/core';
import { DbService } from './db-service';
import { Escalacao } from '../model/escalacao';

@Service()
export class EscalacaoService {

  private dbService = inject(DbService);

  //lista escalacao vazia
  private escalacaoSignal = signal<Escalacao[]>([]);

  escalacoes = this.escalacaoSignal.asReadonly;

  constructor() {
    this.dbService.escalacoes.toArray().then(escalacoes => {
      this.escalacaoSignal.set(escalacoes);
    })
  }

}
