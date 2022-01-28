import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoveryUserAccountComponent } from './recovery-user-account.component';

describe('RecoveryUserAccountComponent', () => {
  let component: RecoveryUserAccountComponent;
  let fixture: ComponentFixture<RecoveryUserAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecoveryUserAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecoveryUserAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
