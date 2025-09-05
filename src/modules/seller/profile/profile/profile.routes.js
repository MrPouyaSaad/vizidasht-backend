import { Router } from "express";
import { authenticate, authorizeRoles } from "../../../../middleware/auth.middleware.js";
import * as c from "./profile.controller.js";

const router = Router();

// فقط فروشنده با اکسس‌توکن
router.use(authenticate(), authorizeRoles("SELLER"));

/**
 * @swagger
 * tags:
 *   name: Profile
 *   description: مدیریت پروفایل فروشنده
 */

/**
 * @swagger
 * /profile/me:
 *   get:
 *     summary: دریافت اطلاعات پروفایل فروشنده
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: موفقیت
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 userId:
 *                   type: integer
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 phone:
 *                   type: string
 *                 storePhone:
 *                   type: string
 *                 storeName:
 *                   type: string
 *                 businessId:
 *                   type: string
 *                 businessTitle:
 *                   type: string
 *                 storeAddress:
 *                   type: string
 *                 status:
 *                   type: string
 */
router.get("/me", c.me);

/**
 * @swagger
 * /profile/address:
 *   put:
 *     summary: ویرایش آدرس فروشگاه
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               storeAddress:
 *                 type: string
 *     responses:
 *       200:
 *         description: آدرس با موفقیت ویرایش شد
 */
router.put("/address", c.editAddress);

/**
 * @swagger
 * /profile/store-phone:
 *   put:
 *     summary: ویرایش شماره ثابت فروشگاه
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               storePhone:
 *                 type: string
 *     responses:
 *       200:
 *         description: شماره ثابت با موفقیت ویرایش شد
 */
router.put("/store-phone", c.editStorePhone);

/**
 * @swagger
 * /profile/change-phone:
 *   post:
 *     summary: درخواست تغییر شماره موبایل (نیازمند تایید مجدد)
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *     responses:
 *       200:
 *         description: درخواست تغییر شماره ثبت شد و نیازمند تایید مجدد است
 */
router.post("/change-phone", c.requestChangePhone);

/**
 * @swagger
 * /profile/change-store-name:
 *   post:
 *     summary: درخواست تغییر نام فروشگاه (نیازمند تایید مجدد)
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               storeName:
 *                 type: string
 *     responses:
 *       200:
 *         description: درخواست تغییر نام فروشگاه ثبت شد و نیازمند تایید مجدد است
 */
router.post("/change-store-name", c.requestChangeStoreName);

export default router;
