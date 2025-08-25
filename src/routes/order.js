import express from 'express'
import { auth } from '../middleware/auth.js'
import SellerProfile from '../models/SellerProfile.js'
import Order from '../models/Order.js'
import { z } from 'zod'

const router = express.Router()

// لیست سفارش‌ها
router.get('/', auth(['SELLER']), async (req, res, next) => {
  try {
    const seller = await SellerProfile.findOne({ user: req.user.id })
    const orders = await Order.find({ seller: seller._id }).sort({ createdAt: -1 })
    res.json(orders)
  } catch (e) { next(e) }
})

// جزییات سفارش
router.get('/:id', auth(['SELLER']), async (req, res, next) => {
  try {
    const seller = await SellerProfile.findOne({ user: req.user.id })
    const order = await Order.findOne({ _id: req.params.id, seller: seller._id })
    res.json(order)
  } catch (e) { next(e) }
})

// لغو سفارش یا آیتم
router.post('/:id/cancel', auth(['SELLER']), async (req, res, next) => {
  try {
    const schema = z.object({ itemIndex: z.number().int().optional() })
    const { itemIndex } = schema.parse(req.body)
    const seller = await SellerProfile.findOne({ user: req.user.id })
    const order = await Order.findOne({ _id: req.params.id, seller: seller._id })
    if (!order) return res.status(404).json({ message: 'سفارش یافت نشد' })

    if (itemIndex === undefined) {
      if (!order.canCancel) return res.status(400).json({ message: 'امکان لغو سفارش نیست' })
      order.status = 'CANCELLED'
    } else {
      if (!order.items[itemIndex]?.canCancel) return res.status(400).json({ message: 'امکان لغو آیتم نیست' })
      const item = order.items[itemIndex]
      order.totalAmount -= (item.unitPrice * item.quantity)
      order.items.splice(itemIndex, 1)
    }
    await order.save()
    res.json(order)
  } catch (e) { next(e) }
})

export default router
