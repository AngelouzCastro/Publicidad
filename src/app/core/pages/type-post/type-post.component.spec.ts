import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypePostComponent } from './type-post.component';

describe('TypePostComponent', () => {
  let component: TypePostComponent;
  let fixture: ComponentFixture<TypePostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypePostComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
