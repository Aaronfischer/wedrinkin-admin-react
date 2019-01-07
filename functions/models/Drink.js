import mongoose from 'mongoose';

// TODO add uniqueness and email validations
const schema = new mongoose.Schema({
  name: { type: String, required: true },
  img: { type: String, required: true },
  quote: { type: String, required: false },
  temp: [ String ],
  wind: { type: String, required: false },
  time: [ String ],
  city: { type: String, required: false },
  country: { type: String, required: false },
  region: { type: String, required: false },
  ingredients: [{ item: String, amount: String }],
  instructions: { type: String, required: true }
});

export default mongoose.model('Drink', schema);
