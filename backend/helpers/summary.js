import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config();

const openai = new OpenAI();

export async function getCompanySummary(company) {
	const completion = await openai.chat.completions.create({
		messages: [
			{
				role: 'user',
				content: `Summarize the general reviews about the company and their products briefly for ${company.name}.`,
			},
		],
		model: 'gpt-4',
	});
	return completion;
}
