import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PracticeModePage } from './practice-mode.page';

const routes: Routes = [
  {
    path: '',
    component: PracticeModePage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PracticeModePageRoutingModule {}
