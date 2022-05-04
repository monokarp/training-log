import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
	imports: [CommonModule, MaterialModule],
	declarations: [MenuComponent],
	exports: [MenuComponent],
})
export class MenuModule {}
