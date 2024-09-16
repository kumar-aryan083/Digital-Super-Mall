import express from 'express';
import { allCat, createCat } from '../controllers/category.controller.js';
import { verifyToken } from '../verifyToken.js';


const router = express.Router();

router.get('/all-categories', allCat);
router.post('/create-category/:catName',verifyToken, createCat);


export default router;