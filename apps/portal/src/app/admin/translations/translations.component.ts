import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { TranslationModel } from '@training-log/contracts';
import { TranslationsService } from './translations.service';
import { TranslationsStore } from './translations.store';

@Component({
	selector: 'portal-translations',
	templateUrl: './translations.component.html',
	styleUrls: ['./translations.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TranslationsComponent implements OnInit {
	public code = new FormControl({ value: '', disabled: true });
	public locale = new FormControl('');
	public value = new FormControl('', [Validators.required]);

	constructor(private translationsService: TranslationsService, public translationsStore: TranslationsStore) {}

	ngOnInit(): void {
		this.translationsService.loadStore();
	}

	public selectforEdit(data: TranslationModel) {
		this.code.setValue(data.code);

		const [first] = data.translations;

		this.locale.setValue(first?.locale ?? '');
		this.value.setValue(first?.value ?? '');
	}

	public localeSelection({ value }: MatSelectChange) {
		const model = this.translationsStore.translations$.getValue().find(one => one.code === this.code.value);

		if (model) {
			const tln = model.translations.find(one => one.locale === value);

			this.value.setValue(tln?.value ?? '');
		}
	}

	public update() {
		if ([this.code, this.locale, this.value].some(one => one.invalid)) {
			return;
		}

		this.translationsService.updateOne({
			code: this.code.value,
			localeCode: this.locale.value,
			value: this.value.value,
		});
	}

	public clearInputs() {
		[this.code, this.locale, this.value].forEach(one => {
			one.setValue('');
			one.markAsUntouched();
		});
	}
}
