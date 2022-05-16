import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpService } from './http.service';
import { HttpClientModule } from '@angular/common/http';
import { NavigationService } from './navigation.service';
import { ExerciseSelectComponent } from './exercise-select/exercise-select.component';
import { MatComponentsModule } from '../material/mat-components.module';
import { MatFormsModule } from '../material/mat-forms.module';

@NgModule({
	imports: [CommonModule, HttpClientModule, MatComponentsModule, MatFormsModule],
	providers: [HttpService, NavigationService],
	declarations: [ExerciseSelectComponent],
	exports: [ExerciseSelectComponent],
})
export class SharedModule {}
