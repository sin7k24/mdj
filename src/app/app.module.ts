import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DiaryPageComponent } from './diary-page/diary-page.component';
import { DiaryComponent } from './diary/diary.component';
import { MarkedPipe } from './marked.pipe';

@NgModule({
  declarations: [
    AppComponent,
    DiaryPageComponent,
    DiaryComponent,
    MarkedPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
