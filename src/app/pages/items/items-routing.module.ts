import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ITEM_LIST_ROUTE, ITEM_ADD_ROUTE,ITEM_DETAILS_ROUTE,ITEM_EDIT_ROUTE } from './constants/route.constant';
import {  ItemComponent } from './item-list/item.component';
import {  AdditemComponent } from './components/additem/additem.component';
import {  ItemDetailComponent } from './components/item-detail/item-detail.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: ITEM_LIST_ROUTE.path,
    pathMatch: 'full',
  },
  {
    path: ITEM_LIST_ROUTE.path,
    component:  ItemComponent
  },
  {
    path: ITEM_ADD_ROUTE.path,
    component:  AdditemComponent
  },
  {
    path: `${ITEM_EDIT_ROUTE.path}/:itemId`,
    component:  AdditemComponent
  },
  {
    path: `${ITEM_DETAILS_ROUTE.path}/:itemId`,
    component:  ItemDetailComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemsRoutingModule { }
