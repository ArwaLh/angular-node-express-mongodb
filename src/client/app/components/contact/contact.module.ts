import { ContactRoutingModule } from './contact-routing.module';
import { ContactComponent } from './contact.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ContactRoutingModule,
    SharedModule
  ],
  declarations: [ContactComponent]
})
export class ContactModule { }
