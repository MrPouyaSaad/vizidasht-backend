import express from "express";
import { getRatingCtrl } from "./rating.controller.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Rating
 *   description: مدیریت امتیاز و رتبه‌بندی فروشنده
 */

/**
 * @swagger
 * /profile/rating:
 *   get:
 *     summary: دریافت امتیاز فروشنده
 *     tags: [Rating]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: موفقیت آمیز
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 average:
 *                   type: number
 *                   description: میانگین امتیاز
 *                 stars:
 *                   type: integer
 *                   description: تعداد ستاره برای UI
 *                 count:
 *                   type: integer
 *                   description: تعداد نظرات
 *                 distribution:
 *                   type: object
 *                   description: توزیع امتیازات
 *                   properties:
 *                     5:
 *                       type: integer
 *                     4:
 *                       type: integer
 *                     3:
 *                       type: integer
 *                     2:
 *                       type: integer
 *                     1:
 *                       type: integer
 */
router.get("/", getRatingCtrl);

export default router;
