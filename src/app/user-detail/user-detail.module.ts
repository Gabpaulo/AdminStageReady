import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UserDetailPage } from './user-detail.page';
import { UserDetailPageRoutingModule } from './user-detail-routing.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, UserDetailPageRoutingModule],
  declarations: [UserDetailPage],
})
export class UserDetailPageModule {}
