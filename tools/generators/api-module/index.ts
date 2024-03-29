import {
	Tree,
	formatFiles,
	installPackagesTask,
	generateFiles,
	joinPathFragments,
	readProjectConfiguration,
} from '@nrwl/devkit';
import { libraryGenerator } from '@nrwl/workspace';

export default async function (tree: Tree, schema: any) {
	await libraryGenerator(tree, { name: schema.name });

	const libraryRoot = readProjectConfiguration(tree, schema.name).root;

	generateFiles(
		tree, // the virtual file system
		joinPathFragments(__dirname, './files'), // path to the file templates
		libraryRoot, // destination path of the files
		{ pascal, name: schema.name }, // config object to replace variable in file templates
	);

	await formatFiles(tree);

	return () => {
		installPackagesTask(tree);
	};
}

function pascal(value: string) {
	return value[0].toUpperCase() + value.slice(1);
}
