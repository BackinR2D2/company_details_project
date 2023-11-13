import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import logger from './helpers/winston.js';
import upload from './routes/upload.js';
import company from './routes/company.js';
import fs from 'fs';

const app = express();
const PORT = process.env.PORT || 5000;
dotenv.config();
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/v1', upload);
app.use('/api/v1', company);

app.use('*', (req, res) => {
	const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
	res.status(404).json({
		message: `${fullUrl} not found`,
	});
});

app.use((err, req, res, next) => {
	logger.error(err);
	const status = err.status || 500;
	res.status(status).json({ error: err.message });
});

if (!fs.existsSync('./uploads')) {
	fs.mkdirSync('./uploads');
}

app.listen(PORT, () => {
	logger.info(`Listening on http://localhost:${PORT}`);
});
