import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdloadFormComponent } from './updload-form/updload-form.component';
import { ResultsViewComponent } from './results-view/results-view.component';

const routes: Routes = [
  { path: 'loadFiles', component: UpdloadFormComponent },
  { path: 'showReports', component: ResultsViewComponent },
  { path: '',   redirectTo: '/loadFiles', pathMatch: 'full' },
  { path: '**', redirectTo: '/loadFiles', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
