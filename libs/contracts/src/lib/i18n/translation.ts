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

export interface UpdateTranslation {
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
