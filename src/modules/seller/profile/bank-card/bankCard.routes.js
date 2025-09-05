import express from "express";
import {
  listCardsCtrl,
  addCardCtrl,
  editCardCtrl,
  deleteCardCtrl,
  setDefaultCardCtrl,
} from "./bankCard.controller.js";
import { authenticate, authorizeRoles } from "../../../middleware/auth.middleware.js";


const router = express.Router();
router.use(authenticate(), authorizeRoles("SELLER"));

/**
 * @swagger
 * tags:
 *   - name: BankCards
 *     description: مدیریت کارت‌های بانکی فروشنده
 */

/**
 * @swagger
 * /profile/bank-cards:
 *   get:
 *     summary: دریافت لیست کارت‌های بانکی
 *     tags: [BankCards]
 */
router.get("/", listCardsCtrl);

/**
 * @swagger
 * /profile/bank-cards:
 *   post:
 *     summary: افزودن کارت بانکی جدید
 *     tags: [BankCards]
 */
router.post("/", addCardCtrl);

/**
 * @swagger
 * /profile/bank-cards/{id}:
 *   put:
 *     summary: ویرایش اطلاعات کارت بانکی
 *     tags: [BankCards]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 */
router.put("/:id", editCardCtrl);

/**
 * @swagger
 * /profile/bank-cards/{id}:
 *   delete:
 *     summary: حذف کارت بانکی
 *     tags: [BankCards]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 */
router.delete("/:id", deleteCardCtrl);

/**
 * @swagger
 * /profile/bank-cards/{id}/default:
 *   post:
 *     summary: تنظیم کارت به عنوان پیش‌فرض
 *     tags: [BankCards]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 */
router.post("/:id/default", setDefaultCardCtrl);

export default router;
