import { Router } from "express";
import { authenticate, authorizeRoles } from  "../../../middleware/auth.middleware.js";
import * as ordersController from "./order.controller.js";

const router = Router();

router.use(authenticate(), authorizeRoles("SELLER"));

/**
 * @swagger
 * tags:
 *   - name: SellerOrders
 *     description: مدیریت سفارشات فروشنده
 */

/**
 * @swagger
 * /seller/orders/active:
 *   get:
 *     summary: لیست سفارشات فعال (تحویل داده نشده)
 *     tags: [SellerOrders]
 */
router.get("/active", ordersController.activeOrders);

/**
 * @swagger
 * /seller/orders/delivered:
 *   get:
 *     summary: لیست سفارشات تحویل داده‌شده
 *     tags: [SellerOrders]
 */
router.get("/delivered", ordersController.deliveredOrders);

/**
 * @swagger
 * /seller/orders/{id}:
 *   get:
 *     summary: جزئیات یک سفارش
 *     tags: [SellerOrders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 */
router.get("/:id", ordersController.orderDetails);

/**
 * @swagger
 * /seller/orders/{id}/cancel:
 *   patch:
 *     summary: لغو کل سفارش
 *     tags: [SellerOrders]
 */
router.patch("/:id/cancel", ordersController.cancelOrder);

/**
 * @swagger
 * /seller/orders/{orderId}/items/{itemId}/cancel:
 *   patch:
 *     summary: لغو یک آیتم از سفارش
 *     tags: [SellerOrders]
 */
router.patch("/:orderId/items/:itemId/cancel", ordersController.cancelOrderItem);

export default router;
