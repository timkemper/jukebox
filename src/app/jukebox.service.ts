import {Song} from "./song.model";
import {Injectable, OnInit, NgZone} from "@angular/core";
import {Subject} from "rxjs/Subject";
import {Http, Response} from "@angular/http";
import 'rxjs/add/operator/map';

@Injectable()
export class JukeboxService {

  private songs: Song[];
//= [
//    new Song("Sound", "Nobody", "audio/sound.m4a", "1:00"),
//    new Song("Old Tennessee", "Songwriter: Dan Folgelberg", "audio/oldTenn.m4a", "3:00"),
//    new Song("Poetic Justice", "Songwriters: Tom Kimmel, Buddy Mondock", "audio/poeticJusticeDemo3.m4a", "5:06"),
//
//  ];

  private title: string = "Demo Songs";
  private audio: any = new Audio();

  private currentSong: Song;
  private isPlaying: boolean = false;
  private isPaused: boolean = false;

  isPlayingChanged = new Subject<boolean>();
  selectedSongChanged = new Subject<number>();

  newSongsLoaded = new Subject<Song[]>();
  titleLoaded = new Subject<string>();

  constructor(private http: Http) {
    this.loadSongs();
    this.audio.onended = this.onEndedCalled.bind(this);
  }

  getSongs() {
    console.log("getting songs: " + JSON.stringify(this.songs));
    return this.songs.slice();
  }


  play() {
    if(this.currentSong == null) {
      this.currentSong = this.songs[0];
    }
      console.log("play song " + this.currentSong.name);
      if(this.isPaused) {
        this.audio.play();
      } else {
        this.createAudio(this.currentSong.audioPath);
        //this.audio.play();
       //setTimeout(() => {  // want this to happen in next view update cycle otherwise throws error
          this.audio.play();
      // console.log("should now be playing audio")}, 2000);
      }
    this.isPlaying = true;
    this.isPaused = false;
    this.isPlayingChanged.next(true);
  }

  pause(){
    if(this.currentSong != null && this.isPlaying) {
      console.log("pause playing song: " + this.currentSong.name);
      this.isPlayingChanged.next(false);
      this.audio.pause();
      this.isPaused = true;
      this.isPlaying = false;
    }
  }

  selectSong(index: number) {
    let keepPlaying = this.isPlaying;
    this.stop();
    this.currentSong = this.songs[index];
    this.selectedSongChanged.next(index);
    console.log("Selected song is now " + this.currentSong.name);
    if(keepPlaying) {
      this.play();
    }
  }

  stop() {
    if (this.currentSong != null && (this.isPlaying || this.isPaused)) {
      console.log("stop song " + this.currentSong.name);
      if(this.isPlaying) {
        this.audio.pause();
      }
      this.isPlaying = false;
      this.isPaused  = false;
      this.isPlayingChanged.next(false);
    }
  }

  // only allow if playing
  previousJump() {
    if(this.isPlaying) {
      let currentTime = this.audio.currentTime;
      currentTime -= 20;
      if(currentTime < 0) {
        currentTime = 0;
      }
      this.audio.currentTime = currentTime;
    }
  }
  previous() {
    let currentIndex: number = 0;
    if(this.currentSong != null) {
      currentIndex = this.songs.findIndex((candidate) => candidate.name === this.currentSong.name);
      console.log("Found current song, index is " + currentIndex);
      currentIndex -= 1;
    }
    if(currentIndex < 0) {
      currentIndex = this.songs.length -1;
    }
    this.currentSong = this.songs[currentIndex];
    this.selectedSongChanged.next(currentIndex);
    let keepPlaying = this.isPlaying;
    this.stop();
    if(keepPlaying){
      this.play();
    }
  }

  next() {
    console.log("Next called");
    let currentIndex: number = 0;
    if(this.currentSong != null) {
      currentIndex = this.songs.findIndex((candidate) => candidate.name === this.currentSong.name);
    }
    currentIndex++;
    if(currentIndex > this.songs.length -1) {
      currentIndex  = 0;
    }

    let keepPlaying = this.isPlaying;
    this.stop();
    this.currentSong = this.songs[currentIndex];
    this.selectedSongChanged.next(currentIndex);
    if(keepPlaying){
      console.log("keep playing is true, this.play called");
      this.play();

    } else {
        console.log("keepPlaying is false");
    }

  }

  // only allow if playing
  nextJump() {
    if(this.isPlaying) {
      let currentTime = this.audio.currentTime;
      currentTime += 20;
      let totalTime = this.audio.duration
      if(currentTime > totalTime) {
        this.next();
        return;
      }
      this.audio.currentTime = currentTime;
    }
  }
  setSongs(data:any) {
    console.log("Setting songs from file: " + data);
    this.songs = data;
  }

  setTitle(title: string) {
    console.log("setting title to " + title);
    this.title = title;
  }

  public loadSongs() {
    return new Promise((resolve, reject) => {
      this.http.get('assets/jukebox.json')
        .map(res => res.json())
        .subscribe(
          (data:any) => {
            this.setTitle(data.title);
            this.setSongs(data.songs);
            this.newSongsLoaded.next(this.songs);
            this.titleLoaded.next(this.title);
            resolve(true);
          },
          err=>console.log("Error: " + err)
        );
    });
  }

  onEndedCalled(zone: NgZone) {
    console.log("onEndedCalled");
    this.next();
  }

  createAudio(path: string) {
    console.log("creating new audio for: " + path);
    //this.audio = new Audio(path); // can't use due to mobile safari requiring a touch event to play next song

    // instead just update the source of the audio object
    this.audio.src = path;
  }
}
