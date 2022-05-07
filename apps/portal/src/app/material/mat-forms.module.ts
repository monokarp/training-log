import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
	exports: [MatFormFieldModule, MatInputModule, MatAutocompleteModule, MatDatepickerModule, MatNativeDateModule],
})
export class MatFormsModule {}
