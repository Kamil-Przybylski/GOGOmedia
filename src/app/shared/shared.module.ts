import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

import { FormErrorsComponent } from './components/form-errors/form-errors.component';
import { LoadingButtonComponent } from './components/loading-button/loading-button.component';
import { DisabledDirective } from './directives/disabled.directive';

const MATERIAL_MODULES = [
  MatCardModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatToolbarModule,
  MatIconModule,
];

@NgModule({
  declarations: [
    FormErrorsComponent,
    LoadingButtonComponent,
    DisabledDirective,
  ],
  imports: [CommonModule, MATERIAL_MODULES],
  exports: [
    MATERIAL_MODULES,
    FormErrorsComponent,
    LoadingButtonComponent,
    DisabledDirective,
  ],
})
export class SharedModule {}
