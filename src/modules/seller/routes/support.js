import express from 'express'
import { auth } from '../../../middleware/auth.js'
import SellerProfile from '../models/SellerProfile.js'
import Ticket from '../models/Ticket.js'
import { z } from 'zod'

const router = express.Router()

router.post('/tickets', auth(['SELLER']), async (req, res, next) => {
  try {
    const schema = z.object({ subject: z.string().min(3), message: z.string().min(5), phone: z.string().optional() })
    const data = schema.parse(req.body)
    const seller = await SellerProfile.findOne({ user: req.user.id })
    const ticket = await Ticket.create({ ...data, seller: seller._id })
    res.status(201).json(ticket)
  } catch (e) { next(e) }
})

router.get('/tickets', auth(['SELLER']), async (req, res, next) => {
  try {
    const seller = await SellerProfile.findOne({ user: req.user.id })
    const tickets = await Ticket.find({ seller: seller._id }).sort({ createdAt: -1 })
    res.json(tickets)
  } catch (e) { next(e) }
})

export default router
