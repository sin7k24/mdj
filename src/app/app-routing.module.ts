import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiaryPageComponent } from './diary-page/diary-page.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { ConfigPageComponent } from './config-page/config-page.component';
import { LoginPageComponent } from './login-page/login-page.component';

const routes: Routes = [
    { path: 'login', component: LoginPageComponent },
    { path: 'diary', component: DiaryPageComponent },
    { path: 'diary/:year', component: DiaryPageComponent },
    { path: 'diary/:year/:month', component: DiaryPageComponent },
    { path: 'search', component: SearchPageComponent },
    { path: 'edit/:year/:month/:day', component: EditPageComponent },
    { path: 'config', component: ConfigPageComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
