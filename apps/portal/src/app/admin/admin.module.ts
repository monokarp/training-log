import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { routes } from './admin.routes';
import { RouterModule } from '@angular/router';

@NgModule({
	imports: [RouterModule.forChild(routes), CommonModule],
	declarations: [AdminComponent],
})
export class AdminModule {}
