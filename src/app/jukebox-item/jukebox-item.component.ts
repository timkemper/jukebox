import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import {Song} from "../song.model";

@Component({
  selector: 'jukebox-item',
  templateUrl: './jukebox-item.component.html',
  styleUrls: ['./jukebox-item.component.css']
})
export class JukeboxItemComponent implements OnInit {

  @Input() song: Song;
  @Input() index: number;

  @Input() color: string;
  @ViewChild('jbItem') elementView : ElementRef;

  constructor() { }

  ngOnInit() {
    //if(this.scrollIntoView) {
    //  this.scrollIntoView();
    //}
  }

  @Input() set scrollIntoView(value: boolean) {
    if(value) {
      this.elementView.nativeElement.scrollIntoView(false);
    }
  }

}
