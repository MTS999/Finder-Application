import express from 'express';
import { sendMessage,getMessage } from '../Controller/messageController.js';
import { protect } from '../Controller/authController.js';
const router=express.Router();

router.post('/send/:id',protect,sendMessage)
router.get('/:id',protect,getMessage)

export default router