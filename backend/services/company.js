import axios from 'axios';
import { getCompanySummary } from '../helpers/summary.js';

export async function companyDetails(company) {
	const BASE_URL = 'https://data.soleadify.com/match/v4/companies';
	const { data } = await axios.post(
		BASE_URL,
		{
			commercial_names: [company.name],
			address_txt: company.address,
			website: company.website,
		},
		{
			headers: {
				'Content-type': 'application/json',
				'x-api-key': process.env.API_KEY,
			},
		}
	);
	const companySummary = await getCompanySummary(company);
	return { ...data, summary: companySummary.choices };
}
