import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  mobile: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  fullName: { type: String, required: true },
  nationalId: { type: String, required: true },
  role: { type: String, enum: ['SELLER', 'ADMIN'], default: 'SELLER' },
  isActive: { type: Boolean, default: true },
}, { timestamps: true })

export default mongoose.model('User', UserSchema)
