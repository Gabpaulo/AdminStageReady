import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpeechesPage } from './speeches.page';

const routes: Routes = [{ path: '', component: SpeechesPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpeechesPageRoutingModule {}
