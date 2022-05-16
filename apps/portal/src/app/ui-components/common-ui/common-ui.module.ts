import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatComponentsModule } from '../material/mat-components.module';
import { MatFormsModule } from '../material/mat-forms.module';
import { ExerciseSelectComponent } from './exercise-select/exercise-select.component';

@NgModule({
	imports: [CommonModule, MatComponentsModule, MatFormsModule],
	declarations: [ExerciseSelectComponent],
	exports: [ExerciseSelectComponent],
})
export class CommonUiModule {}
