export function isNonEmptyString(arg: unknown | undefined | null): arg is string {
	return typeof arg === 'string' && !!arg.length;
}
