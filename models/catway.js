const mongoose = require('mongoose');

const CatwaySchema = new mongoose.Schema({
  catwayNumber: Number,
  catwayType: String,
  catwayState: String
});

module.exports = mongoose.model('Catway', CatwaySchema);
