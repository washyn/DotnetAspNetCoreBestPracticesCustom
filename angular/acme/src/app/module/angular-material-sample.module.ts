import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AddressFormDemoComponent } from './address-form-demo/address-form-demo.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { NavigationDemoComponent } from './navigation-demo/navigation-demo.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { TableDemoComponent } from './table-demo/table-demo.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { DashboardDemoComponent } from './dashboard-demo/dashboard-demo.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { TreeDemoComponent } from './tree-demo/tree-demo.component';
import { MatTreeModule } from '@angular/material/tree';
import { DragDropDemoComponent } from './drag-drop-demo/drag-drop-demo.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    AddressFormDemoComponent,
    NavigationDemoComponent,
    TableDemoComponent,
    DashboardDemoComponent,
    TreeDemoComponent,
    DragDropDemoComponent
  ],
  imports: [CommonModule, BrowserModule, MatInputModule, MatButtonModule, MatSelectModule, MatRadioModule, MatCardModule, ReactiveFormsModule, MatToolbarModule, MatSidenavModule, MatIconModule, MatListModule, MatTableModule, MatPaginatorModule, MatSortModule, MatGridListModule, MatMenuModule, MatTreeModule, DragDropModule],
  providers: [],
  bootstrap: [],
})
export class AngularMaterialSamplesModule {}
