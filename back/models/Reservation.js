const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema(
  {
    date: { type: Date, required: true },
    timeSlot: {
      type: String,
      enum: ["fullDay", "morning", "afternoon"],
      required: true,
    },
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
    officeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Office",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Reservation = mongoose.model("Reservation", reservationSchema);

module.exports = Reservation;
