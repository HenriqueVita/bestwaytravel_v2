import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaturasFormComponent } from './faturas-form.component';

describe('FaturasFormComponent', () => {
  let component: FaturasFormComponent;
  let fixture: ComponentFixture<FaturasFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FaturasFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FaturasFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
