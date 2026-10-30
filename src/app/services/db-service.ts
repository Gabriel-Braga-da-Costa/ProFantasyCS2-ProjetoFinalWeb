import { Service } from '@angular/core';
import Dexie, { Table } from 'dexie';
import { Jogador } from '../model/jogador';
import { Escalacao } from '../model/escalacao';

@Service()
export class DbService extends Dexie {

  jogadores!: Table<Jogador, number>;
  escalacoes!: Table<Escalacao, number>;

  constructor() {
    super("ProFantasyDB");

    this.version(1).stores({
      jogadores: "++id, nomeJogador, equipe, kills, deaths, assists, escalacaoId",
      escalacoes: "++id, nome, nomeUsuario, dataCriacao"
    });
  }
}
