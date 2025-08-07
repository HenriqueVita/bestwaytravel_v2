import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AberturaCaixa } from './abertura-caixa';

describe('AberturaCaixa', () => {
  let component: AberturaCaixa;
  let fixture: ComponentFixture<AberturaCaixa>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AberturaCaixa]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AberturaCaixa);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
