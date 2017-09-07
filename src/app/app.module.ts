import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { JukeboxComponent } from './jukebox/jukebox.component';
import { JukeboxItemComponent } from './jukebox-item/jukebox-item.component';
import { JukeboxListComponent } from './jukebox-list/jukebox-list.component';
import { HeaderComponent } from './header/header.component';
import {JukeboxService} from "./jukebox.service";
import {HeaderSizingService} from "./header/header.sizing.service";

@NgModule({
  declarations: [
    AppComponent,
    JukeboxComponent,
    JukeboxItemComponent,
    JukeboxListComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [JukeboxService, HeaderSizingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
