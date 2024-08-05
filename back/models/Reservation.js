const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: String, required: true },
  timeSlot: {
    type: String,
    enum: ['fullDay', 'morning', 'afternoon'],
    required: true
  },
  roomId: { type: Number, required: true },
  officeId: { type: Number, required: true }
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;
