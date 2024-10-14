/*
 * overwriteDBCollection.js
 * Overwrites a collection in your MongoDB Atlas instance
 *
 * node overwriteDBCollection.js <collection> <input>
 *
 * @arg    collection The name of the collection to be overwritten
 * @arg    input      The JSON file to be used to overwrite the collection
 */

require('module-alias/register');
const chalk = require('chalk');
const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

// Assuming you've updated your utils.js to export these correctly
const {
	MONGODB_URI,
	MONGODB_DB
} = require('@s/utils');

if (process.argv.length < 4) {
	console.log(chalk.red('Invalid format: Missing necessary arguments'));
	process.exit(1);
}

const collection = process.argv[2];
const inputFile = process.argv[3];

async function overwriteCollection() {
	try {
		const command = `mongoimport "${MONGODB_URI}" --db ${MONGODB_DB} --collection ${collection} --file ${inputFile} --drop`;

		const { stdout, stderr } = await execPromise(command);

		if (stderr && stderr !== '') {
			throw new Error(stderr);
		}

		console.log(chalk.green(`Successfully overwrote collection ${collection}`));
		console.log(stdout);
	} catch (err) {
		console.log(chalk.red('Error occurred:'));
		console.error(err);
	}
}

overwriteCollection();