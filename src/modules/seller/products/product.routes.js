// src/modules/seller/products/product.routes.js
import { Router } from "express";
import { authenticate, authorizeRoles } from "../../../middleware/auth.middleware.js";
import {
  categories,
  productsByCategory,
  search,
  sellerProducts,
  createProduct,
  editProduct,
  removeProduct,
} from "./product.controller.js";

const router = Router();

router.use(authenticate(), authorizeRoles("SELLER"));

/**
 * @swagger
 * tags:
 *   - name: SellerProducts
 *     description: مدیریت محصولات فروشنده
 */

/**
 * @swagger
 * /seller/products/categories:
 *   get:
 *     summary: دریافت لیست دسته‌بندی‌ها
 *     tags: [SellerProducts]
 */
router.get("/categories", categories);

/**
 * @swagger
 * /seller/products/categories/{id}/products:
 *   get:
 *     summary: دریافت محصولات یک دسته‌بندی (با پیجینیشن)
 *     tags: [SellerProducts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 */
router.get("/categories/:id/products", productsByCategory);

/**
 * @swagger
 * /seller/products/search:
 *   get:
 *     summary: جستجوی محصول در دسته‌بندی انتخاب شده
 *     tags: [SellerProducts]
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: کلمه کلیدی جستجو
 */
router.get("/search", search);

/**
 * @swagger
 * /seller/products:
 *   get:
 *     summary: دریافت لیست محصولات فروشنده (مرتب‌سازی بر اساس موجودی)
 *     tags: [SellerProducts]
 */
router.get("/", sellerProducts);

/**
 * @swagger
 * /seller/products:
 *   post:
 *     summary: افزودن محصول جدید
 *     tags: [SellerProducts]
 */
router.post("/", createProduct);

/**
 * @swagger
 * /seller/products/{id}:
 *   put:
 *     summary: ویرایش محصول
 *     tags: [SellerProducts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 */
router.put("/:id", editProduct);

/**
 * @swagger
 * /seller/products/{id}:
 *   delete:
 *     summary: حذف محصول
 *     tags: [SellerProducts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 */
router.delete("/:id", removeProduct);

export default router;
