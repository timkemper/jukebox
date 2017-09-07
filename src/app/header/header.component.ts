import { Component, OnInit, OnDestroy, ViewChild, ElementRef, HostListener, AfterViewInit, AfterViewChecked } from '@angular/core';
import {JukeboxService} from "../jukebox.service";
import {Subscription} from "rxjs/Subscription";
import {HeaderSizingService} from "./header.sizing.service";

@Component({
  selector: 'jb-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy, AfterViewInit, AfterViewChecked {

  isPlaying: boolean = false;

  jukeboxServiceSubscription: Subscription;
  jukeboxServiceTitleSubscription: Subscription;

  title: string;

  @ViewChild('header') elementView : ElementRef;

  play() {
    this.jukeboxService.play();
  }

  pause() {
    this.jukeboxService.pause();
  }

  stop() {
    this.jukeboxService.stop();
  }

  previous() {
    this.jukeboxService.previous();
  }

  previousJump() {
    this.jukeboxService.previousJump();
  }

  nextJump() {
    this.jukeboxService.nextJump();
  }

  next() {
    this.jukeboxService.next();
  }

  playingStateChanged(isPlaying: boolean) {
    this.isPlaying = isPlaying;
  }


  constructor(private jukeboxService: JukeboxService, private headerSizingService: HeaderSizingService) { }

  ngOnInit() {
    this.jukeboxServiceSubscription = this.jukeboxService.isPlayingChanged.subscribe(
      (isPlaying: boolean) => {
        this.playingStateChanged(isPlaying);
      }
    );

    this.jukeboxServiceTitleSubscription = this.jukeboxService.titleLoaded.subscribe(
      (title: string) => {
        this.title = title;
        let headerHeight = this.elementView.nativeElement.offsetHeight;
        console.log("Title set, header height " + headerHeight)
        this.headerSizingService.setHeightChanged(headerHeight);
      }
    );

    let headerHeight = this.elementView.nativeElement.offsetHeight;
    console.log("Header Height " + headerHeight)

  }

  @HostListener('window:resize', ['$event'])
  onResize(event){
    let headerHeight = this.elementView.nativeElement.offsetHeight;
    console.log("Header Height: " + headerHeight);
    this.headerSizingService.setHeightChanged(headerHeight);
  }

  ngAfterViewInit() {
    let headerHeight = this.elementView.nativeElement.offsetHeight;
    console.log("Header Height after view init: " + headerHeight);
  }

  ngAfterViewChecked() {
    let headerHeight = this.elementView.nativeElement.offsetHeight;
    console.log("Header Height after view checked: " + headerHeight);
    this.headerSizingService.setHeightChanged(headerHeight);
  }


  ngOnDestroy() {
    this.jukeboxServiceSubscription.unsubscribe();
    this.jukeboxServiceTitleSubscription.unsubscribe();
  }

}
