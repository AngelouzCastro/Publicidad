import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostDescripcionComponent } from './post-descripcion.component';

describe('PostDescripcionComponent', () => {
  let component: PostDescripcionComponent;
  let fixture: ComponentFixture<PostDescripcionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostDescripcionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostDescripcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
