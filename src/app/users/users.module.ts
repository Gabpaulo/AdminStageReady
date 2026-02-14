import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UsersPage } from './users.page';
import { UsersPageRoutingModule } from './users-routing.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, UsersPageRoutingModule],
  declarations: [UsersPage],
})
export class UsersPageModule {}
