import express from 'express';
import { adminLogin, adminRegister, allProducts, allShops, createProduct, createShop, deleteProduct, deleteShop, updateProduct, updateShop, verifyOtp } from '../controllers/admin.controller.js';
import { verifyToken } from '../verifyToken.js';

const router = express.Router();

router.post('/register', adminRegister);
router.post('/login', adminLogin);
router.post('/verify-otp/:id', verifyOtp);
router.post('/create-shop',verifyToken, createShop);
router.get('/all-shops',verifyToken, allShops);
router.delete('/delete-shop/:sId',verifyToken, deleteShop);
router.put('/update-shop',verifyToken, updateShop);
router.get('/all-products', allProducts);
router.post('/create-product/:pId',verifyToken, createProduct);
router.put('/update-product',verifyToken, updateProduct);
router.delete('/delete-product/:pId',verifyToken, deleteProduct);

export default router;