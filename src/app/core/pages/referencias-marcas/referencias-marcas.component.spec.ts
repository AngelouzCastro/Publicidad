import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferenciasMarcasComponent } from './referencias-marcas.component';

describe('ReferenciasMarcasComponent', () => {
  let component: ReferenciasMarcasComponent;
  let fixture: ComponentFixture<ReferenciasMarcasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReferenciasMarcasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReferenciasMarcasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
