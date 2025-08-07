import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovimentosCaixa } from './movimentos-caixa';

describe('MovimentosCaixa', () => {
  let component: MovimentosCaixa;
  let fixture: ComponentFixture<MovimentosCaixa>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovimentosCaixa]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovimentosCaixa);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
