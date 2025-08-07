import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Vendas } from './vendas';
import { beforeEach, describe, it } from 'node:test';

describe('Vendas', () => {
  let component: Vendas;
  let fixture: ComponentFixture<Vendas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Vendas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Vendas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
