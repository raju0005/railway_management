import { Router } from 'express';
import { getSeatAvailability, bookSeat, getBookingDetails } from '../controller/userController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/trains/availability', authMiddleware, getSeatAvailability);
router.post('/trains/book', authMiddleware, bookSeat);
router.get('/trains/bookingDetails', authMiddleware, getBookingDetails);

export default router;
