import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { TranslationModel } from '@training-log/contracts';
import { TlNotification } from '../../../ui-components/tl-form/tl-notification';
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
	public locale = new FormControl('', [Validators.required]);
	public value = new FormControl('', [Validators.required]);

	private controls = [this.code, this.locale, this.value];

	constructor(
		private translationsService: TranslationsService,
		public translationsStore: TranslationsStore,
		private notification: TlNotification,
	) {}

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
		if (!this.code.value) {
			this.notification.info('Select a code for edit');
			return;
		}

		if (this.controls.some(one => one.invalid)) {
			this.controls.forEach(one => one.markAsTouched());
			return;
		}

		this.translationsService.updateOne({
			code: this.code.value,
			localeCode: this.locale.value,
			value: this.value.value,
		});
	}

	public clearInputs() {
		this.controls.forEach(one => {
			one.setValue('');
			one.markAsUntouched();
		});
	}
}
