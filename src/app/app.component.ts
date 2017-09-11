import { Component, OnInit, HostListener, ViewChild, ElementRef, AfterContentInit} from '@angular/core';

@Component({
  selector: 'jb-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [JukeboxService, HeaderSizingService]
})
export class AppComponent  {
  title = 'Jukebox';

  ngOnInit() {
    console.log = function () {
    };
  }
}
