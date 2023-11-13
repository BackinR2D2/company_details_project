import * as companyServices from '../services/company.js';

export async function companyDetails(req, res, next) {
	try {
		const companyData = await companyServices.companyDetails(req.query);
		res.json({
			data: companyData,
		});
	} catch (error) {
		next(error);
	}
}
