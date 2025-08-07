import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FechamentoCaixa } from './fechamento-caixa';

describe('FechamentoCaixa', () => {
  let component: FechamentoCaixa;
  let fixture: ComponentFixture<FechamentoCaixa>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FechamentoCaixa]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FechamentoCaixa);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
