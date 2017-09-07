import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JukeboxListComponent } from './jukebox-list.component';

describe('JukeboxListComponent', () => {
  let component: JukeboxListComponent;
  let fixture: ComponentFixture<JukeboxListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JukeboxListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JukeboxListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
