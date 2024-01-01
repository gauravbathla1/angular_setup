import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemsRoutingModule } from './items-routing.module';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/modules/material/material.module';
import { ItemComponent } from './item-list/item.component';
// import { EdititemComponent } from './components/edititem/edititem.component';
import { AdditemComponent } from './components/additem/additem.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { ItemDetailComponent } from './components/item-detail/item-detail.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { ImagesModalComponent } from './components/images-modal/images-modal.component';

@NgModule({
  declarations: [
    ItemComponent,
    // EdititemComponent,
    AdditemComponent,
    ItemDetailComponent,
    ImagesModalComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    SharedModule,
    ItemsRoutingModule,
  ],
  exports: [MaterialModule, SharedModule, MatDialogModule],
})
export class ItemsModule {}
