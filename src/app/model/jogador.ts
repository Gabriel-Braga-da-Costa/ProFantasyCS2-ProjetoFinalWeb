export interface Jogador {
    id?: number,
    nomeJogador: string,
    equipe: string, //organização pela qual joga
    posicao: string, //entry fragger, awper
    kills: number,
    deaths: number,
    assists: number,
    escalacaoId?: number //FK

}