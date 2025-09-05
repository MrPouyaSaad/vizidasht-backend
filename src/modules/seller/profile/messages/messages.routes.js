import express from "express";
import { getMessages, readMessage } from "./messages.controller.js";
import { authenticate, authorizeRoles } from "../../../middleware/auth.middleware.js";

const router = express.Router();
router.use(authenticate(), authorizeRoles("SELLER"));

/**
 * @swagger
 * tags:
 *   name: Messages
 *   description: مدیریت پیام‌های فروشنده
 */

/**
 * @swagger
 * /seller/profile/messages:
 *   get:
 *     summary: دریافت لیست پیام‌ها
 *     tags: [Messages]
 *     responses:
 *       200:
 *         description: لیست پیام‌ها با موفقیت برگشت داده شد
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   title:
 *                     type: string
 *                   body:
 *                     type: string
 *                   read:
 *                     type: boolean
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 */
router.get("/", getMessages);

/**
 * @swagger
 * /seller/profile/messages/{id}/read:
 *   post:
 *     summary: علامت‌گذاری یک پیام به عنوان خوانده شده
 *     tags: [Messages]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: شناسه پیام
 *     responses:
 *       200:
 *         description: پیام با موفقیت علامت‌گذاری شد
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 read:
 *                   type: boolean
 */
router.post("/:id/read", readMessage);

export default router;
