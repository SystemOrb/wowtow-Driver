import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule, MatCheckboxModule, MatFormFieldModule} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatBadgeModule} from '@angular/material/badge';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTabsModule} from '@angular/material/tabs';
import {MatListModule} from '@angular/material/list';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatDialogModule,
    MatBadgeModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatToolbarModule,
    MatTabsModule,
    MatListModule,
    MatProgressSpinnerModule
  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatDialogModule,
    MatBadgeModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatToolbarModule,
    MatTabsModule,
    MatListModule,
    MatProgressSpinnerModule
  ],
  declarations: []
})
export class AngularMaterialModule { }
