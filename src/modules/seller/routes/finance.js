import express from 'express'
import { auth } from '../middleware/auth.js'
import SellerProfile from '../models/SellerProfile.js'
import Transaction from '../models/Transaction.js'
import Order from '../models/Order.js'

const router = express.Router()

// گزارش مالی + موجودی و واریز نشده
router.get('/summary', auth(['SELLER']), async (req, res, next) => {
  try {
    const seller = await SellerProfile.findOne({ user: req.user.id })

    const [incomeAgg] = await Transaction.aggregate([
      { $match: { seller: seller._id } },
      { $group: { _id: '$seller', income: { $sum: { $cond: [{ $eq: ['$type','DEPOSIT'] }, '$amount', 0] } },
                             withdraw: { $sum: { $cond: [{ $eq: ['$type','WITHDRAW'] }, '$amount', 0] } } } }
    ])

    const totalIncome = incomeAgg?.income || 0
    const totalWithdraw = incomeAgg?.withdraw || 0
    const balance = totalIncome - totalWithdraw

    const notSettled = await Order.aggregate([
      { $match: { seller: seller._id, status: { $in: ['NEW','CONFIRMED','SHIPPED'] } } },
      { $group: { _id: null, amount: { $sum: '$totalAmount' } } }
    ])

    res.json({
      totalIncome,
      totalWithdraw,
      balance,
      notSettledAmount: notSettled[0]?.amount || 0
    })
  } catch (e) { next(e) }
})

// گردش حساب
router.get('/transactions', auth(['SELLER']), async (req, res, next) => {
  try {
    const seller = await SellerProfile.findOne({ user: req.user.id })
    const tx = await Transaction.find({ seller: seller._id }).sort({ createdAt: -1 })
    res.json(tx)
  } catch (e) { next(e) }
})

export default router
