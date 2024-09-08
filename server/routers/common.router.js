import express from 'express';
import { handleLogout } from '../controllers/common.controller.js';

const router = express.Router();

router.post('/logout', handleLogout);

export default router;