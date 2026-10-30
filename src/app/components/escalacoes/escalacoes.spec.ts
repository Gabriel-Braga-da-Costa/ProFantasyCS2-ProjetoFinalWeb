import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Escalacoes } from './escalacoes';

describe('Escalacoes', () => {
  let component: Escalacoes;
  let fixture: ComponentFixture<Escalacoes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Escalacoes],
    }).compileComponents();

    fixture = TestBed.createComponent(Escalacoes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
