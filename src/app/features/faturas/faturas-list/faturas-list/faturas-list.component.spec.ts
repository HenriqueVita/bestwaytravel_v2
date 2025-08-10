import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaturasListComponent } from './faturas-list.component';

describe('FaturasListComponent', () => {
  let component: FaturasListComponent;
  let fixture: ComponentFixture<FaturasListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FaturasListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FaturasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
