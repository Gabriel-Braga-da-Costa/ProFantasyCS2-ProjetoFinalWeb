import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { CadastroJogadores } from './components/cadastro-jogadores/cadastro-jogadores';
import { Escalacoes } from './components/escalacoes/escalacoes';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'jogador/novo', component: CadastroJogadores },
    { path: 'equipe/nova', component: Escalacoes }
];
