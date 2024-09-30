import express from 'express';
import {
  createFoundItem,
  getFoundItems,
  getFoundItemById,
  updateFoundItem,
  deleteFoundItem,
  getFoundItemByUserId
} from '../Controller/foundItemController.js';
import { protect } from '../Controller/authController.js';

const router = express.Router();

router.get("/mts",protect,getFoundItems)
router.route('/')
  .post(protect, createFoundItem)
  .get(protect,getFoundItemByUserId);

router.route('/:id')
  .get(protect,getFoundItemById)
  .put(protect, updateFoundItem)
  .delete(protect, deleteFoundItem);


export default router;
