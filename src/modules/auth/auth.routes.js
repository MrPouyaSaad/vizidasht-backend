import { Router } from 'express';
import * as buyerController from './buyer.controller.js';
import * as sellerController from './seller.controller.js';
import * as driverController from './driver.controller.js';
import * as adminController from './admin.controller.js';
import * as authController from './auth.controller.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Buyer
 *     description: احراز هویت خریدار
 *   - name: Seller
 *     description: احراز هویت فروشنده
 *   - name: Driver
 *     description: احراز هویت راننده
 *   - name: Admin
 *     description: ورود ادمین
 *   - name: Auth
 *     description: مدیریت توکن‌ها (refresh/logout)
 */

/**
 * @swagger
 * /auth/buyer/request-code:
 *   post:
 *     summary: درخواست کد تایید برای خریدار
 *     tags: [Buyer]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *                 example: "09120000000"
 *     responses:
 *       200:
 *         description: کد تایید ارسال شد
 */
router.post('/buyer/request-code', buyerController.requestCode);

/**
 * @swagger
 * /auth/buyer/verify:
 *   post:
 *     summary: تایید کد خریدار و دریافت توکن
 *     tags: [Buyer]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *               code:
 *                 type: string
 *     responses:
 *       200:
 *         description: ورود موفق
 */
router.post('/buyer/verify', buyerController.verify);

/**
 * @swagger
 * /auth/seller/register:
 *   post:
 *     summary: ثبت‌نام فروشنده
 *     tags: [Seller]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *               storeName:
 *                 type: string
 *     responses:
 *       201:
 *         description: فروشنده ثبت شد
 */
router.post('/seller/register', sellerController.register);

/**
 * @swagger
 * /auth/seller/status/{phone}:
 *   get:
 *     summary: بررسی وضعیت ثبت‌نام فروشنده
 *     tags: [Seller]
 *     parameters:
 *       - in: path
 *         name: phone
 *         schema:
 *           type: string
 *         required: true
 *         example: "09120000000"
 *     responses:
 *       200:
 *         description: وضعیت فروشنده
 */
router.get('/seller/status/:phone', sellerController.status);

/**
 * @swagger
 * /auth/seller/send-code:
 *   post:
 *     summary: ارسال کد تایید فروشنده
 *     tags: [Seller]
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
 *         description: کد تایید ارسال شد
 */
router.post('/seller/send-code', sellerController.sendCode);

/**
 * @swagger
 * /auth/seller/verify:
 *   post:
 *     summary: تایید کد فروشنده و ورود
 *     tags: [Seller]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *               code:
 *                 type: string
 *     responses:
 *       200:
 *         description: ورود موفق
 */
router.post('/seller/verify', sellerController.verify);

/**
 * @swagger
 * /auth/driver/request-code:
 *   post:
 *     summary: درخواست کد تایید راننده
 *     tags: [Driver]
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
 *         description: کد تایید ارسال شد
 */
router.post('/driver/request-code', driverController.requestCode);

/**
 * @swagger
 * /auth/driver/verify:
 *   post:
 *     summary: تایید کد راننده و ورود
 *     tags: [Driver]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *               code:
 *                 type: string
 *     responses:
 *       200:
 *         description: ورود موفق
 */
router.post('/driver/verify', driverController.verify);

/**
 * @swagger
 * /auth/admin/login:
 *   post:
 *     summary: ورود ادمین
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: ورود موفق
 */
router.post('/admin/login', adminController.login);

/**
 * @swagger
 * /auth/refresh:
 *   post:
 *     summary: دریافت توکن جدید با refresh token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *     responses:
 *       200:
 *         description: توکن جدید صادر شد
 */
router.post('/refresh', authController.refresh);



export default router;
