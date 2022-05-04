import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { MenuService } from './menu.service';
import { MenuStore } from './menu.store';

@Component({
	selector: 'portal-menu',
	templateUrl: './menu.component.html',
	styleUrls: ['./menu.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent implements OnInit {
	@Input() public selected: string | undefined;

	constructor(private menuService: MenuService, public menuStore: MenuStore) {}

	public ngOnInit(): void {
		// TODO Move to route resolution?
		this.menuService.load();
	}

	public onTraineeSelect(event: MatSelectChange) {
		this.selected = event.value;

		// TODO navigate to program with this username or reload store
	}
}
