import { parseCSVFile } from '../helpers/csvParser.js';

export async function upload(req, res, next) {
	try {
		const file = req.file;
		if (!file) {
			res.status(400).json({
				success: 0,
				message: 'File is not a CSV',
			});
			return;
		}
		console.log(file);
		const companies = await parseCSVFile(file);
		res.json({
			data: companies,
		});
	} catch (error) {
		next(error);
	}
}
