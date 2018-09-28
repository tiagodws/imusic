import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';

import { HomeComponent } from './home.component';
import { HomeRoutes } from './home.routes';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, HomeRoutes, NgbTypeaheadModule],
})
export class HomeModule {}
