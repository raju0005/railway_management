import { Router } from 'express';
import { addTrain } from '../controller/adminController.js'
import { adminMiddleware } from '../middlewares/adminMiddleware.js';

const router = Router();

router.post('/train/add', adminMiddleware, addTrain);

export default router;
