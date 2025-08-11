import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendasListComponent } from './vendas.component';
import { beforeEach, describe, it } from 'node:test';

describe('VendasListComponent', () => {
  let component: VendasListComponent;
  let fixture: ComponentFixture<VendasListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VendasListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
