import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { TlFormActionComponent } from './tl-form-action/tl-form-action.component';
import { TlFormContainerComponent } from './tl-form-container/tl-form-container.component';
import { TlFormFieldComponent } from './tl-form-field/tl-form-field.component';
import { TlFormListActionComponent } from './tl-form-list/tl-form-list-action/tl-form-list-action.component';
import { TlFormListActionsComponent } from './tl-form-list/tl-form-list-actions/tl-form-list-actions.component';
import { TlFormListInfoComponent } from './tl-form-list/tl-form-list-info/tl-form-list-info.component';
import { TlFormListItemComponent } from './tl-form-list/tl-form-list-item/tl-form-list-item.component';
import { TlFormListComponent } from './tl-form-list/tl-form-list.component';
import { TlFormSectionComponent } from './tl-form-section/tl-form-section.component';
import { TlNotification } from './tl-notification';
import { TlNotificationComponent } from './tl-notification/tl-notification.component';

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
	TlNotificationComponent,
];

@NgModule({
	imports: [CommonModule, MatIconModule, MatFormFieldModule],
	providers: [TlNotification],
	declarations: components,
	exports: components,
})
export class TlFormModule {}
