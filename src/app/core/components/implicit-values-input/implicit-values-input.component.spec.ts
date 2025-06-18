import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImplicitValuesInputComponent } from './implicit-values-input.component';

describe('ImplicitValuesInputComponent', () => {
  let component: ImplicitValuesInputComponent;
  let fixture: ComponentFixture<ImplicitValuesInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImplicitValuesInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImplicitValuesInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
