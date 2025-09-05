import { Router } from "express";
import * as adminController from "./admin.controller.js";
import { authenticate, authorizeRoles } from "../../middleware/auth.middleware.js";

const router = Router();


router.use(authenticate(), authorizeRoles("ADMIN"));

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: 
 */

/**
 * @swagger
 * /admin/sellers:
 *   get:
 *     summary: لیست همه فروشنده‌ها
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: لیست فروشنده‌ها
 *       401:
 *         description: احراز هویت ناموفق
 */
router.get("/sellers", adminController.listSellers);

/**
 * @swagger
 * /admin/sellers/{id}/approve:
 *   post:
 *     summary: تایید فروشنده
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: شناسه فروشنده
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: فروشنده تایید شد
 *       404:
 *         description: فروشنده یافت نشد
 */
router.post("/sellers/:id/approve", adminController.approveSeller);

/**
 * @swagger
 * /admin/sellers/{id}/reject:
 *   post:
 *     summary: رد کردن فروشنده
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: شناسه فروشنده
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: فروشنده رد شد
 *       404:
 *         description: فروشنده یافت نشد
 */
router.post("/sellers/:id/reject", adminController.rejectSeller);

/**
 * @swagger
 * /admin/drivers:
 *   get:
 *     summary: لیست همه راننده‌ها
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: لیست راننده‌ها
 *       401:
 *         description: احراز هویت ناموفق
 */
router.get("/drivers", adminController.listDrivers);

/**
 * @swagger
 * /admin/drivers/register:
 *   post:
 *     summary: ثبت راننده جدید
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *               nationalId:
 *                 type: string
 *               licenseNo:
 *                 type: string
 *               vehicleType:
 *                 type: string
 *     responses:
 *       201:
 *         description: راننده جدید ثبت شد
 *       400:
 *         description: خطای اعتبارسنجی
 */
router.post("/drivers/register", adminController.registerDriver);

/**
 * @swagger
 * /admin/drivers/{id}/approve:
 *   post:
 *     summary: تایید راننده
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: شناسه راننده
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: راننده تایید شد
 *       404:
 *         description: راننده یافت نشد
 */
router.post("/drivers/:id/approve", adminController.approveDriver);

/**
 * @swagger
 * /admin/drivers/{id}/reject:
 *   post:
 *     summary: رد کردن راننده
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: شناسه راننده
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: راننده رد شد
 *       404:
 *         description: راننده یافت نشد
 */
router.post("/drivers/:id/reject", adminController.rejectDriver);


export default router;
