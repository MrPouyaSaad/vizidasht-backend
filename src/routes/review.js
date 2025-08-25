import express from 'express'
import { auth } from '../middleware/auth.js'
import SellerProfile from '../models/SellerProfile.js'
import Review from '../models/Review.js'
import { z } from 'zod'

const router = express.Router()

// فهرست نظرات برای فروشنده
router.get('/', auth(['SELLER']), async (req, res, next) => {
  try {
    const seller = await SellerProfile.findOne({ user: req.user.id })
    const reviews = await Review.find({ seller: seller._id }).sort({ createdAt: -1 })
    res.json(reviews)
  } catch (e) { next(e) }
})

// در نسخه کامل: پاسخ به نظر، برچسب پیشنهاد می‌شود/نمی‌شود

export default router
