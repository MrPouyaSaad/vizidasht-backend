import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import { PrismaClient } from '@prisma/client'

import authRouter from './routes/auth.js'
import sellerRouter from './routes/seller.js'
import productRouter from './routes/product.js'
import orderRouter from './routes/order.js'
import financeRouter from './routes/finance.js'
import supportRouter from './routes/support.js'
import reviewRouter from './routes/review.js'

const app = express()
const prisma = new PrismaClient()

app.use(cors())
app.use(helmet())
app.use(express.json({ limit: '1mb' }))
app.use(morgan('dev'))

app.get('/health', async (req, res) => {
  try {
    const result = await prisma.$queryRaw`SELECT version()`
    res.json({ ok: true, db: result[0].version })
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message })
  }
})

// api routes
app.use('/api/auth', authRouter)
app.use('/api/seller', sellerRouter)
app.use('/api/products', productRouter)
app.use('/api/orders', orderRouter)
app.use('/api/finance', financeRouter)
app.use('/api/support', supportRouter)
app.use('/api/reviews', reviewRouter)

// error handler
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ message: err.message || 'Server error' })
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`Server listening on ${PORT}`))
