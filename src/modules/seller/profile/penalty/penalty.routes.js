import express from "express";
import { listPenalties, addPenalty } from "./penalty.controller.js";
import { authenticate, authorizeRoles } from "../../../middleware/auth.middleware.js";

const router = express.Router();
router.use(authenticate(), authorizeRoles("SELLER"));

/**
 * @swagger
 * tags:
 *   name: Penalties
 *   description: مدیریت جریمه‌ها
 */

/**
 * @swagger
 * /seller/profile/penalties:
 *   get:
 *     summary: دریافت لیست جریمه‌ها
 *     tags: [Penalties]
 *     responses:
 *       200:
 *         description: لیست جریمه‌ها با موفقیت برگشت داده شد
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
 *                   description:
 *                     type: string
 *                   category:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       title:
 *                         type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 */
router.get("/", listPenalties);

/**
 * @swagger
 * /seller/profile/penalties:
 *   post:
 *     summary: ایجاد جریمه جدید
 *     tags: [Penalties]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               categoryId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: جریمه با موفقیت ایجاد شد
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *                 categoryId:
 *                   type: integer
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 */
router.post("/", addPenalty);

export default router;
