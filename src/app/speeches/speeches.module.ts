import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SpeechesPage } from './speeches.page';
import { SpeechesPageRoutingModule } from './speeches-routing.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, SpeechesPageRoutingModule],
  declarations: [SpeechesPage],
})
export class SpeechesPageModule {}
