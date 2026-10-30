import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroJogadores } from './cadastro-jogadores';

describe('CadastroJogadores', () => {
  let component: CadastroJogadores;
  let fixture: ComponentFixture<CadastroJogadores>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroJogadores],
    }).compileComponents();

    fixture = TestBed.createComponent(CadastroJogadores);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
