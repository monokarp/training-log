import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthModule } from '../auth/auth.module';
import { DataModule } from '../data/data.module';
import { MatComponentsModule } from '../material/mat-components.module';
import { MatFormsModule } from '../material/mat-forms.module';
import { MenuComponent } from './menu.component';
import { MenuService } from './menu.service';
import { MenuStore } from './menu.store';

@NgModule({
	imports: [CommonModule, MatComponentsModule, DataModule, AuthModule, MatFormsModule],
	providers: [MenuService, MenuStore],
	declarations: [MenuComponent],
	exports: [MenuComponent],
})
export class MenuModule {}
