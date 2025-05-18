import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostResultadoComponent } from './post-resultado.component';

describe('PostResultadoComponent', () => {
  let component: PostResultadoComponent;
  let fixture: ComponentFixture<PostResultadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostResultadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostResultadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
