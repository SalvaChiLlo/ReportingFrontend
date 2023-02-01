import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdloadFormComponent } from './updload-form.component';

describe('UpdloadFormComponent', () => {
  let component: UpdloadFormComponent;
  let fixture: ComponentFixture<UpdloadFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdloadFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdloadFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
