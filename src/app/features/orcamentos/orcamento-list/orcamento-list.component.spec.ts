import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrcamentosListComponent } from './orcamento-list.component';
import { describe, beforeEach, it } from 'node:test';

describe('OrcamentoListComponent', () => {
  let component: OrcamentosListComponent;
  let fixture: ComponentFixture<OrcamentosListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrcamentosListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrcamentosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
