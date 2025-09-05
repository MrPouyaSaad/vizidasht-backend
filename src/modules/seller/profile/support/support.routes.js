import express from "express";
import {
  createTicketCtrl,
  listTicketsCtrl,
  getTicketCtrl,
  updateTicketStatusCtrl,
  getSupportPhoneCtrl,
  getDeactivationReasonsCtrl,
  changeAccountStatusCtrl,
} from "./support.controller.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Support
 *   description: مدیریت تیکت‌ها، پشتیبانی و وضعیت حساب
 */

/**
 * @swagger
 * /profile/support/tickets:
 *   post:
 *     summary: ایجاد تیکت جدید
 *     tags: [Support]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: عنوان تیکت
 *               description:
 *                 type: string
 *                 description: توضیح تیکت
 *     responses:
 *       200:
 *         description: تیکت ایجاد شد
 */

/**
 * @swagger
 * /profile/support/tickets:
 *   get:
 *     summary: دریافت لیست تیکت‌ها
 *     tags: [Support]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: موفقیت آمیز
 */

/**
 * @swagger
 * /profile/support/tickets/{id}:
 *   get:
 *     summary: مشاهده جزئیات یک تیکت
 *     tags: [Support]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: شناسه تیکت
 *     responses:
 *       200:
 *         description: موفقیت آمیز
 */

/**
 * @swagger
 * /profile/support/tickets/{id}/status:
 *   put:
 *     summary: تغییر وضعیت تیکت
 *     tags: [Support]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
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
 *               status:
 *                 type: string
 *                 enum: [OPEN, IN_PROGRESS, CLOSED]
 *                 description: وضعیت جدید تیکت
 *     responses:
 *       200:
 *         description: موفقیت آمیز
 */

/**
 * @swagger
 * /profile/support/phone:
 *   get:
 *     summary: دریافت شماره پشتیبانی
 *     tags: [Support]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: شماره پشتیبانی برگردانده شد
 */

/**
 * @swagger
 * /profile/support/deactivation-reasons:
 *   get:
 *     summary: دریافت لیست دلایل غیر فعال‌سازی حساب
 *     tags: [Support]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: موفقیت آمیز
 */

/**
 * @swagger
 * /profile/support/account-status:
 *   post:
 *     summary: تغییر وضعیت حساب (فعال/غیرفعال)
 *     tags: [Support]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               toActive:
 *                 type: boolean
 *                 description: وضعیت جدید حساب
 *               reasonCode:
 *                 type: string
 *                 description: کد دلیل تغییر وضعیت
 *               note:
 *                 type: string
 *                 description: توضیح اضافی
 *     responses:
 *       200:
 *         description: موفقیت آمیز
 */

router.post("/tickets", createTicketCtrl);
router.get("/tickets", listTicketsCtrl);
router.get("/tickets/:id", getTicketCtrl);
router.put("/tickets/:id/status", updateTicketStatusCtrl);

router.get("/phone", getSupportPhoneCtrl);
router.get("/deactivation-reasons", getDeactivationReasonsCtrl);
router.post("/account-status", changeAccountStatusCtrl);

export default router;
