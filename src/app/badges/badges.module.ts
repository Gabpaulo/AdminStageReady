import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BadgesPage } from './badges.page';
import { BadgesPageRoutingModule } from './badges-routing.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, BadgesPageRoutingModule],
  declarations: [BadgesPage],
})
export class BadgesPageModule {}
