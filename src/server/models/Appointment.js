import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  service: { type: String, enum: ['Hair cut', 'Beard trim', 'Line-up', 'Hair treatment'], required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  notes: { type: String, maxlength: 500, default: '' },
  status: { type: String, enum: ['requested', 'confirmed', 'completed', 'cancelled'], default: 'requested' },
}, { timestamps: true });

export default mongoose.model('Appointment', appointmentSchema);
