import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursosAsignadosDocenteComponent } from './cursos-asignados-docente.component';

describe('CursosAsignadosDocenteComponent', () => {
  let component: CursosAsignadosDocenteComponent;
  let fixture: ComponentFixture<CursosAsignadosDocenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CursosAsignadosDocenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CursosAsignadosDocenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
