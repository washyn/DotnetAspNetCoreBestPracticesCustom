import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardDemoComponent } from './module/dashboard-demo/dashboard-demo.component';
import { AddressFormDemoComponent } from './module/address-form-demo/address-form-demo.component';
import { DragDropDemoComponent } from './module/drag-drop-demo/drag-drop-demo.component';
import { TableDemoComponent } from './module/table-demo/table-demo.component';
import { TreeDemoComponent } from './module/tree-demo/tree-demo.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardDemoComponent,
  },
  {
    path: 'address-form',
    component: AddressFormDemoComponent,
  },
  {
    path: 'drag-drop',
    component: DragDropDemoComponent,
  },
  {
    path: 'table',
    component: TableDemoComponent,
  },
  {
    path: 'tree',
    component: TreeDemoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
