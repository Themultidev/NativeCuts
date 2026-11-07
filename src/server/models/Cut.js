import mongoose from 'mongoose';

const cutSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  name: { type: String, required: true, maxlength: 80 },
  image: { type: String, required: true },
  cutDate: { type: Date, required: true },
}, { timestamps: true });

export default mongoose.model('Cut', cutSchema);
