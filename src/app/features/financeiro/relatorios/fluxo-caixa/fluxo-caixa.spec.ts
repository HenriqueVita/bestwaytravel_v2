import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FluxoCaixa } from './fluxo-caixa.component';

describe('FluxoCaixa', () => {
  let component: FluxoCaixa;
  let fixture: ComponentFixture<FluxoCaixa>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FluxoCaixa]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FluxoCaixa);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
