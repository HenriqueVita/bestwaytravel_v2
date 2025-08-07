import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Faturas } from './faturas';

describe('Faturas', () => {
  let component: Faturas;
  let fixture: ComponentFixture<Faturas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Faturas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Faturas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
