const mongoose = require('mongoose');
const Catway = require('./models/catway');
const Reservation = require('./models/reservation');
const fs = require('fs');
require('dotenv').config();

// Connexion à MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// fichiers JSON
const catwaysData = JSON.parse(fs.readFileSync('catways.json', 'utf-8'));
const reservationsData = JSON.parse(fs.readFileSync('reservations.json', 'utf-8'));


async function importData() {
  try {
    await Catway.insertMany(catwaysData);
    await Reservation.insertMany(reservationsData);
    console.log('Importation réussie !');
  } catch (err) {
    console.error('Erreur lors de l’importation :', err);
  } finally {
    mongoose.connection.close();
  }
}

importData();
