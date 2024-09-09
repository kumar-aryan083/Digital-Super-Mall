import express from 'express';
import { adminLogin, adminRegister, createProduct, createShop, verifyOtp } from '../controllers/admin.controller.js';
import { verifyToken } from '../verifyToken.js';

const router = express.Router();

router.post('/register', adminRegister);
router.post('/login', adminLogin);
router.post('/verify-otp/:id', verifyOtp);
router.post('/create-shop',verifyToken, createShop);
router.post('/create-product',verifyToken, createProduct);

export default router;