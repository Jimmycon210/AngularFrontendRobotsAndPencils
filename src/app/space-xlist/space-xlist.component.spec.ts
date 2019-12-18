import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpaceXListComponent } from './space-xlist.component';

describe('SpaceXListComponent', () => {
  let component: SpaceXListComponent;
  let fixture: ComponentFixture<SpaceXListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpaceXListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpaceXListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
