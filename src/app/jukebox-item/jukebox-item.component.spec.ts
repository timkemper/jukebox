import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JukeboxItemComponent } from './jukebox-item.component';

describe('JukeboxItemComponent', () => {
  let component: JukeboxItemComponent;
  let fixture: ComponentFixture<JukeboxItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JukeboxItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JukeboxItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
