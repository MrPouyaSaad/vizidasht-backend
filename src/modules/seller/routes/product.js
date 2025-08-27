import express from 'express'
import { z } from 'zod'
import { auth } from '../middleware/auth.js'
import SellerProfile from '../models/SellerProfile.js'
import Product from '../models/Product.js'

const router = express.Router()

const upsertSchema = z.object({
  title: z.string(),
  imageUrl: z.string().optional(),
  category: z.string().optional(),
  packSize: z.number().int().positive().default(1),
  expiresAt: z.string().optional(), // ISO date
  pricePerPack: z.number().positive(),
  stockPacks: z.number().int().nonnegative(),
  price5: z.number().optional(),
  price10: z.number().optional(),
  consumerPrice: z.number().optional(),
  isAmazingOffer: z.boolean().optional()
})

router.post('/', auth(['SELLER']), async (req, res, next) => {
  try {
    const data = upsertSchema.parse(req.body)
    const seller = await SellerProfile.findOne({ user: req.user.id })
    const product = await Product.create({ ...data, expiresAt: data.expiresAt ? new Date(data.expiresAt) : undefined, seller: seller._id })
    res.status(201).json(product)
  } catch (e) { next(e) }
})

router.put('/:id', auth(['SELLER']), async (req, res, next) => {
  try {
    const data = upsertSchema.partial().parse(req.body)
    const seller = await SellerProfile.findOne({ user: req.user.id })
    const product = await Product.findOneAndUpdate({ _id: req.params.id, seller: seller._id }, { ...data, ...(data.expiresAt && { expiresAt: new Date(data.expiresAt) }) }, { new: true })
    res.json(product)
  } catch (e) { next(e) }
})

router.get('/', auth(['SELLER']), async (req, res, next) => {
  try {
    const seller = await SellerProfile.findOne({ user: req.user.id })
    const { q, sort = 'stockPacks' } = req.query
    const filter = { seller: seller._id }
    if (q) filter.title = { $regex: q, $options: 'i' }
    const products = await Product.find(filter).sort({ [sort]: 1 })
    res.json(products)
  } catch (e) { next(e) }
})

export default router
