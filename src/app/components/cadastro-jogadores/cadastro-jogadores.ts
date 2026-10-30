import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JogadorService } from '../../services/jogador-service';
import { Jogador } from '../../model/jogador';

@Component({
  selector: 'app-cadastro-jogadores',
  imports: [ReactiveFormsModule],
  templateUrl: './cadastro-jogadores.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './cadastro-jogadores.css',
})
export class CadastroJogadores {

  private jogadorService = inject(JogadorService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  emEdicao = this.route.snapshot.paramMap.has('id');
  jogadorId = Number(this.route.snapshot.paramMap.get('id'));

  formJogador = new FormGroup({
    nomeJogador: new FormControl('', Validators.required),
    equipe: new FormControl('', Validators.required),
    posicao: new FormControl('', Validators.required),
    kills: new FormControl(0, [Validators.required, Validators.min(0)]),
    deaths: new FormControl(0, [Validators.required, Validators.min(0)]),
    assists: new FormControl(0, [Validators.required, Validators.min(0)]),
  });

  cancelar() {
    this.router.navigate(['/']);
  }

  cadastrarJogador() {
    let novoJogador: Jogador = {
      nomeJogador: this.formJogador.value.nomeJogador!,
      equipe: this.formJogador.value.equipe!,
      posicao: this.formJogador.value.posicao!,
      kills: this.formJogador.value.kills!,
      deaths: this.formJogador.value.deaths!,
      assists: this.formJogador.value.assists!
    };

    this.jogadorService.addJogador(novoJogador).then(() => {

    });

    this.formJogador.reset();

    this.router.navigate(['/']);
  }

  atualizarJogador() {
    this.jogadorService.atualizarJogador(
      this.jogadorId,
      this.formJogador.value.nomeJogador!,
      this.formJogador.value.equipe!,
      this.formJogador.value.posicao!,
      this.formJogador.value.kills!,
      this.formJogador.value.deaths!,
      this.formJogador.value.assists!
    )
  }

  salvar() {
    if (this.formJogador.valid) {
      if (this.emEdicao) {
        this.atualizarJogador();
      } else {
        this.cadastrarJogador();
      }
    }
  }
}
