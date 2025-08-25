import mongoose from 'mongoose'

const SellerProfileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  shopName: { type: String, required: false },
  shopPhone: { type: String },
  licenseId: { type: String, required: true }, // شناسه پروانه
  licenseTitle: { type: String }, // عنوان پروانه
  address: { type: String },
  status: { type: String, enum: ['PENDING', 'APPROVED', 'REJECTED'], default: 'PENDING' }, // مرحله دوم: تایید ادمین
  rating: { type: Number, default: 0 }, // امتیاز ستاره‌ای
}, { timestamps: true })

export default mongoose.model('SellerProfile', SellerProfileSchema)
