import express from 'express'
import jwt from 'jsonwebtoken'
import { z } from 'zod'
import User from '../models/User.js'
import SellerProfile from '../models/SellerProfile.js'
import { hashPassword, comparePassword } from '../utils/hash.js'

const router = express.Router()

const registerSchema = z.object({
  mobile: z.string().min(10),
  password: z.string().min(6),
  fullName: z.string().min(3),
  nationalId: z.string().min(8),
  licenseId: z.string().min(3)
})

// مرحله اول ثبت‌نام فروشنده
router.post('/register', async (req, res, next) => {
  try {
    const data = registerSchema.parse(req.body)
    const exists = await User.findOne({ mobile: data.mobile })
    if (exists) return res.status(409).json({ message: 'کاربر با این شماره وجود دارد' })
    const passwordHash = await hashPassword(data.password)
    const user = await User.create({
      mobile: data.mobile,
      passwordHash,
      fullName: data.fullName,
      nationalId: data.nationalId,
      role: 'SELLER'
    })
    const profile = await SellerProfile.create({
      user: user._id,
      licenseId: data.licenseId,
      status: 'PENDING'
    })
    res.status(201).json({ message: 'ثبت شد. منتظر تایید ادمین باشید', userId: user._id, sellerProfileId: profile._id })
  } catch (e) {
    next(e)
  }
})

const loginSchema = z.object({
  mobile: z.string(),
  password: z.string()
})

router.post('/login', async (req, res, next) => {
  try {
    const data = loginSchema.parse(req.body)
    const user = await User.findOne({ mobile: data.mobile })
    if (!user) return res.status(401).json({ message: 'نام کاربری یا رمز عبور اشتباه است' })
    const ok = await comparePassword(data.password, user.passwordHash)
    if (!ok) return res.status(401).json({ message: 'نام کاربری یا رمز عبور اشتباه است' })

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' })
    res.json({ token })
  } catch (e) {
    next(e)
  }
})

export default router
