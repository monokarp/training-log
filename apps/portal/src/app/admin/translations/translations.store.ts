import { Injectable } from '@angular/core';
import { TranslationModel } from '@training-log/contracts';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class TranslationsStore {
	public readonly translations$ = new BehaviorSubject<TranslationModel[]>([]);
	public readonly locales$ = new BehaviorSubject<string[]>([]);
}
