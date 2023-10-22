import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiaryPageComponent } from './diary-page/diary-page.component';

const routes: Routes = [{path: "diary", component: DiaryPageComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
