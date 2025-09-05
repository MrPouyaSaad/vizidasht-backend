// src/modules/seller/dashboard.routes.js
import { Router } from "express";
import { authenticate, authorizeRoles } from "../../../middleware/auth.middleware.js";
import * as dashboardController from "./dashboard.controller.js";

const router = Router();

router.use(authenticate(), authorizeRoles("SELLER"));

/**
 * @swagger
 * tags:
 *   - name: SellerDashboard
 *     description: داشبورد فروشنده
 */

/**
 * @swagger
 * /seller/dashboard/carrier-status:
 *   get:
 *     summary: وضعیت ناوگان حمل‌ونقل
 *     tags: [SellerDashboard]
 *     responses:
 *       200:
 *         description: وضعیت ارسال و رانندگان
 */
router.get("/carrier-status", dashboardController.carrierStatus);

/**
 * @swagger
 * /seller/dashboard/satisfaction:
 *   get:
 *     summary: سطح رضایت مشتریان
 *     tags: [SellerDashboard]
 *     responses:
 *       200:
 *         description: درصد رضایت و امتیازها
 */
router.get("/satisfaction", dashboardController.satisfaction);

/**
 * @swagger
 * /seller/dashboard/finance:
 *   get:
 *     summary: وضعیت مالی فروشنده
 *     tags: [SellerDashboard]
 *     responses:
 *       200:
 *         description: موجودی، درآمد و هزینه‌ها
 */
router.get("/finance", dashboardController.finance);

/**
 * @swagger
 * /seller/dashboard/today-sales:
 *   get:
 *     summary: آمار فروش امروز
 *     tags: [SellerDashboard]
 *     responses:
 *       200:
 *         description: لیست و مبلغ فروش امروز
 */
router.get("/today-sales", dashboardController.todaySales);

/**
 * @swagger
 * /seller/dashboard/weekly-orders:
 *   get:
 *     summary: آمار سفارش‌های هفتگی
 *     tags: [SellerDashboard]
 *     responses:
 *       200:
 *         description: تعداد و جزئیات سفارش‌ها در هفته جاری
 */
router.get("/weekly-orders", dashboardController.weeklyOrders);

/**
 * @swagger
 * /seller/dashboard/monthly-orders:
 *   get:
 *     summary: آمار سفارش‌های ماهانه
 *     tags: [SellerDashboard]
 *     responses:
 *       200:
 *         description: تعداد و جزئیات سفارش‌ها در ماه جاری
 */
router.get("/monthly-orders", dashboardController.monthlyOrders);

/**
 * @swagger
 * /seller/dashboard/top-products:
 *   get:
 *     summary: پرفروش‌ترین محصولات
 *     tags: [SellerDashboard]
 *     responses:
 *       200:
 *         description: لیست محصولات برتر
 */
router.get("/top-products", dashboardController.topProducts);

/**
 * @swagger
 * /seller/dashboard/orders-summary:
 *   get:
 *     summary: خلاصه سفارش‌ها
 *     tags: [SellerDashboard]
 *     responses:
 *       200:
 *         description: جمع‌بندی وضعیت سفارش‌ها (در حال پردازش، ارسال شده و ...)
 */
router.get("/orders-summary", dashboardController.ordersSummary);


export default router;
