import { Router } from 'express';
import * as companyControllers from '../controllers/company.js';

const router = Router();

router.get('/company/details', companyControllers.companyDetails);

export default router;
