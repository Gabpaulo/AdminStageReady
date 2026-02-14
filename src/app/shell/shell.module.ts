import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ShellPage } from './shell.page';
import { ShellRoutingModule } from './shell-routing.module';

@NgModule({
  imports: [CommonModule, IonicModule, ShellRoutingModule],
  declarations: [ShellPage],
})
export class ShellModule {}
