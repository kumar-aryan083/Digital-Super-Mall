import express from 'express';
import { adminLogin, adminRegister, verifyOtp } from '../controllers/admin.controller.js';

const router = express.Router();

router.post('/register', adminRegister);
router.post('/login', adminLogin);
router.post('/verify-otp/:id', verifyOtp);

export default router;