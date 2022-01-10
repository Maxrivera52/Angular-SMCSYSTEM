import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleCursoDocenteComponent } from './detalle-curso-docente.component';

describe('DetalleCursoDocenteComponent', () => {
  let component: DetalleCursoDocenteComponent;
  let fixture: ComponentFixture<DetalleCursoDocenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleCursoDocenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleCursoDocenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
