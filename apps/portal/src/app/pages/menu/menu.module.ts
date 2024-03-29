import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthModule } from '../../shared/auth/auth.module';
import { DataModule } from '../../shared/data/data.module';
import { MatComponentsModule } from '../../ui-components/material/mat-components.module';
import { MatFormsModule } from '../../ui-components/material/mat-forms.module';
import { MenuComponent } from './menu.component';
import { MenuService } from './menu.service';

@NgModule({
	imports: [CommonModule, MatComponentsModule, DataModule, AuthModule, MatFormsModule],
	providers: [MenuService],
	declarations: [MenuComponent],
	exports: [MenuComponent],
})
export class MenuModule {}
