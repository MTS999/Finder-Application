import express from "express";
import {
  createLostItem,
  getLostItems,
  getLostItemById,
  updateLostItem,
  deleteLostItem,
  getLostItemsbyUserId
} from "../Controller/lostItemController.js";
import { protect } from "../Controller/authController.js";

const router = express.Router();
router.get('/all-items',protect,getLostItems)
router.route("/")
  .post(protect, createLostItem)
  .get(protect, getLostItemsbyUserId);

router.route("/:id")
  .get(protect, getLostItemById)
  .put(protect, updateLostItem)
  .delete(protect, deleteLostItem);

export default router;
