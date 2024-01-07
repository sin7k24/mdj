import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DiaryPageComponent } from './diary-page/diary-page.component';
import { DiaryComponent } from './diary/diary.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { CalendarComponent } from './calendar/calendar.component';

@NgModule({
  declarations: [
    AppComponent,
    DiaryPageComponent,
    DiaryComponent,
    SearchPageComponent,
    EditPageComponent,
    CalendarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
