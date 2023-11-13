import csv from 'csv-parser';
import fs from 'fs';

export async function parseCSVFile(file) {
	const results = [];
	const output = new Promise((resolve, reject) => {
		fs.createReadStream(`${file.destination}${file.filename}`)
			.pipe(
				csv({
					mapHeaders: ({ header, index }) => header.toLowerCase(),
				})
			)
			.on('data', (data) => {
				results.push(data);
			})
			.on('error', (err) => {
				reject(err);
			})
			.on('end', () => {
				resolve(results);
			});
	});

	return output;
}
