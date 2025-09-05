import { Router } from 'express';
import { registerAdmin, editAdmin, removeAdmin } from './superAdmin.controller.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: SuperAdmin
 *   description: 
 */

/**
 * @swagger
 * /super-admin/register:
 *   post:
 *     summary: ثبت ادمین جدید
 *     tags: [SuperAdmin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *               - role
 *             properties:
 *               username:
 *                 type: string
 *                 example: admin1
 *               password:
 *                 type: string
 *                 example: StrongPass123
 *               role:
 *                 type: string
 *                 example: ADMIN
 *     responses:
 *       201:
 *         description: ادمین با موفقیت ثبت شد
 *       400:
 *         description: خطای اعتبارسنجی
 */
router.post('/register', registerAdmin);

/**
 * @swagger
 * /super-admin/edit:
 *   put:
 *     summary: ویرایش اطلاعات ادمین
 *     tags: [SuperAdmin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 example: 1
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       200:
 *         description: اطلاعات ادمین ویرایش شد
 *       404:
 *         description: ادمین یافت نشد
 */
router.put('/edit', editAdmin);

/**
 * @swagger
 * /super-admin/delete:
 *   delete:
 *     summary: حذف ادمین
 *     tags: [SuperAdmin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: ادمین با موفقیت حذف شد
 *       404:
 *         description: ادمین یافت نشد
 */
router.delete('/delete', removeAdmin);


export default router;
