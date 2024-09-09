import express from 'express';
import { checkAdmin, handleLogout } from '../controllers/common.controller.js';
import {verifyToken} from '../verifyToken.js';

const router = express.Router();

router.post('/logout', handleLogout);
router.get('/check-admin', verifyToken, checkAdmin);

export default router;