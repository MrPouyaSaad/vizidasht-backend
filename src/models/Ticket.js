import mongoose from 'mongoose'

const TicketSchema = new mongoose.Schema({
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'SellerProfile', required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, enum: ['OPEN', 'IN_PROGRESS', 'CLOSED'], default: 'OPEN' },
  phone: { type: String },
}, { timestamps: true })

export default mongoose.model('Ticket', TicketSchema)
