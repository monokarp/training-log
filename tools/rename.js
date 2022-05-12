const fs = require('fs');
const path = require('path');

async function traverse(currentPath) {
	const entries = fs.readdirSync(currentPath);

	for (let one of entries) {
		const next = path.join(currentPath, one);

		const updatedDir = next.replace('data-form', 'tl-form');

		if (next.includes('data-form')) {
			fs.renameSync(next, updatedDir);
		}

		if (fs.statSync(updatedDir).isDirectory()) {
			traverse(updatedDir);
			continue;
		}
	}
}

traverse('./tl-form');
