import mongoose from 'mongoose'

const TransactionSchema = new mongoose.Schema({
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'SellerProfile', required: true },
  amount: { type: Number, required: true },
  type: { type: String, enum: ['DEPOSIT', 'WITHDRAW'], required: true }, // واریز/برداشت
  description: { type: String },
}, { timestamps: true })

export default mongoose.model('Transaction', TransactionSchema)
