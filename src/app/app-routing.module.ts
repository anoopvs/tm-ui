import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddTaskComponent } from './add-task/add-task.component';
import { ViewTaskComponent } from './view-task/view-task.component';
import { RefreshPageComponent } from './refresh-page/refresh-page.component';

const appRoutes: Routes = [
    { path: '', component: AddTaskComponent },
    { path: 'addtask', component: AddTaskComponent },
    { path: 'viewtask', component: ViewTaskComponent },
    { path: 'refresh', component: RefreshPageComponent },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
