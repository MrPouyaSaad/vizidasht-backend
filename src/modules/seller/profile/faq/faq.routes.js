import express from "express";
import { listFAQs, addFAQ } from "./faq.controller.js";
import { authenticate, authorizeRoles } from "../../../middleware/auth.middleware.js";

const router = express.Router();

router.use(authenticate(), authorizeRoles("SELLER"));

/**
 * @swagger
 * tags:
 *   name: FAQ
 *   description: مدیریت سوالات متداول فروشنده
 */

/**
 * @swagger
 * /seller/profile/faq:
 *   get:
 *     summary: دریافت لیست FAQها
 *     tags: [FAQ]
 *     responses:
 *       200:
 *         description: لیست FAQ‌ها با موفقیت برگشت داده شد
 */
router.get("/", listFAQs);

/**
 * @swagger
 * /seller/profile/faq:
 *   post:
 *     summary: ایجاد یک FAQ جدید
 *     tags: [FAQ]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               question:
 *                 type: string
 *               answer:
 *                 type: string
 *               categoryId:
 *                 type: integer
 *             required:
 *               - question
 *               - answer
 *               - categoryId
 *     responses:
 *       201:
 *         description: FAQ جدید با موفقیت ایجاد شد
 */
router.post("/", addFAQ);

export default router;
