import express from 'express';
import {markNotificationAsRead, getNotification } from '../Controller/notificationController.js';
import { protect } from '../Controller/authController.js';
const router=express.Router();

router.get('/',protect,getNotification)
router.get('/mark/:notificationId',protect,markNotificationAsRead)

export default router