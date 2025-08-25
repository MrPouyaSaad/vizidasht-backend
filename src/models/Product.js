import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema({
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'SellerProfile', required: true },
  title: { type: String, required: true },
  imageUrl: { type: String },
  category: { type: String },
  packSize: { type: Number, default: 1 }, // تعداد در هر بسته
  expiresAt: { type: Date }, // تاریخ انقضا
  pricePerPack: { type: Number, required: true },
  stockPacks: { type: Number, required: true, default: 0 },
  price5: { type: Number }, // قیمت 5 بسته
  price10: { type: Number }, // قیمت 10 بسته
  consumerPrice: { type: Number }, // قیمت مصرف‌کننده
  isAmazingOffer: { type: Boolean, default: false }, // شگفت انگیز
}, { timestamps: true })

export default mongoose.model('Product', ProductSchema)
