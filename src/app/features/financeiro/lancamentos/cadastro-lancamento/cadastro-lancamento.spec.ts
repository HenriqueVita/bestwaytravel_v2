import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroLancamento } from './cadastro-lancamento';

describe('CadastroLancamento', () => {
  let component: CadastroLancamento;
  let fixture: ComponentFixture<CadastroLancamento>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroLancamento]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroLancamento);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
