const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
  catwayNumber: Number,
  clientName: String,
  boatName: String,
  startDate: Date,
  endDate: Date
});

module.exports = mongoose.model('Reservation', ReservationSchema);
