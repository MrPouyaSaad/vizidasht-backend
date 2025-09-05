import express from "express";
import { getTutorials } from "./tutorials.controller.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Tutorials
 *   description: آموزش‌ها و راهنمایی‌ها برای فروشنده
 */

/**
 * @swagger
 * /profile/tutorials:
 *   get:
 *     summary: دریافت لیست آموزش‌ها
 *     tags: [Tutorials]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: لیست آموزش‌ها برگردانده شد
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
 *                   imageUrl:
 *                     type: string
 *                   linkUrl:
 *                     type: string
 */

router.get("/", getTutorials);

export default router;
