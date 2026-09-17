import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PracticeModePage } from './practice-mode.page';
import { PracticeModePageRoutingModule } from './practice-mode-routing.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, PracticeModePageRoutingModule],
  declarations: [PracticeModePage],
})
export class PracticeModePageModule {}
