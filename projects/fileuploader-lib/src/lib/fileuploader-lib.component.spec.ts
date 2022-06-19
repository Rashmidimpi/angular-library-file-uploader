import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileuploaderLibComponent } from './fileuploader-lib.component';

describe('FileuploaderLibComponent', () => {
  let component: FileuploaderLibComponent;
  let fixture: ComponentFixture<FileuploaderLibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileuploaderLibComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileuploaderLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
