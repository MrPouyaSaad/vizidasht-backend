import mongoose from 'mongoose'

const OrderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  title: String,
  imageUrl: String,
  unitPrice: Number,
  quantity: Number,
  canCancel: { type: Boolean, default: true }
}, { _id: false })

const OrderSchema = new mongoose.Schema({
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'SellerProfile', required: true },
  buyerId: { type: String, required: true }, // در فاز بعدی به مدل خریدار وصل می‌شود
  status: { type: String, enum: ['NEW', 'CONFIRMED', 'SHIPPED', 'DELIVERED', 'CANCELLED'], default: 'NEW' },
  totalAmount: { type: Number, required: true },
  items: [OrderItemSchema],
  paidAmount: { type: Number, default: 0 },
  canCancel: { type: Boolean, default: true },
  deliveredAt: { type: Date }
}, { timestamps: true })

export default mongoose.model('Order', OrderSchema)
