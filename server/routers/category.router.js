import express from 'express';
import { allCat, allShops, createCat, deleteCat, updateCat } from '../controllers/category.controller.js';
import { verifyToken } from '../verifyToken.js';


const router = express.Router();

router.get('/all-categories', allCat);
router.post('/create-category/:catName',verifyToken, createCat);
router.get('/all-shops/:catId', allShops);
router.delete('/delete-category/:catId', verifyToken, deleteCat);
router.put('/update-category/:catId', verifyToken, updateCat);

export default router;