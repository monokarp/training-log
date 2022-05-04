import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { MaterialModule } from '../material/material.module';
import { MenuService } from './menu.service';
import { MenuStore } from './menu.store';
import { DataModule } from '../data/data.module';
import { FormsModule } from '@angular/forms';

@NgModule({
	imports: [CommonModule, MaterialModule, DataModule, FormsModule],
	providers: [MenuService, MenuStore],
	declarations: [MenuComponent],
	exports: [MenuComponent],
})
export class MenuModule {}
