import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnioescolarComponent } from './anioescolar.component';

describe('AnioescolarComponent', () => {
  let component: AnioescolarComponent;
  let fixture: ComponentFixture<AnioescolarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnioescolarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnioescolarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
