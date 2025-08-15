const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String // (en clair pour test, hashé en prod!)
});

module.exports = mongoose.model('User', userSchema);