import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataVisualComponent } from './data-visual.component';

describe('DataVisualComponent', () => {
  let component: DataVisualComponent;
  let fixture: ComponentFixture<DataVisualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataVisualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataVisualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
