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
import { FormsModule } from '@angular/forms';
import { SearchComponent } from './search/search.component';
import { HeaderComponent } from './header/header.component';
import { DateSelectorComponent } from './date-selector/date-selector.component';
import { ConfigPageComponent } from './config-page/config-page.component';
import { LoginPageComponent } from './login-page/login-page.component';

@NgModule({
    declarations: [
        AppComponent,
        DiaryPageComponent,
        DiaryComponent,
        SearchPageComponent,
        EditPageComponent,
        CalendarComponent,
        SearchComponent,
        HeaderComponent,
        DateSelectorComponent,
        ConfigPageComponent,
        LoginPageComponent,
    ],
    imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
