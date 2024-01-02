import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiaryPageComponent } from './diary-page/diary-page.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';

const routes: Routes = [
  {path: "diary", component: DiaryPageComponent},
  {path: "diary/:year", component: DiaryPageComponent},
  {path: "diary/:year/:month", component: DiaryPageComponent},
  {path: "search", component: SearchPageComponent},
  {path: "edit", component: EditPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
