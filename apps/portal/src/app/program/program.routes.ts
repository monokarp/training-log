import { Routes } from '@angular/router';
import { ProgramComponent } from './program.component';

export const routes: Routes = [
	{
		path: ':id',
		component: ProgramComponent,
	},
	{
		path: '',
		component: ProgramComponent,
	},
];
