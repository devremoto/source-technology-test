import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { GamesComponent } from './games/games.component';
import { NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    GamesComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    NgbModule,
    NgbDropdownModule
  ]
})
export class PagesModule { }
