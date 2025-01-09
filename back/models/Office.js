const mongoose = require('mongoose');

const officeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  equipment: {type: [String], enum: ["monitor", "keyboard", "mouse"], required: true},
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
  isBooked: { type: Boolean, default: false }
});

const Office = mongoose.model('Office', officeSchema);

module.exports = Office;
