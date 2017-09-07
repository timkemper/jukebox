import { Component, OnInit, Input, ChangeDetectorRef, HostListener, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import {Song} from "../song.model";
import {JukeboxService} from "../jukebox.service";
import {Subscription} from "rxjs/Subscription";
import {HeaderSizingService} from "../header/header.sizing.service";


@Component({
  selector: 'jukebox-list',
  templateUrl: './jukebox-list.component.html',
  styleUrls: ['./jukebox-list.component.css']
})
export class JukeboxListComponent implements OnInit, OnDestroy {

  songs: Song[];
  selectedIndex: number = 0;
  jukeboxServiceSubscription: Subscription;

  songsChangedSubscription: Subscription;

  headerSizingServiceSubscription: Subscription;

  viewHeight : string = "100px";

  headerHeight: number = 50;

  @ViewChild('jbList') elementView : ElementRef;

  constructor(private jukeboxService: JukeboxService, private headerSizingService: HeaderSizingService) { }

  ngOnInit() {
    //this.songs = this.jukeboxService.getSongs();
    this.jukeboxServiceSubscription = this.jukeboxService.selectedSongChanged.subscribe(
      (newIndex: number) => {
        this.selectedIndex = newIndex;
      }
    );
    console.log("Screen height = " + window.innerHeight);
    setTimeout(() => {
      this.setViewHeight(window.innerHeight);}, 0);
    //this.setViewHeight(window.innerHeight);
    this.songsChangedSubscription = this.jukeboxService.newSongsLoaded.subscribe(
      (songs: Song[]) => {
        this.songs = songs;
      }
    );


    this.headerSizingServiceSubscription = this.headerSizingService.heightChanged.subscribe(
      (height: number) => {
        console.log("Resizing from headerSizingSubscriptionService");
        this.headerHeight = height;
        setTimeout(() => {  // want this to happen in next view update cycle otherwise throws error
          this.setViewHeight(window.innerHeight);}, 0);
        }
      );
  }

  @HostListener('window:resize', ['$event'])
  onResize(event){
    console.log("Offset: " + this.elementView.nativeElement.offsetHeight)
    console.log("Height: " + event.target.innerHeight);
    this.setViewHeight(event.target.innerHeight);
  }

  onSelectItem(index: number) {
    //this.songs = this.jukeboxService.getSongs();
    this.jukeboxService.selectSong(index);
  }

  private setViewHeight(total : number) {
    this.viewHeight = (total - (this.headerHeight + 30)) + "px";
    console.log("set view height to " + this.viewHeight);
}

  ngOnDestroy() {
    this.jukeboxServiceSubscription.unsubscribe();
    this.songsChangedSubscription.unsubscribe();
    this.headerSizingServiceSubscription.unsubscribe();
  }

}
