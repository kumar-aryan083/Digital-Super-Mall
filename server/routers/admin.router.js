import express from 'express';
import { adminLogin, adminRegister, allShops, createProduct, createShop, deleteShop, updateShop, verifyOtp } from '../controllers/admin.controller.js';
import { verifyToken } from '../verifyToken.js';

const router = express.Router();

router.post('/register', adminRegister);
router.post('/login', adminLogin);
router.post('/verify-otp/:id', verifyOtp);
router.post('/create-shop',verifyToken, createShop);
router.get('/all-shops',verifyToken, allShops);
router.delete('/delete-shop/:sId',verifyToken, deleteShop);
router.post('/update-shop',verifyToken, updateShop);
router.post('/create-product',verifyToken, createProduct);

export default router;