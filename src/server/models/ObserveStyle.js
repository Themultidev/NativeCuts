import mongoose from 'mongoose';

const observeStyleSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 80 },
  mood: { type: String, required: true, enum: ['Calm', 'Burti', 'Rough'], index: true },
  description: { type: String, required: true, trim: true, maxlength: 500 },
  image: { type: String, required: true },
  active: { type: Boolean, default: true, index: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

export default mongoose.model('ObserveStyle', observeStyleSchema);
