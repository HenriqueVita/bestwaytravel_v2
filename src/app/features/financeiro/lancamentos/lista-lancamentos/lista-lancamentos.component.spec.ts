import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaLancamentosComponent } from './lista-lancamentos.component';
import { describe, beforeEach, it } from 'node:test';

describe('ListaLancamentos', () => {
  let component: ListaLancamentosComponent;
  let fixture: ComponentFixture<ListaLancamentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaLancamentosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaLancamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy(); 
  });
});
