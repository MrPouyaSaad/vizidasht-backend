import express from "express";
import { getReviews, replyReviewCtrl } from "./comments.controller.js";
import { authenticate, authorizeRoles } from "../../../middleware/auth.middleware.js";

const router = express.Router();
router.use(authenticate(), authorizeRoles("SELLER"));
/**
 * @swagger
 * tags:
 *   - name: Reviews
 *     description: مدیریت نظرات محصولات توسط فروشنده
 */

/**
 * @swagger
 * /profile/comments:
 *   get:
 *     summary: دریافت لیست نظرات مشتریان
 *     tags: [Reviews]
 *     responses:
 *       200:
 *         description: لیست نظرات با جزئیات
 */
router.get("/", getReviews);

/**
 * @swagger
 * /profile/comments/{id}/reply:
 *   post:
 *     summary: پاسخ به یک نظر مشتری
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               replyText:
 *                 type: string
 *                 example: "ممنون از بازخورد شما"
 *     responses:
 *       200:
 *         description: پاسخ با موفقیت ثبت شد
 */
router.post("/:id/reply", replyReviewCtrl);

export default router;
