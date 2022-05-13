export interface Translation {
	userId: string;
	code: string;
	value: string;
}

export interface TranslationData {
	localeCode: string;
	code: string;
	value: string;
}

export interface UpdateTranslationData {
	userId: string;
	code: string;
	localeCode: string;
	value: string;
}

export interface TranslationModel {
	code: string;
	translations: {
		locale: string;
		value: string;
	}[];
}
