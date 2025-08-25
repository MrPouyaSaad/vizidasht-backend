import express from 'express'
import { auth } from '../middleware/auth.js'
import SellerProfile from '../models/SellerProfile.js'
import User from '../models/User.js'
import { z } from 'zod'

const router = express.Router()

// مرحله دوم: تایید/رد توسط ادمین
router.post('/admin/verify', auth(['ADMIN']), async (req, res, next) => {
  try {
    const schema = z.object({ sellerId: z.string(), status: z.enum(['APPROVED','REJECTED']) })
    const { sellerId, status } = schema.parse(req.body)
    const profile = await SellerProfile.findByIdAndUpdate(sellerId, { status }, { new: true })
    res.json(profile)
  } catch (e) { next(e) }
})

// مرحله سوم: تکمیل پروفایل فروشنده
router.put('/profile', auth(['SELLER']), async (req, res, next) => {
  try {
    const schema = z.object({
      shopName: z.string().min(2),
      shopPhone: z.string().optional(),
      licenseTitle: z.string().optional(),
      address: z.string().min(5)
    })
    const { shopName, shopPhone, licenseTitle, address } = schema.parse(req.body)
    const profile = await SellerProfile.findOneAndUpdate({ user: req.user.id }, { shopName, shopPhone, licenseTitle, address }, { new: true })
    res.json(profile)
  } catch (e) { next(e) }
})

// دریافت پروفایل (برای نمایش در صفحه پروفایل)
router.get('/me', auth(['SELLER']), async (req, res, next) => {
  try {
    const profile = await SellerProfile.findOne({ user: req.user.id }).populate('user')
    res.json(profile)
  } catch (e) { next(e) }
})

// تغییرات حساس: تغییر نام فروشگاه، موبایل ثابت - برای دموی MVP فقط همان endpoint بالا کافی است
// در نسخه کامل می‌توانید درخواست تایید مجدد بفرستید.

export default router
