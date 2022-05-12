import type { Config } from '@jest/types';

module.exports = {
	displayName: 'api',

	globals: {
		'ts-jest': {
			tsconfig: '<rootDir>/tsconfig.spec.json',
		},
	},
	testEnvironment: 'node',
	transform: {
		'^.+\\.[tj]s$': 'ts-jest',
	},
	moduleFileExtensions: ['ts', 'js', 'html'],
	coverageDirectory: '../../coverage/apps/api',
	preset: '../../jest.preset.ts',
	testTimeout: 10000,
} as Config.InitialOptions;
