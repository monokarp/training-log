import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { DataFormActionComponent } from './data-form-action/data-form-action.component';
import { DataFormContainerComponent } from './data-form-container/data-form-container.component';
import { DataFormFieldComponent } from './data-form-field/data-form-field.component';
import { DataFormListActionComponent } from './data-form-list/data-form-list-action/data-form-list-action.component';
import { DataFormListActionsComponent } from './data-form-list/data-form-list-actions/data-form-list-actions.component';
import { DataFormListInfoComponent } from './data-form-list/data-form-list-info/data-form-list-info.component';
import { DataFormListItemComponent } from './data-form-list/data-form-list-item/data-form-list-item.component';
import { DataFormListComponent } from './data-form-list/data-form-list.component';
import { DataFormSectionComponent } from './data-form-section/data-form-section.component';

const components = [
	DataFormContainerComponent,
	DataFormSectionComponent,
	DataFormFieldComponent,
	DataFormListComponent,
	DataFormListItemComponent,
	DataFormListInfoComponent,
	DataFormListActionsComponent,
	DataFormListActionComponent,
	DataFormActionComponent,
];

@NgModule({
	imports: [CommonModule, MatIconModule],
	declarations: components,
	exports: components,
})
export class DataFormModule {}
