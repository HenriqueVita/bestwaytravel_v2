import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Financeiro } from './financeiro';

describe('Financeiro', () => {
  let component: Financeiro;
  let fixture: ComponentFixture<Financeiro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Financeiro]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Financeiro);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
