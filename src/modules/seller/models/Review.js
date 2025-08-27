import mongoose from 'mongoose'

const ReviewSchema = new mongoose.Schema({
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'SellerProfile', required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  title: String,
  text: String,
  recommend: { type: String, enum: ['RECOMMENDED', 'NOT_RECOMMENDED'], default: 'RECOMMENDED' },
  stars: { type: Number, min: 1, max: 5, default: 5 },
}, { timestamps: true })

export default mongoose.model('Review', ReviewSchema)
