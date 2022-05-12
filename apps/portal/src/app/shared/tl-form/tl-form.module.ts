import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TlFormActionComponent } from './data-form-action/data-form-action.component';
import { TlFormContainerComponent } from './data-form-container/data-form-container.component';
import { TlFormFieldComponent } from './data-form-field/data-form-field.component';
import { TlFormListActionComponent } from './data-form-list/data-form-list-action/data-form-list-action.component';
import { TlFormListActionsComponent } from './data-form-list/data-form-list-actions/data-form-list-actions.component';
import { TlFormListInfoComponent } from './data-form-list/data-form-list-info/data-form-list-info.component';
import { TlFormListItemComponent } from './data-form-list/data-form-list-item/data-form-list-item.component';
import { TlFormListComponent } from './data-form-list/data-form-list.component';
import { TlFormSectionComponent } from './data-form-section/data-form-section.component';

const components = [
	TlFormContainerComponent,
	TlFormSectionComponent,
	TlFormFieldComponent,
	TlFormListComponent,
	TlFormListItemComponent,
	TlFormListInfoComponent,
	TlFormListActionsComponent,
	TlFormListActionComponent,
	TlFormActionComponent,
];

@NgModule({
	imports: [CommonModule, MatIconModule],
	declarations: components,
	exports: components,
})
export class TlFormModule {}
