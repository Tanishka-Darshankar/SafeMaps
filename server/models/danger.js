import mongoose from 'mongoose';

const dangerSchema = new mongoose.Schema({
  category: String,
  area: String,
  city: String,
  description: String,
  date: String,
  latitude: Number,
  longitude: Number,
});

export default mongoose.model('Danger', dangerSchema);
