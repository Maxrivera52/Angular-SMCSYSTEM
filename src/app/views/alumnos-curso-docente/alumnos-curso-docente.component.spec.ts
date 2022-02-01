import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnosCursoDocenteComponent } from './alumnos-curso-docente.component';

describe('AlumnosCursoDocenteComponent', () => {
  let component: AlumnosCursoDocenteComponent;
  let fixture: ComponentFixture<AlumnosCursoDocenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlumnosCursoDocenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlumnosCursoDocenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
