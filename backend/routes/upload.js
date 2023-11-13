import { Router } from 'express';
import * as uploadControllers from '../controllers/upload.js';
import upload from '../helpers/multer.js';

const router = Router();

router.post('/upload', upload.single('company_csv'), uploadControllers.upload);

export default router;
