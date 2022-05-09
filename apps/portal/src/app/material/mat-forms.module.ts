import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
	exports: [
		MatFormFieldModule,
		MatInputModule,
		MatAutocompleteModule,
		MatDatepickerModule,
		MatNativeDateModule,
		FormsModule,
		ReactiveFormsModule,
	],
})
export class MatFormsModule {}
