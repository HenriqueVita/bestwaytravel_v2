import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroLancamentoComponent } from './cadastro-lancamento.component';
import { describe, beforeEach, it } from 'node:test';

describe('CadastroLancamentoComponent', () => {
  let component: CadastroLancamentoComponent;
  let fixture: ComponentFixture<CadastroLancamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroLancamentoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroLancamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
 
  it('should create', () => {
    expect(component).toBeTruthy(); 
  });
});
